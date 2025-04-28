import { Link } from "react-router-dom";

const AIInsights = () => {
  return (
    <div className="min-h-screen pt-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link
          to="/#features"
          className="inline-flex items-center text-light-primary dark:text-dark-primary hover:text-light-secondary dark:hover:text-dark-secondary transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Features
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
              AI Insights
              <span className="block text-light-primary dark:text-dark-primary text-xl mt-2">
                Smart Academic Recommendations
              </span>
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Leverage the power of artificial intelligence to get
                personalized recommendations and insights for your academic
                journey. Our AI system analyzes your performance patterns to
                provide actionable advice.
              </p>
              <h3 className="text-light-text-primary dark:text-dark-text-primary">
                Key Features:
              </h3>
              <ul className="space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-light-accent dark:text-dark-accent mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Personalized study recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-light-accent dark:text-dark-accent mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Performance trend analysis and predictions</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-light-accent dark:text-dark-accent mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Smart goal suggestions based on your capabilities</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-light-accent dark:text-dark-accent mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Resource recommendations and learning pathways</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <svg
              className="w-full h-auto"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="text-light-primary dark:text-dark-primary"
                fill="currentColor"
                d="M200 50l100 50-100 50-100-50z"
              />
              <path
                className="text-light-secondary dark:text-dark-secondary"
                fill="currentColor"
                d="M100 100v100l100 50v-100z"
              />
              <path
                className="text-light-accent dark:text-dark-accent"
                fill="currentColor"
                d="M300 100v100l-100 50v-100z"
              />
              <circle
                className="text-white dark:text-dark-card"
                fill="currentColor"
                cx="200"
                cy="150"
                r="20"
              />
              <path
                className="text-light-primary dark:text-dark-primary"
                fill="currentColor"
                strokeWidth="2"
                d="M190 150a10 10 0 0120 0 10 10 0 01-20 0z"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 rounded-lg filter blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
