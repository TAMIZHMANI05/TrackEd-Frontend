import { Link } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-light-background dark:bg-dark-background mt-16" id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="-mt-5">
            <img
              src="/src/assets/images/TrackEd-Logo.svg"
              alt="TrackEd Logo"
              className="h-30"
            />
            <p className="text-base text-light-text/80 dark:text-dark-text/80">
              Your academic journey, simplified. Track your progress, manage
              projects, and get AI-powered insights.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://github.com/tamizhmani05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-light-text/60 dark:text-dark-text/60 hover:text-light-primary dark:hover:text-dark-primary"
              >
                <i class="fa fa-github" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/tamizhmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-light-text/60 dark:text-dark-text/60 hover:text-light-primary dark:hover:text-dark-primary"
              >
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-light-text dark:text-dark-text font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/features/cgpa-tracking"
                  onClick={scrollToTop}
                  className="text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary text-sm"
                >
                  CGPA Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/features/project-management"
                  onClick={scrollToTop}
                  className="text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary text-sm"
                >
                  Project Management
                </Link>
              </li>
              <li>
                <Link
                  to="/features/ai-insights"
                  onClick={scrollToTop}
                  className="text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary text-sm"
                >
                  AI Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg text-light-text dark:text-dark-text font-semibold mb-4">
              Connect With Us
            </h3>
            <div className="space-y-2">
              <p className="text-base text-light-text/80 dark:text-dark-text/80">
                Have questions or feedback?
              </p>
              <a
                href="mailto:tamizhmani13270@gmail.com"
                className="text-base text-light-primary dark:text-dark-primary hover:underline"
              >
                tamizhmani13270@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Dev Credits */}
        <div className="mt-8 text-center text-sm text-light-text/60 dark:text-dark-text/60">
          Developed by{" "}
          <a
            href="https://github.com/tamizhmani05"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-light-primary dark:hover:text-dark-primary"
          >
            TAMIZHMANI
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-border dark:border-dark-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-base text-light-text/60 dark:text-dark-text/60">
              © {new Date().getFullYear()} TrackEd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                onClick={scrollToTop}
                className="text-base text-light-text/60 dark:text-dark-text/60 hover:text-light-primary dark:hover:text-dark-primary"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                onClick={scrollToTop}
                className="text-base text-light-text/60 dark:text-dark-text/60 hover:text-light-primary dark:hover:text-dark-primary"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
