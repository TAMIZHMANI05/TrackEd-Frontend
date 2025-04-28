import heroImageLight from "../assets/images/heroImageLight.svg";

const Landing = () => {
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
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-light-accent dark:text-dark-accent">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">
              Everything you need to manage your academic life
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {/* CGPA Tracking */}
              <div className="flex flex-col">
                <div className="rounded-lg bg-white dark:bg-dark-card p-6 ring-1 ring-light-border dark:ring-dark-border transition-all duration-200 hover:shadow-lg">
                  <h3 className="text-lg font-semibold leading-8 text-light-text-primary dark:text-dark-text-primary">
                    CGPA Tracking
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-dark-text-secondary">
                    Track your CGPA over multiple semesters with detailed
                    insights and progress monitoring.
                  </p>
                </div>
              </div>

              {/* Project Management */}
              <div className="flex flex-col">
                <div className="rounded-lg bg-white dark:bg-dark-card p-6 ring-1 ring-light-border dark:ring-dark-border transition-all duration-200 hover:shadow-lg">
                  <h3 className="text-lg font-semibold leading-8 text-light-text-primary dark:text-dark-text-primary">
                    Project Management
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-dark-text-secondary">
                    Manage academic projects, track milestones, and collaborate
                    with team members efficiently.
                  </p>
                </div>
              </div>

              {/* AI Insights */}
              <div className="flex flex-col">
                <div className="rounded-lg bg-white dark:bg-dark-card p-6 ring-1 ring-light-border dark:ring-dark-border transition-all duration-200 hover:shadow-lg">
                  <h3 className="text-lg font-semibold leading-8 text-light-text-primary dark:text-dark-text-primary">
                    AI Insights
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-dark-text-secondary">
                    Get personalized recommendations and predictions powered by
                    Gemini AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
