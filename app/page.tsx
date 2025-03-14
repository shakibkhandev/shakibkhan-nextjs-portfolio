"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial dark mode preference
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Add timeout to hide loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Create ripple effect
    const ripple = document.createElement("div");
    ripple.className = "theme-ripple";
    document.body.appendChild(ripple);

    // Set ripple position to theme toggle button position
    const button = document.querySelector('[aria-label="Toggle theme"]');
    const rect = button.getBoundingClientRect();
    ripple.style.setProperty("--ripple-color", newDarkMode ? "#000" : "#fff");
    ripple.style.setProperty("--ripple-top", `${rect.top + rect.height / 2}px`);
    ripple.style.setProperty(
      "--ripple-left",
      `${rect.left + rect.width / 2}px`
    );

    // Add transition class
    document.documentElement.classList.add("theme-transition");

    // Toggle theme
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#000000";
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      localStorage.setItem("darkMode", "false");
    }

    // Cleanup
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      document.body.removeChild(ripple);
    }, 1000);
  };

  // Set initial background color
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000000" : "#ffffff";
  }, []);

  // Add this useEffect to set up global transition styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .theme-transition,
      .theme-transition *,
      .theme-transition *:before,
      .theme-transition *:after {
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1) !important;
        transition-delay: 0 !important;
      }

      @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(10); opacity: 0.5; }
        100% { transform: scale(35); opacity: 0; }
      }

      .theme-ripple {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 100;
      }

      .theme-ripple::before {
        content: '';
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: var(--ripple-color);
        animation: ripple 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Modify the animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Increase delay between children
        delayChildren: 0.3, // Start after loading screen
        when: "beforeChildren", // Wait for parent animation before starting children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.4,
      },
    },
  };

  // Add this for the initial loading animation
  const loadingVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <main
      className={`min-h-screen p-6 md:p-12 transition-all duration-500 ease-in-out ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Enhanced loading animation */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
          >
            <motion.div
              variants={loadingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }} // Faster animation
              className="relative flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.3,
                }}
                className="w-16 h-16 mb-8 rounded-full border-4 border-gray-700 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="w-12 h-12 rounded-full border-t-4 border-blue-500"
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-white mb-2"
              >
                Welcome
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }} // Small delay after loading screen
          >
            {/* Header Section with enhanced animation */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-2">
                  Hi, I'm Shakib <span className="animate-wave">👋</span>
                </h1>
                <p
                  className={`text-lg mt-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Web Developer and Android Developer. I love building things
                  and helping people. Very active on Twitter.
                </p>
              </div>

              <div className="shrink-0">
                <div className="relative w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
                  <Image
                    src="/profile.png"
                    alt="Shakib's profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.section
              variants={itemVariants}
              className="mt-12 transform transition-all duration-500 hover:scale-[1.01]"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                About
                <div className="h-1 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </h2>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-600"} 
                        p-4 rounded-lg border border-gray-200 dark:border-gray-700
                        ${darkMode ? "bg-gray-900/30" : "bg-gray-50/50"}`}
              >
                I'm a passionate developer with a focus on web and mobile
                development. I enjoy learning new technologies, creating
                innovative solutions, and exploring the intersection of AI and
                business. Currently, I'm working on personal projects to enhance
                my skills in JavaScript, Kotlin, and more. Always open to
                collaborating and learning from others. Let's build something
                awesome together!
              </p>
            </motion.section>

            {/* Work Experience Section */}
            <motion.section
              variants={itemVariants}
              className="mt-12 transform transition-all duration-500 hover:scale-[1.01]"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Work Experience
                <div className="h-1 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </h2>
              <div
                className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700
                          ${darkMode ? "bg-gray-900/30" : "bg-gray-50/50"}`}
              >
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  No Experience Yet
                </p>
              </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
              variants={itemVariants}
              className="mt-12 transform transition-all duration-500 hover:scale-[1.01]"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Education
                <div className="h-1 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </h2>
              <div className="space-y-6">
                {/* HSC Timeline Item */}
                <div className="group relative pl-8 border-l-2 border-gray-300 dark:border-gray-700">
                  <div
                    className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600 
                            group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"
                  ></div>
                  <div
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}
                             p-4 rounded-lg border border-gray-200 dark:border-gray-700
                                 ${
                                   darkMode ? "bg-gray-900/30" : "bg-gray-50/50"
                                 }
                             transform transition-all duration-500 ease-out
                             group-hover:-translate-y-1 group-hover:shadow-xl`}
                  >
                    <h3 className="text-xl font-semibold">
                      Higher Secondary Certificate (HSC)
                    </h3>
                    <p className="text-sm font-medium mt-1">2024 - 2026</p>
                    <p className="mt-1 text-sm">Trying To Pass</p>
                  </div>
                </div>

                {/* SSC Timeline Item */}
                <div className="group relative pl-8 border-l-2 border-gray-300 dark:border-gray-700">
                  <div
                    className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600 
                            group-hover:scale-125 group-hover:shadow-lg transition-all duration-300"
                  ></div>
                  <div
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"}
                             p-4 rounded-lg border border-gray-200 dark:border-gray-700
                                 ${
                                   darkMode ? "bg-gray-900/30" : "bg-gray-50/50"
                                 }
                             transform transition-all duration-500 ease-out
                             group-hover:-translate-y-1 group-hover:shadow-xl`}
                  >
                    <h3 className="text-xl font-semibold">
                      Secondary School Certificate (SSC)
                    </h3>
                    <p className="text-sm font-medium mt-1">2024</p>
                    <p className="mt-1 text-sm">Currently Pursuing</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section variants={itemVariants} className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "React", url: "https://react.dev" },
                  { name: "Next.js", url: "https://nextjs.org" },
                  { name: "TypeScript", url: "https://www.typescriptlang.org" },
                  { name: "Node.js", url: "https://nodejs.org" },
                  { name: "Python", url: "https://www.python.org" },
                  { name: "Go", url: "https://golang.org" },
                  { name: "Postgres", url: "https://www.postgresql.org" },
                  { name: "Docker", url: "https://www.docker.com" },
                  { name: "Kubernetes", url: "https://kubernetes.io" },
                  { name: "Java", url: "https://www.java.com" },
                  { name: "C++", url: "https://isocpp.org" },
                  { name: "React Native", url: "https://reactnative.dev" },
                  {
                    name: "Jetpack Compose",
                    url: "https://developer.android.com/jetpack/compose",
                  },
                  { name: "Prisma", url: "https://www.prisma.io" },
                  { name: "Kotlin", url: "https://kotlinlang.org" },
                ].map((skill, index) => (
                  <a
                    key={index}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer
                          transition-all duration-300 hover:scale-105
                          ${
                            darkMode
                              ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 hover:border-gray-600"
                              : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 hover:border-gray-300"
                          }`}
                  >
                    {skill.name}
                  </a>
                ))}
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section variants={itemVariants} className="mt-16">
              <div className="text-center mb-8">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium inline-block
              transition-all duration-300 hover:scale-105 cursor-pointer
              ${
                darkMode
                  ? "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700/80"
                  : "bg-gray-100/80 text-gray-800 border border-gray-200 hover:bg-gray-200/80"
              }`}
                >
                  My Projects
                </span>
                <h2
                  className={`text-4xl font-bold mt-4 mb-3 transition-colors duration-300
              ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  Check out my latest work
                </h2>
                <p
                  className={`text-lg transition-colors duration-300
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  I've worked on a variety of projects, from simple websites to
                  complex web applications.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Chat Collect Project */}
                <div
                  className={`rounded-lg overflow-hidden border ${
                    darkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-[160px] sm:h-[140px]">
                    <Image
                      src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                      alt="Chat Collect"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">Chat Collect</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Jan 2024 - Feb 2024
                    </p>
                    <p
                      className={`text-sm mb-3 line-clamp-2 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      With the release of the OpenAI GPT Store, I decided to
                      build a SaaS which allows users to collect email addresses
                      from their GPT users.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {["Next.js", "TypeScript", "PostgreSQL", "Prisma"].map(
                        (tech, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${
                              darkMode
                                ? "bg-gray-800 text-gray-300 border border-gray-700"
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                    <a
                      href="#"
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium 
                            ${
                              darkMode
                                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      Website
                    </a>
                  </div>
                </div>

                {/* Magic UI Project */}
                <div
                  className={`rounded-lg overflow-hidden border ${
                    darkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-[160px] sm:h-[140px]">
                    <Image
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                      alt="Magic UI"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">Magic UI</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      June 2023 - Present
                    </p>
                    <p
                      className={`text-sm mb-3 line-clamp-2 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Designed, developed and sold animated UI components for
                      developers.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {[
                        "Next.js",
                        "TypeScript",
                        "Shadcn UI",
                        "TailwindCSS",
                      ].map((tech, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-gray-800 text-gray-300 border border-gray-700"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium 
                              ${
                                darkMode
                                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Website
                      </a>
                      <a
                        href="#"
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium 
                              ${
                                darkMode
                                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section variants={itemVariants} className="mt-16 mb-24">
              <div className="text-center mb-8">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium inline-block
                  transition-all duration-300 hover:scale-105 cursor-pointer
                  ${
                    darkMode
                      ? "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700/80"
                      : "bg-gray-100/80 text-gray-800 border border-gray-200 hover:bg-gray-200/80"
                  }`}
                >
                  Get in Touch
                </span>
                <h2
                  className={`text-4xl font-bold mt-4 mb-3 transition-colors duration-300
                  ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  Let's work together
                </h2>
                <p
                  className={`text-lg transition-colors duration-300
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Feel free to reach out for collaborations or just a friendly
                  hello
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <a
                  href="mailto:your.email@example.com"
                  className={`group p-6 rounded-2xl transition-all duration-300
                  ${
                    darkMode
                      ? "bg-gray-800/50 hover:bg-gray-800"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl
                      ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        Email
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        your.email@example.com
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="https://twitter.com/yourusername"
                  className={`group p-6 rounded-2xl transition-all duration-300
                  ${
                    darkMode
                      ? "bg-gray-800/50 hover:bg-gray-800"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl
                      ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        Twitter
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        @yourusername
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Bar with enhanced animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 2, // Delay until after content appears
        }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl border 
          backdrop-blur-md transition-all duration-500 ease-in-out
          ${
            darkMode
              ? "bg-gray-900/80 border-gray-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/80 border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          }`}
      >
        <nav className="flex items-center gap-4">
          {/* Home Link */}
          <div className="relative group">
            <a
              href="/"
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
                transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 hover:scale-110"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              Home
            </span>
          </div>

          {/* GitHub Link */}
          <div className="relative group">
            <a
              href="https://github.com/yourusername"
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
                transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 hover:scale-110"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              GitHub
            </span>
          </div>

          {/* LinkedIn Link - Add after GitHub link */}
          <div className="relative group">
            <a
              href="https://linkedin.com/in/yourusername"
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
                transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-[#0077b5] hover:bg-blue-50/80"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 hover:scale-110"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              LinkedIn
            </span>
          </div>

          {/* Facebook Link - Add after LinkedIn link */}
          <div className="relative group">
            <a
              href="https://facebook.com/yourusername"
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
                transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-[#1877f2] hover:bg-blue-50/80"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 hover:scale-110"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              Facebook
            </span>
          </div>

          {/* Twitter/X Link */}
          <div className="relative group">
            <a
              href="https://x.com/yourusername"
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
                transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 hover:scale-110"
              >
                <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                <path d="M4 20l6.768-6.768" />
                <path d="M19.5 4h-4.267l-11.733 16h4.267l11.733-16z" />
              </svg>
            </a>
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              Twitter
            </span>
          </div>

          {/* Theme Toggle Button */}
          <div className="relative group">
            <button
              onClick={toggleDarkMode}
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "text-gray-200 bg-gray-800 hover:bg-gray-700"
                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
              aria-label="Toggle theme"
            >
              <div className="relative z-10 transition-transform duration-500 ease-in-out">
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </div>
            </button>
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
        </nav>
      </motion.div>
    </main>
  );
}
