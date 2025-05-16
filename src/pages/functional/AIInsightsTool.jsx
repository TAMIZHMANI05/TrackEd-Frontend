import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaCopy,
  FaEdit,
  FaCheck,
  FaTimes,
  FaStop,
} from "react-icons/fa";
import axios from "axios";

// Typing animation with ChatGPT-style streaming
const TypingMessage = ({ text, onDone }) => {
  const [displayed, setDisplayed] = useState("");
  const stopRequested = useRef(false);
  const displayTextRef = useRef("");

  useEffect(() => {
    setDisplayed("");
    displayTextRef.current = "";
    stopRequested.current = false;
    if (!text) return;

    let i = 0;
    const chars = Array.from(text);

    const typeNextChar = () => {
      if (stopRequested.current) {
        setDisplayed(text);
        if (onDone) onDone();
        return;
      }

      if (i < chars.length) {
        displayTextRef.current += chars[i];
        setDisplayed(displayTextRef.current);
        i++;
        setTimeout(typeNextChar, 12);
      } else if (onDone) {
        onDone();
      }
    };

    setTimeout(typeNextChar, 12);

    return () => {
      stopRequested.current = true;
    };
  }, [text, onDone]);

  // Expose a way to set stopRequested from parent
  TypingMessage.stop = () => {
    stopRequested.current = true;
  };

  return <span dangerouslySetInnerHTML={{ __html: displayed }} />;
};

// Format AI reply: bold, lists, line breaks, etc.
function formatAIText(text) {
  if (!text) return "";
  let formatted = text
    // Code blocks: ```lang\ncode\n```
    .replace(/```([\w]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class='ai-code-block'><code>${code
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code></pre>`;
    })
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Inline code: `code`
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headings: #, ##, ###
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    // Lists: * item or - item
    .replace(/^[*-] (.*)$/gm, "<li>$1</li>")
    // Blockquotes: > text
    .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
    // Line breaks
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
  // Wrap lists in <ul>
  formatted = formatted.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
  return formatted;
}

// Copy to clipboard utility
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

const AIInsightsTool = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hi ${
        user?.fullName || "there"
      }! I'm your AI academic assistant. Ask me anything about your progress, projects, or how to improve!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [lastAiMsg, setLastAiMsg] = useState("");
  const chatEndRef = useRef(null);
  const [stopRequested, setStopRequested] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const currentInput = input;
    setInput(""); // Clear input immediately
    setMessages((msgs) => {
      const newMsgs = [...msgs, userMsg];
      // Start loading and typing right away
      setLoading(true);
      setTyping(true);
      // Fire the async request, using the newMsgs as history
      (async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          const res = await axios.post(
            `${API_URL}/gemini/ai-chat`,
            {
              message: currentInput,
              history: newMsgs,
              userData: user,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setLastAiMsg(res.data.reply);
          setMessages((msgs2) => [
            ...msgs2,
            { sender: "ai", text: res.data.reply },
          ]);
        } catch (err) {
          setLastAiMsg("Sorry, I couldn't process your request.");
          setMessages((msgs2) => [
            ...msgs2,
            { sender: "ai", text: "Sorry, I couldn't process your request." },
          ]);
        }
        setLoading(false);
      })();
      return newMsgs;
    });
  };

  // Stop button handler
  const handleStop = () => {
    setStopRequested(true);
    setTyping(false);
    setLoading(false);
  };

  // Extract code blocks for copy
  const extractCodeBlocks = (html) => {
    const regex = /<pre class='ai-code-block'><code>([\s\S]*?)<\/code><\/pre>/g;
    let match,
      blocks = [];
    while ((match = regex.exec(html))) {
      blocks.push(match[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
    }
    return blocks;
  };

  // Find the last AI message for typing animation
  const getMessageContent = (msg, i) => {
    const html = formatAIText(msg.text);
    if (
      msg.sender === "ai" &&
      i === messages.length - 1 &&
      typing &&
      lastAiMsg
    ) {
      return (
        <TypingMessage
          text={formatAIText(lastAiMsg)}
          onDone={() => setTyping(false)}
        />
      );
    }
    if (msg.sender === "ai") {
      // Render code blocks with copy button (icon)
      const codeBlocks = extractCodeBlocks(html);
      let rendered = html;
      codeBlocks.forEach((block, idx) => {
        rendered = rendered.replace(
          /<pre class='ai-code-block'><code>[\s\S]*?<\/code><\/pre>/,
          `<div class='relative group ai-code-block-wrap'><pre class='ai-code-block'><code>${block
            .replace(/</g, "&lt;")
            .replace(
              />/g,
              "&gt;"
            )}</code></pre><button class='copy-btn' data-idx='${idx}' title='Copy code' style='position:absolute;top:8px;right:8px;background:transparent;border:none;cursor:pointer;'><span style='display:flex;align-items:center;gap:2px;'><svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M10 1.5A1.5 1.5 0 0 1 11.5 3V4h1A1.5 1.5 0 0 1 14 5.5v7A1.5 1.5 0 0 1 12.5 14h-7A1.5 1.5 0 0 1 4 12.5v-1H3A1.5 1.5 0 0 1 1.5 10V3A1.5 1.5 0 0 1 3 1.5h7zm-7 1A.5.5 0 0 0 2.5 3v7a.5.5 0 0 0 .5.5h1V5.5A1.5 1.5 0 0 1 5.5 4h6V3a.5.5 0 0 0-.5-.5h-7zm2.5 3A.5.5 0 0 0 5 5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7z'/></svg></span></button></div>`
        );
      });
      return (
        <span
          className="group/ai-msg block"
          dangerouslySetInnerHTML={{ __html: rendered }}
          onClick={(e) => {
            if (e.target.closest && e.target.closest(".copy-btn")) {
              const btn = e.target.closest(".copy-btn");
              const idx = btn.getAttribute("data-idx");
              copyToClipboard(codeBlocks[idx]);
              btn.innerHTML = `<span style='display:flex;align-items:center;gap:2px;'><svg width='16' height='16' fill='green' viewBox='0 0 16 16'><path d='M13.485 1.929a1.5 1.5 0 0 1 0 2.121l-7.07 7.07a1.5 1.5 0 0 1-2.122 0l-2.12-2.12a1.5 1.5 0 1 1 2.12-2.122l1.06 1.06 6.01-6.01a1.5 1.5 0 0 1 2.122 0z'/></svg></span>`;
              setTimeout(() => {
                btn.innerHTML = `<span style='display:flex;align-items:center;gap:2px;'><svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M10 1.5A1.5 1.5 0 0 1 11.5 3V4h1A1.5 1.5 0 0 1 14 5.5v7A1.5 1.5 0 0 1 12.5 14h-7A1.5 1.5 0 0 1 4 12.5v-1H3A1.5 1.5 0 0 1 1.5 10V3A1.5 1.5 0 0 1 3 1.5h7zm-7 1A.5.5 0 0 0 2.5 3v7a.5.5 0 0 0 .5.5h1V5.5A1.5 1.5 0 0 1 5.5 4h6V3a.5.5 0 0 0-.5-.5h-7zm2.5 3A.5.5 0 0 0 5 5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7z'/></svg></span>`;
              }, 1200);
            }
          }}
        >
          {/* Only Copy for AI message */}
        </span>
      );
    }
    // User message: add copy and edit button (icons)
    if (msg.sender === "user") {
      return (
        <>
          <div
            className={` px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line leading-relaxed tracking-normal break-words bg-blue-600 text-white rounded-br-md  group/user-msg`}
            style={{ fontFamily: "inherit", fontSize: "1.05rem" }}
          >
            {msg.text}
          </div>{" "}
          <div className="flex gap-2 mt-1 mb-2 opacity-100 sm:opacity-0 hover:opacity-100 transition-opacity justify-end max-w-[90vw] sm:max-w-[75%]">
            <button
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 flex items-center"
              onClick={() => copyToClipboard(msg.text)}
              type="button"
              title="Copy"
            >
              <FaCopy />
            </button>
            <button
              className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-800 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700 border border-yellow-300 dark:border-yellow-600 flex items-center"
              onClick={() => handleEditMessage(i, msg.text)}
              type="button"
              title="Edit"
            >
              <FaEdit />
            </button>
          </div>
        </>
      );
    }
    return msg.text;
  };

  // Edit message state/logic
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const handleEditMessage = (idx, text) => {
    setEditIdx(idx);
    setEditValue(text);
  };
  const handleEditSave = async () => {
    if (editIdx !== null && editValue.trim()) {
      setMessages((msgs) => {
        const updatedMsgs = msgs.slice(0, editIdx + 1);
        updatedMsgs[editIdx] = { ...updatedMsgs[editIdx], text: editValue };
        return updatedMsgs;
      });

      // If we're editing a user message, send the edited message to get a new response
      const editedMsg = { sender: "user", text: editValue };
      setInput("");
      setLoading(true);
      setTyping(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.post(
          `${API_URL}/gemini/ai-chat`,
          {
            message: editValue,
            history: messages.slice(0, editIdx).concat(editedMsg),
            userData: user,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLastAiMsg(res.data.reply);
        setMessages((msgs) => [
          ...msgs.slice(0, editIdx + 1),
          { sender: "ai", text: res.data.reply },
        ]);
      } catch (err) {
        setLastAiMsg("Sorry, I couldn't process your request.");
        setMessages((msgs) => [
          ...msgs.slice(0, editIdx + 1),
          { sender: "ai", text: "Sorry, I couldn't process your request." },
        ]);
      }
      setLoading(false);
      setEditIdx(null);
      setEditValue("");
    }
  };
  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue("");
  };

  return (
    <div className="p-0 sm:px-6 w-full max-w-full mx-auto">
      {" "}
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 px-4 pt-6">
        <FaRobot className="text-blue-500" /> TrackEd Assistant
      </h1>
      <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow border border-light-border dark:border-dark-border p-0 sm:p-4 h-[70vh] flex flex-col overflow-hidden w-full">
        <div className="flex-1 overflow-y-auto pr-2 mb-2 px-2 sm:px-4 py-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {editIdx === i ? (
                <div className="flex flex-col w-full max-w-[90vw] sm:max-w-[75%]">
                  <textarea
                    className="w-full px-3 py-2 rounded border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-base mb-2"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700 flex items-center gap-1"
                      onClick={handleEditSave}
                      type="button"
                      title="Save"
                    >
                      <FaCheck /> Send
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1"
                      onClick={handleEditCancel}
                      type="button"
                      title="Cancel"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : msg.sender === "ai" ? (
                <div
                  className="max-w-[90vw] sm:max-w-[75%] text-base whitespace-pre-line leading-relaxed tracking-normal break-words rounded-bl-md text-left group/ai-msg"
                  style={{
                    fontFamily: "inherit",
                    fontSize: "1.05rem",
                    background: "none",
                    boxShadow: "none",
                    padding: 0,
                  }}
                >
                  {getMessageContent(msg, i)}{" "}
                  <div className="flex gap-2 mt-1 opacity-100 sm:opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 flex items-center"
                      onClick={() => copyToClipboard(msg.text)}
                      type="button"
                      title="Copy"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontFamily: "inherit", fontSize: "1.05rem" }}>
                    {getMessageContent(msg, i)}
                  </div>
                </>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex mb-3 justify-start">
              <div
                className="max-w-[90vw] sm:max-w-[75%] text-base rounded-bl-md animate-pulse"
                style={{ background: "none", boxShadow: "none", padding: 0 }}
              >
                <span>Typing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form
          onSubmit={sendMessage}
          className="flex gap-2 mt-2 px-2 sm:px-4 pb-4"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || typing} // Disable while loading or typing
            autoFocus
          />
          {loading || typing ? (
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-1 disabled:opacity-60"
              onClick={handleStop}
              aria-label="Stop"
            >
              <FaStop />
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 disabled:opacity-60"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <FaPaperPlane />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AIInsightsTool;
