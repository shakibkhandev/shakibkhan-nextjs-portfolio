"use client";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { 
  AnimatePresence, 
  motion, 
  useScroll, 
  useTransform, 
  useSpring 
} from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import ExpenseTrackerImage from "../assets/expense-tracker.png";
import filmflareImage from "../assets/filmflare.png";

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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { isDarkMode } = useGlobalContext();
  const [isOnBoarding, setIsOnBoarding] = useState(true);

  useEffect(() => {
    const onBoard = sessionStorage.getItem("isOnBoarding");

    if (!onBoard) {
      setTimeout(() => {
        setIsOnBoarding(false);
        sessionStorage.setItem("isOnBoarding", "true");
      }, 2000);
    } else {
      setIsOnBoarding(false);
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className={`min-h-screen w-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} origin-left z-50`}
        style={{ scaleX }}
      />
      <AnimatePresence mode="wait">
        {isOnBoarding ? (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`w-16 h-16 rounded-full ${
                isDarkMode ? "border-white" : "border-black"
              } border-2 border-t-transparent animate-spin`}
            />
          </motion.div>
        ) : (
          <motion.section className="max-w-4xl mx-auto px-4 py-16">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariants}
            >
              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  variants={textVariants}
                  className={`text-4xl md:text-6xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Hi, I&apos;m Shakib <span className="animate-wave">👋</span>
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Full Stack Developer & UI/UX Enthusiast
                </motion.p>
                <motion.div
                  variants={textVariants}
                  className="mt-8 flex gap-4 justify-center md:justify-start"
                >
                  <a
                    href="#contact"
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode 
                        ? "bg-white text-gray-900 hover:bg-gray-100" 
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Get in Touch
                  </a>
                  <a
                    href="#projects"
                    className={`px-6 py-3 rounded-lg font-medium border transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode 
                        ? "border-white text-white hover:bg-white/10" 
                        : "border-gray-900 text-gray-900 hover:bg-gray-900/10"
                    }`}
                  >
                    View Projects
                  </a>
                </motion.div>
              </div>

              <motion.div 
                variants={cardVariants}
                className="shrink-0"
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <div className={`absolute inset-0 rounded-2xl ${
                    isDarkMode ? "bg-white/10" : "bg-gray-900/5"
                  }`} />
                  <div className="absolute inset-1 rounded-2xl overflow-hidden">
                    <Image
                      src="/profile.png"
                      alt="Shakib's profile"
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 192px, 224px"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* About Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="mt-12 transform transition-all duration-500"
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                About
              </h2>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} 
                            p-4 rounded-lg 
                            ${isDarkMode ? "bg-gray-900/30" : "bg-gray-50/50"}`}
              >
                I&apos;m a passionate developer with a focus on web and mobile
                development. I enjoy learning new technologies, creating
                innovative solutions, and exploring the intersection of AI and
                business. Currently, I&apos;m working on personal projects to
                enhance my skills in JavaScript, Kotlin, and more. Always open
                to collaborating and learning from others. Let&apos;s build
                something awesome together!
              </p>
            </motion.section>

            {/* Work Experience Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="mt-12 transform transition-all duration-500"
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Work Experience
              </h2>
              <div
                className={`p-4 rounded-lg
                              ${
                                isDarkMode ? "bg-gray-900/30" : "bg-gray-50/50"
                              }`}
              >
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  No Experience Yet
                </p>
              </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="mt-12 transform transition-all duration-500 "
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Education
              </h2>
              <Timeline
                defaultValue={3}
                orientation="horizontal"
                className="white"
              >
                {[
                  {
                    degree: "Higher Secondary Certificate (HSC)",
                    status: "Trying to pass",
                    timeline: "2024-2026",
                  },
                  {
                    degree: "Secondary School Certificate (SSC)",
                    status: "Successfully passed",
                    timeline: "2022-2024",
                  },
                  {
                    degree: "Junior School Certificate (JSC)",
                    status: "Successfully passed",
                    timeline: "2021",
                  },
                ].map((item, index) => (
                  <TimelineItem
                    key={index}
                    step={index}
                    isDarkMode={isDarkMode}
                    className={`${isDarkMode ? "text-white" : ""}`}
                  >
                    <TimelineHeader>
                      <TimelineSeparator />
                      <TimelineDate>{item.timeline}</TimelineDate>
                      <TimelineTitle>{item.degree}</TimelineTitle>
                      <TimelineIndicator isDarkMode={isDarkMode} />
                    </TimelineHeader>
                    <TimelineContent>{item.status}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-24 scroll-mt-16"
            >
              <motion.div 
                className="flex flex-wrap gap-3 justify-center md:justify-start"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "React", "Next.js", "TypeScript", "Node.js",
                  "Python", "Postgres", "Docker", "Java", "Kotlin"
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer
                      transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? "bg-white/10 text-white hover:bg-white/20" 
                        : "bg-gray-900/5 text-gray-900 hover:bg-gray-900/10"
                    }`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Projects Section */}
            <motion.section id="projects" className="mt-24 scroll-mt-16">
              <div className="text-center mb-8">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium inline-block
                  transition-all duration-300 hover:scale-105 cursor-pointer
                  ${
                    isDarkMode
                      ? "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700/80"
                      : "bg-gray-100/80 text-gray-800 border border-gray-200 hover:bg-gray-200/80"
                  }`}
                >
                  My Projects
                </span>
                <h2
                  className={`text-4xl font-bold mt-4 mb-3 transition-colors duration-300
                  ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  Check out my latest work
                </h2>
                <p
                  className={`text-lg transition-colors duration-300
                  ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications.
                </p>
              </div>

              <Swiper className="mySwiper" rewind={true}>
                {[
                  {
                    name: "Filmflare",
                    image: filmflareImage,
                    timeline: "Jan 2025 - Feb 2025",
                    details:
                      "Filmflare is a movie discovery web application built with Next.js and TypeScript. It allows users to explore trending movies, search for their favorites, and view detailed information about each film.",
                    techStacks: ["Next.js", "TypeScript", "TMDB", "Swiper"],
                    url: "https://github.com/shakibkhandev/Filmflare-Movie-Web-App",
                  },
                  {
                    name: "Expense Tracker",
                    image: ExpenseTrackerImage,
                    timeline: "Jan 2025 - Feb 2025",
                    details:
                      "Expense Tracker is a web application designed to help users manage their finances. Built with Next.js and TypeScript, it allows users to track expenses The app uses Local database.",
                    techStacks: ["Next.js", "TypeScript", "Radix"],
                    url: "https://github.com/shakibkhandev/Expense-Tracker-Web-App",
                  },
                ].map((item: any, index: number) => (
                  <SwiperSlide>
                    <div
                      className={`rounded-lg overflow-hidden border ${
                        isDarkMode ? "border-gray-800" : "border-gray-200"
                      }`}
                    >
                      {/* Grid Container */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Image Section */}
                        <div className="relative h-[160px] sm:h-[240px] md:h-full">
                          <Image
                            src={item.image}
                            alt="Filmflare Image"
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                          <h3
                            className={`text-xl font-bold mb-1 ${
                              isDarkMode && "text-gray-100"
                            }`}
                          >
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {item.timeline}
                          </p>
                          <p
                            className={`text-sm mb-3 line-clamp-2 ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {item.details}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.techStacks.map(
                              (tech: String, index: number) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    isDarkMode
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
                            target="_blank"
                            href={item.url}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium 
                            ${
                              isDarkMode
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
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.section>

            {/* Contact Section */}
            <motion.section id="contact" className="mt-24 scroll-mt-16 mb-24">
              <div className="text-center mb-8">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium inline-block
                      transition-all duration-300 hover:scale-105 cursor-pointer
                      ${
                        isDarkMode
                          ? "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700/80"
                          : "bg-gray-100/80 text-gray-800 border border-gray-200 hover:bg-gray-200/80"
                      }`}
                >
                  Get in Touch
                </span>
                <h2
                  className={`text-4xl font-bold mt-4 mb-3 transition-colors duration-300
                      ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  Let&apos;s work together
                </h2>
                <p
                  className={`text-lg transition-colors duration-300
                      ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Feel free to reach out for collaborations or just a friendly
                  hello
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <a
                  href="mailto:mdshakibkhan.dev@gmail.com"
                  className={`group p-6 rounded-2xl transition-all duration-300
                      ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-gray-800"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl
                          ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        Email
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        mdshakibkhan.dev@gmail.com
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="https://x.com/shakib_khan_dev"
                  target="_blank"
                  className={`group p-6 rounded-2xl transition-all duration-300
                      ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-gray-800"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl
                          ${
                            isDarkMode
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
  <path d="M17 3h4l-7.5 8.5L21 21h-4l-5-6-5 6H3l7.5-9.5L3 3h4l5 6z" />
</svg>

                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        X
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        @shakib_khan_dev
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </motion.section>

            {/* Newsletter Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-24 mb-16"
            >
              <div className={`max-w-2xl mx-auto p-8 rounded-2xl ${
                isDarkMode ? "bg-white/5" : "bg-gray-900/5"
              }`}>
                <div className="text-center">
                  <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Stay Updated
                  </h2>
                  <p className={`text-sm md:text-base mb-8 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Subscribe to my newsletter for the latest updates on projects, articles, and tech insights.
                  </p>
                </div>
                
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-3 rounded-lg text-sm md:text-base outline-none ${
                      isDarkMode 
                        ? "bg-white/10 text-white placeholder:text-gray-400 focus:bg-white/20" 
                        : "bg-white text-gray-900 placeholder:text-gray-500 focus:bg-gray-50"
                    } transition-all duration-300`}
                  />
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      isDarkMode 
                        ? "bg-white text-gray-900 hover:bg-gray-100" 
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.section>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
