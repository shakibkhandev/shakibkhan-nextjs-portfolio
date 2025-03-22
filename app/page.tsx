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
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <main
      className={`min-h-screen w-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <AnimatePresence mode="wait">
        {isOnBoarding ? (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i * 45 * Math.PI) / 180) * 40,
                  y: Math.sin((i * 45 * Math.PI) / 180) * 40,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-4xl font-bold text-white mb-2 mt-36 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Welcome
            </motion.h1>
          </motion.div>
        ) : (
          <motion.section className="max-w-3xl mx-auto p-4">
            <motion.div
              className="flex items-center gap-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <div className="flex-1">
                <h1
                  className={`text-4xl md:text-5xl font-bold flex items-center gap-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Hi, I&apos;m Shakib <span className="animate-wave">👋</span>
                </h1>
                <p
                  className={`text-lg mt-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
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
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="mt-12"
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "React", url: "https://react.dev" },
                  { name: "Next.js", url: "https://nextjs.org" },
                  { name: "TypeScript", url: "https://www.typescriptlang.org" },
                  { name: "Node.js", url: "https://nodejs.org" },
                  { name: "Python", url: "https://www.python.org" },
                  { name: "Postgres", url: "https://www.postgresql.org" },
                  { name: "Docker", url: "https://www.docker.com" },
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
                                isDarkMode
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
            <motion.section className="mt-16">
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
            <motion.section className="mt-16 mb-24">
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
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        Twitter
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
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
