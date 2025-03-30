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

const projects = [
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
  {
    name: "Spaceship",
    image: "https://raw.githubusercontent.com/shakibkhandev/Spaceship-Static-Site/refs/heads/main/assets/01.png",
    timeline: "Jan 2025 - Feb 2025",  
    details:
      "Spaceship is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://spaceshipweb.netlify.app/",
  },
  {
    name: "Retro Arcade",
    image: "https://raw.githubusercontent.com/shakibkhandev/Retro-Arcade-Static-Site/refs/heads/main/assets/01.png",
    timeline: "Jan 2025 - Feb 2025",
    details: "Retro Arcade is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://retroarcadeweb.netlify.app/",
  },
  {
    name: "NexTech",
    image: "https://raw.githubusercontent.com/shakibkhandev/NexTech-Static-Site/refs/heads/main/assets/01.png",
    timeline: "Jan 2025 - Feb 2025",
    details: "NexTech is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://nextechweb.netlify.app/",
  },
  {
    name: "Gamer Hub",
    image: "https://raw.githubusercontent.com/shakibkhandev/GamerHub-Static-Site/refs/heads/main/assets/01.png",
    timeline: "Jan 2025 - Feb 2025",
    details: "Gamer Hub is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://gamerhubweb.netlify.app/",
  },
  {
    name: "Fishology",
    image: "https://raw.githubusercontent.com/shakibkhandev/Fishology-Static-Site/refs/heads/main/assets/01.png",
    timeline: "Jan 2025 - Feb 2025",
    details: "Fishology is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://fishologyweb.netlify.app/",
  },
  {
    name: "Extreose",
    image: "https://raw.githubusercontent.com/shakibkhandev/Extreose-Static-Site/refs/heads/main/assets/01.jpg",
    timeline: "February 2025 - March 2025",
    details: "Extreose is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://extreoseweb.netlify.app/",
  },
  {
    name: "Crafty",
    image: "https://raw.githubusercontent.com/shakibkhandev/Crafty-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "Crafty is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://craftyweb3.netlify.app/",
  },
  {
    name: "Cosmic Chronicles",
    image: "https://raw.githubusercontent.com/shakibkhandev/Cosmic-Chronicles-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "Cosmic Chronicles is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://cosmicchroniclesweb.netlify.app/",
  },
  {
    name: "Boheina",
    image: "https://raw.githubusercontent.com/shakibkhandev/Boheina-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "Boheina is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://boheina.netlify.app/",
  },
  {
    name: "AutoSpa Elite",
    image: "https://raw.githubusercontent.com/shakibkhandev/AutoSpa-Elite-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "AutoSpa Elite is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://autospaelite.netlify.app/",
  },
  {
    name: "Adventure Gear",
    image: "https://raw.githubusercontent.com/shakibkhandev/Adventure-Gear-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "Adventure Gear is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://adventuregear.netlify.app/",
  },
  {
    name: "FioLabs",
    image: "https://raw.githubusercontent.com/shakibkhandev/FioLabs-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "FioLabs is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://fiolabs.netlify.app/",
  },
  {
    name: "True Fitness",
    image: "https://raw.githubusercontent.com/shakibkhandev/TrueFitness-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "True Fitness is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://true-fitness.netlify.app/",
  },
  {
    name: "Pet Grooming Store",
    image: "https://raw.githubusercontent.com/shakibkhandev/Pet-Grooming-Store-Static-Site/refs/heads/main/assets/01.png",
    timeline: "February 2025 - March 2025",
    details: "Pet Grooming Store is a static website built with HTML, CSS, and JavaScript. It features a modern design and provides information about the app.",
    techStacks: ["HTML", "CSS", "JS"],
    url: "https://petgroomingstore.netlify.app/",
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const cardHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  }
};

const buttonVariants = {
  initial: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95,
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  }
};

export default function Home() {
  const { isDarkMode } = useGlobalContext();
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className={`min-h-screen w-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} origin-left z-50`}
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.section 
        className="max-w-4xl mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8"
          variants={containerVariants}
        >
          <motion.div className="flex-1 text-center md:text-left" variants={containerVariants}>
            <motion.h1
              variants={itemVariants}
              className={`text-4xl md:text-6xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Hi, I&apos;m Shakib <span className="animate-wave">👋</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Full Stack Developer & UI/UX Enthusiast
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex gap-4 justify-center md:justify-start"
            >
              <motion.a
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                href="#contact"
                className={`px-6 py-3 rounded-lg font-medium ${
                  isDarkMode 
                    ? "bg-white text-gray-900 hover:bg-gray-100" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Get in Touch
              </motion.a>
              <motion.a
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                href="#projects"
                className={`px-6 py-3 rounded-lg font-medium border ${
                  isDarkMode 
                    ? "border-white text-white hover:bg-white/10" 
                    : "border-gray-900 text-gray-900 hover:bg-gray-900/10"
                }`}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="shrink-0">
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden ${
                isDarkMode ? "bg-white/10" : "bg-gray-200/50"
              }`}
            >
              <Image
                src="/profile.png"
                alt="Profile Image"
                width={256}
                height={256}
                className="w-full h-full object-cover transform transition-transform duration-300"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* About Section */}
        <motion.section
          variants={containerVariants}
          className="mt-12 transform transition-all duration-500"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            About
          </motion.h2>
          <motion.p
            variants={itemVariants}
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
          </motion.p>
        </motion.section>

        {/* Work Experience Section */}
        <motion.section
          variants={containerVariants}
          className="mt-12"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Work Experience
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900/30" : "bg-gray-50/50"
            }`}
          >
            <motion.p
              variants={itemVariants}
              className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              No Experience Yet
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          variants={containerVariants}
          className="mt-12"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Education
          </motion.h2>
          <Timeline
            defaultValue={3}
            orientation={isMobile ? "vertical" : "horizontal"}
            className={`white`}
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
                className={`${isDarkMode ? "text-gray-100" : ""}`}
              >
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineDate className={`${isDarkMode ? "text-gray-200 opacity-70" : ""}`}>{item.timeline}</TimelineDate>
                  <TimelineTitle >{item.degree}</TimelineTitle>
                  <TimelineIndicator isDarkMode={isDarkMode} />
                </TimelineHeader>
                <TimelineContent className={`${isDarkMode ? "text-gray-200 opacity-70" : ""}`}>{item.status}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          variants={containerVariants}
          className="mt-12"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Skills
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            {[
              "React", "Next.js", "TypeScript", "Node.js",
              "Python", "Postgres", "Docker", "Java", "Kotlin"
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={cardHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer
                  transition-all duration-300
                  ${
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
          <motion.div
            variants={containerVariants}
            className="text-center mb-8"
          >
            <motion.span
              variants={itemVariants}
              className={`px-4 py-2 rounded-full text-sm font-medium inline-block
                transition-all duration-300 hover:scale-105 cursor-pointer
                ${
                  isDarkMode 
                    ? "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700/80" 
                    : "bg-gray-100/80 text-gray-800 border border-gray-200 hover:bg-gray-200/80"
                }`}
            >
              My Projects
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className={`text-4xl font-bold mt-4 mb-3 transition-colors duration-300
                ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Check out my latest work
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className={`text-lg transition-colors duration-300
                ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              I&apos;ve worked on a variety of projects, from simple
              websites to complex web applications.
            </motion.p>
          </motion.div>

          <Swiper className="mySwiper" rewind={true} grabCursor={true} autoplay={{ delay: 2000 }} >
            {projects.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
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
                      <motion.h3
                        variants={itemVariants}
                        className={`text-xl font-bold mb-1 ${
                          isDarkMode && "text-gray-100"
                        }`}
                      >
                        {item.name}
                      </motion.h3>
                      <motion.p
                        variants={itemVariants}
                        className="text-xs text-gray-500 dark:text-gray-400 mb-2"
                      >
                        {item.timeline}
                      </motion.p>
                      <motion.p
                        variants={itemVariants}
                        className={`text-sm mb-3 line-clamp-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {item.details}
                      </motion.p>
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-1 mb-3"
                      >
                        {item.techStacks.map((tech, index) => (
                          <motion.span
                            key={index}
                            variants={itemVariants}
                            className={`px-2 py-1 rounded-full text-xs ${
                              isDarkMode
                                ? "bg-gray-800 text-gray-300 border border-gray-700"
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                      <motion.a
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
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
                          className="transition-transform duration-300 group-hover:scale-110"
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
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Website
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" className="mt-24 scroll-mt-16 mb-24">
          <motion.div
            variants={containerVariants}
            className="text-center mb-8"
          >
            <motion.span
              variants={itemVariants}
              className={`px-4 py-2 rounded-full text-sm font-medium inline-block
                transition-all duration-300 hover:scale-105 cursor-pointer
                ${
                  isDarkMode
                    ? "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-gray-700/80"
                    : "bg-gray-100/80 text-gray-800 border border-gray-200 hover:bg-gray-200/80"
                }`}
            >
              Get in Touch
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className={`text-4xl font-bold mt-4 mb-3 transition-colors duration-300
                ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Let&apos;s work together
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className={`text-lg transition-colors duration-300
                ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Feel free to reach out for collaborations or just a friendly
              hello
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <motion.a
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              href="mailto:mdshakibkhan.dev@gmail.com"
              className={`group p-6 rounded-2xl transition-all duration-300
                ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-800"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  className={`p-3 rounded-xl
                    ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                  <svg
                    className="transition-transform duration-300 group-hover:scale-110"
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
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex-1"
                >
                  <motion.h3
                    variants={itemVariants}
                    className={`font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Email
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    mdshakibkhan.dev@gmail.com
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.a>

            <motion.a
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              target="_blank"
              href="https://x.com/shakib_khan_dev"
              className={`group p-6 rounded-2xl transition-all duration-300
                ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-800"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <motion.div
                  variants={itemVariants}
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
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex-1"
                >
                  <motion.h3
                    variants={itemVariants}
                    className={`font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    X
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    @shakib_khan_dev
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section 
          variants={containerVariants}
          className="mt-24 mb-16"
        >
          <motion.div 
            variants={containerVariants}
            className={`max-w-2xl mx-auto p-8 rounded-2xl ${
              isDarkMode ? "bg-white/5" : "bg-gray-900/5"
            }`}
          >
            <motion.div 
              variants={containerVariants}
              className="text-center"
            >
              <motion.h2 
                variants={itemVariants}
                className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Stay Updated
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className={`text-sm md:text-base mb-8 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Subscribe to my newsletter for the latest updates on projects, articles, and tech insights.
              </motion.p>
            </motion.div>
            
            <motion.form 
              variants={containerVariants}
              onSubmit={(e) => e.preventDefault()} 
              className="flex flex-col md:flex-row gap-4"
            >
              <motion.input
                variants={itemVariants}
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg text-sm md:text-base outline-none ${
                  isDarkMode 
                    ? "bg-white/10 text-white placeholder:text-gray-400 focus:bg-white/20" 
                    : "bg-white text-gray-900 placeholder:text-gray-500 focus:bg-gray-50"
                } transition-all duration-300`}
              />
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className={`px-6 py-3 cursor-pointer rounded-lg font-medium ${
                  isDarkMode 
                    ? "bg-white text-gray-900 hover:bg-gray-100" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.section>
      </motion.section>
    </main>
  );
}
