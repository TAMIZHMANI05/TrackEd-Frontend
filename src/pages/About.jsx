import React from "react";
import logo from "../assets/images/TrackEd-Logo.svg";

const About = () => (
  <div className="min-h-screen pt-24 pb-16 bg-light-bg dark:bg-dark-bg transition-colors duration-200">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <img src={logo} alt="TrackEd Logo" className="mx-auto h-20 mb-6" />
      <h1 className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-4">
        About TrackEd
      </h1>
      <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
        TrackEd is your all-in-one academic companion, designed to help students
        track their progress, manage projects, and gain AI-powered insights for
        academic success. Our mission is to simplify your academic journey and
        empower you to achieve your goals with clarity and confidence.
      </p>
      <div className="bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg p-6 mb-8 text-left">
        <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-2">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-base text-light-text dark:text-dark-text">
          <li>CGPA Tracking across semesters</li>
          <li>Project Management for academic and personal projects</li>
          <li>AI Insights for personalized recommendations</li>
          <li>Modern, responsive, and user-friendly interface</li>
        </ul>
      </div>
      <div className="text-base text-light-text/80 dark:text-dark-text/80 mb-8">
        <p>
          TrackEd is built with passion by{" "}
          <a
            href="https://github.com/tamizhmani05"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-light-primary dark:hover:text-dark-primary"
          >
            Tamizhmani
          </a>{" "}
          and the open-source community. We believe in making education
          accessible, organized, and insightful for everyone.
        </p>
      </div>
      <div className="text-sm text-light-text/60 dark:text-dark-text/60">
        &copy; {new Date().getFullYear()} TrackEd. All rights reserved.
      </div>
    </div>
  </div>
);

export default About;
