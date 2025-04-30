import { Link } from "react-router-dom";
import projImg from "../../assets/images/Project-Org.svg"; 

const ProjectManagement = () => {
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
          <div className="space-y-6  order-1">
            <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Project Management
              <span className="block text-light-primary dark:text-dark-primary text-xl mt-2">
                Organize Your Academic Projects
              </span>
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Stay on top of your academic projects with our intuitive project
                management system. Track progress, manage deadlines, and
                collaborate with team members seamlessly.
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
                  <span>Kanban board for visual task management</span>
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
                  <span>Real-time collaboration with team members</span>
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
                  <span>Milestone tracking and deadline management</span>
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
                  <span>File sharing and version control integration</span>
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
            <img src={projImg} alt="" />
            <div className="absolute inset-0 bg-gradient-to-br from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 rounded-lg filter blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
