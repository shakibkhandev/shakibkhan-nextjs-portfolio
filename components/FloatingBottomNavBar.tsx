"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingBottomNavBar() {
  const { isDarkMode, toggleTheme } = useGlobalContext();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (sessionStorage) {
      setLoad(true);
    }
  }, []);

  return (
    <>
      {load && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: sessionStorage.getItem("isOnBoarding") ? 1 : 3, // Delay until after content appears
          }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl border 
  backdrop-blur-md  z-50
  ${
    isDarkMode
      ? "bg-gray-900/80 border-gray-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      : "bg-white/80 border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
  }`}
        >
          <nav className="flex items-center gap-4">
            {/* Home Link */}
            <div className="relative group">
              <Link
                href="/"
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out
        ${
          isDarkMode
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
              </Link>
              <span
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
      ${
        isDarkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-md"
      }`}
              >
                Home
              </span>
            </div>

            {/* Blog Link */}
            <div className="relative group">
              <Link
                href="/blogs"
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out
        ${
          isDarkMode
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
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 8h8M8 12h6M8 16h4" />
                </svg>
              </Link>
              <span
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
      ${
        isDarkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-md"
      }`}
              >
                Blogs
              </span>
            </div>

            {/* GitHub Link */}
            <div className="relative group">
              <a
                href="https://github.com/shakibkhandev"
                target="_blank"
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out
        ${
          isDarkMode
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
        isDarkMode
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
                href="https://www.linkedin.com/in/shakib-khan-dev/"
                target="_blank"
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out
        ${
          isDarkMode
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
        isDarkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-md"
      }`}
              >
                LinkedIn
              </span>
            </div>

            {/* Facebook Link - Add after LinkedIn link */}
            {/* <div className="relative group">
      <a
        href="https://www.facebook.com/mdshakibkhan.dev"
        className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out
        ${
          isDarkMode
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
        isDarkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-md"
      }`}
      >
        Facebook
      </span>
    </div> */}

            {/* Twitter/X Link */}
            <div className="relative group">
              <a
                href="https://x.com/shakib_khan_dev"
                target="_blank"
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out
        ${
          isDarkMode
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
        isDarkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-md"
      }`}
              >
                X
              </span>
            </div>

            {/* Theme Toggle Button */}
            <div className="relative group">
              <button
                onClick={() => toggleTheme()}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer
        overflow-hidden transition-all duration-300 ease-in-out
        ${
          isDarkMode
            ? "text-gray-400 hover:text-white hover:bg-white/10"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
                aria-label="Toggle theme"
              >
                <div className="relative z-10 transition-transform duration-500 ease-in-out">
                  {isDarkMode ? (
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
        isDarkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-md"
      }`}
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
