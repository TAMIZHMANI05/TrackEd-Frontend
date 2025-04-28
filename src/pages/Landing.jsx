import heroImageLight from "../assets/images/heroImageLight.svg";
import useInView from "../hooks/useInView";
import { Link } from "react-router-dom";

const FeatureCard = ({ feature, index, className }) => {
  return (
    <div className={`flex flex-col reveal stagger-${index + 1} ${className}`}>
      <Link
        to={feature.route}
        className="relative rounded-lg bg-light-bg dark:bg-dark-bg p-8 ring-1 ring-light-border dark:ring-dark-border transition-all duration-300 group hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
      >
        {/* Card Gradient Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        {/* Icon */}
        <div className="mb-6 relative">
          <div className="h-12 w-12 rounded-lg bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-light-primary dark:text-dark-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={feature.icon.path}
              />
            </svg>
          </div>
          {/* Decorative dot */}
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-light-accent dark:bg-dark-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <h3 className="text-xl font-semibold leading-8 text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-dark-text-secondary">
          {feature.description}
        </p>

        {/* Learn More Link */}
        <div className="mt-6 flex items-center text-light-primary dark:text-dark-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
          <span className="text-sm font-semibold">Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

const Landing = () => {
  const [featuresSectionRef, isFeaturesInView] = useInView({
    threshold: 0.2,
  });
  const [quoteSectionRef, isQuoteInView] = useInView({
    threshold: 0.2,
  });

  const features = [
    {
      title: "CGPA Tracking",
      description:
        "Track your CGPA over multiple semesters with detailed insights and progress monitoring.",
      icon: {
        path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      route: "features/cgpa-tracking",
    },
    {
      title: "Project Management",
      description:
        "Manage academic projects, track milestones, and collaborate with team members efficiently.",
      icon: {
        path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      },
      route: "features/project-management",
    },
    {
      title: "AI Insights",
      description:
        "Get personalized recommendations and predictions powered by Artificial Intelligence.",
      icon: {
        path: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      route: "features/ai-insights",
    },
    {
      title: "CGPA Tracking",
      description:
        "Track your CGPA over multiple semesters with detailed insights and progress monitoring.",
      icon: {
        path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      route: "features/cgpa-tracking",
    },
    {
      title: "Project Management",
      description:
        "Manage academic projects, track milestones, and collaborate with team members efficiently.",
      icon: {
        path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      },
      route: "features/project-management",
    },
    {
      title: "AI Insights",
      description:
        "Get personalized recommendations and predictions powered by Artificial Intelligence.",
      icon: {
        path: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      route: "features/ai-insights",
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative isolate">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-y-0 right-0 w-full bg-gradient-to-br from-light-primary/10 to-light-accent/5 dark:from-dark-primary/10 dark:to-dark-accent/5"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 70% 0)" }}
          />
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content Wrapper */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-12 sm:py-20 px-30">
            {/* Text Content */}
            <div
              className="w-full lg:w-1/2 space-y-6 text-center lg:text-left opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
                Your Academic
                <span className="block text-light-primary dark:text-dark-primary mt-2">
                  Journey Simplified
                </span>
              </h1>
              <p className="text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto lg:mx-0">
                Accelerate your academic progress with AI-driven
                insights—whether you're tracking CGPA, managing projects, or
                aiming for better performance.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-x-6">
                <a
                  href="/login"
                  className="rounded-md bg-light-primary dark:bg-dark-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:scale-105 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-200"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="text-sm font-semibold leading-6 text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="w-full lg:w-1/2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="relative max-w-lg mx-auto">
                <img
                  src={heroImageLight}
                  alt="Academic dashboard visualization"
                  className="w-full h-auto object-contain"
                />
                {/* Decorative blur effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 rounded-lg blur-2xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="scroll-mt-20" ref={featuresSectionRef}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mx-auto max-w-2xl lg:text-center reveal ${
              isFeaturesInView ? "visible" : ""
            }`}
          >
            <h2 className="text-3xl font-semibold leading-7 text-light-accent dark:text-dark-accent">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">
              Everything you need to manage your academic life
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  className={isFeaturesInView ? "visible" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div
        className="py-24 sm:py-32 bg-gradient-to-br from-light-primary/5 to-light-accent/5 dark:from-dark-primary/5 dark:to-dark-accent/5"
        ref={quoteSectionRef}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mx-auto max-w-3xl text-center reveal ${
              isQuoteInView ? "visible" : ""
            }`}
          >
            <svg
              className="mx-auto h-12 w-12 text-light-primary dark:text-dark-primary mb-8 opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <blockquote>
              <p className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary sm:text-3xl">
                "Education is not preparation for life; education is life
                itself."
              </p>
            </blockquote>
            <div className="mt-8">
              <p className="text-base font-semibold text-light-primary dark:text-dark-primary">
                John Dewey
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Philosopher, Psychologist, and Educational Reformer
              </p>
            </div>
          </div>
          {/* New Call to Action after the quote */}
          <div className="mt-12 flex justify-center">
            <a
              href="/signup"
              className="rounded-md bg-light-primary dark:bg-dark-primary px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-200"
            >
              Join TrackEd Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
