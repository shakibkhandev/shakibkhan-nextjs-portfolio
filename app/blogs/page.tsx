"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Sample blog data - in a real app, this would come from an API or database
const blogs = [
  {
    id: 1,
    title: "The Rise of Artificial Intelligence in Everyday Life",
    excerpt:
      "Explore how AI is transforming our daily experiences, from virtual assistants to healthcare innovations, and what this means for our future.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    date: "2025-03-21",
    readTime: "8 min",
    category: "Technology",
  },
  {
    id: 2,
    title: "Sustainable Web Development Practices",
    excerpt:
      "Learn how to build eco-friendly websites and reduce your carbon footprint while maintaining performance and user experience.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "2025-03-20",
    readTime: "6 min",
    category: "Development",
  },
  {
    id: 3,
    title: "The Future of Remote Work",
    excerpt:
      "Discover how companies are adapting to remote-first cultures and the tools shaping the future of collaborative work.",
    image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e",
    date: "2025-03-19",
    readTime: "5 min",
    category: "Business",
  },
  {
    id: 4,
    title: "Mastering TypeScript in 2025",
    excerpt:
      "Stay ahead of the curve with the latest TypeScript features and best practices for building scalable applications.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    date: "2025-03-18",
    readTime: "7 min",
    category: "Development",
  },
  {
    id: 5,
    title: "Design Systems: A Complete Guide",
    excerpt:
      "Everything you need to know about creating and maintaining a design system that scales with your organization.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
    date: "2025-03-17",
    readTime: "10 min",
    category: "Design",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

export default function Page() {
  const { isDarkMode } = useGlobalContext();
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Latest Blog Posts
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Insights and articles about technology, development, and design
          </motion.p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="group cursor-pointer mb-16 rounded-2xl overflow-hidden"
          onClick={() => router.push(`/blogs/${blogs[0].id}`)}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black"
              />
            </div>
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}
              >
                {blogs[0].category}
              </motion.div>
              <motion.h2
                whileHover={{ x: 10 }}
                className={`text-3xl font-bold leading-tight group-hover:text-blue-500 transition-colors duration-200 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {blogs[0].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {blogs[0].excerpt}
              </motion.p>
              <div
                className={`flex items-center gap-4 text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>{format(new Date(blogs[0].date), 'MMMM dd, yyyy')}</span>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{blogs[0].readTime}</span>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 ${
                  isDarkMode ? "hover:text-blue-400" : ""
                }`}
              >
                Read More <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.slice(1).map((blog, index) => (
            <motion.article
              key={blog.id}
              variants={item}
              whileHover={{ y: -10 }}
              className={`group cursor-pointer rounded-2xl overflow-hidden ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}
              onClick={() => router.push(`/blogs/${blog.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black"
                />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {blog.category}
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-2 text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <FiClock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </motion.div>
                </div>
                <motion.h3
                  whileHover={{ x: 5 }}
                  className={`text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-200 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {blog.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className={`text-sm mb-4 line-clamp-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {blog.excerpt}
                </motion.p>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <FiCalendar className="w-4 h-4" />
                  <span>{format(new Date(blog.date), 'MMMM dd, yyyy')}</span>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
