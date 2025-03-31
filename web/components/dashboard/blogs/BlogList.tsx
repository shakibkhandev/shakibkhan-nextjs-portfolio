"use client";

import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { Eye, PenSquare, Trash2, Clock } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface Blog {
  id: string;
  title: string;
  description: string;
  image_url: string;
  createdAt: string;
  readingTime: number;
  isHidden: boolean;
}

interface BlogListProps {
  blogs: Blog[];
  onEdit: (blogId: string) => void;
  onDelete: (blogId: string) => void;
  onToggleVisibility: (blogId: string, isHidden: boolean) => void;
}

export default function BlogList({
  blogs,
  onEdit,
  onDelete,
  onToggleVisibility,
}: BlogListProps) {
  const { isDarkMode } = useGlobalContext();

  return (
    <div className="space-y-4">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`group rounded-xl overflow-hidden backdrop-blur-sm ${
            isDarkMode 
              ? "bg-gray-800/50 hover:bg-gray-800/70" 
              : "bg-white/50 hover:bg-white/70"
          } shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 h-48">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {blog.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {blog.description}
                  </p>
                  <div className={`flex items-center gap-4 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleVisibility(blog.id, blog.isHidden)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? blog.isHidden
                            ? "bg-gray-700/50 text-gray-400"
                            : "hover:bg-blue-500/20 text-blue-400"
                          : blog.isHidden
                            ? "bg-gray-100 text-gray-500"
                            : "hover:bg-blue-50 text-blue-500"
                      }`}
                      title={blog.isHidden ? "Show Blog" : "Hide Blog"}
                    >
                      <Eye className={`w-5 h-5 ${blog.isHidden ? "opacity-50" : ""}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(blog.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? "hover:bg-green-500/20 text-green-400"
                          : "hover:bg-green-50 text-green-500"
                      }`}
                      title="Edit Blog"
                    >
                      <PenSquare className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(blog.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? "hover:bg-red-500/20 text-red-400"
                          : "hover:bg-red-50 text-red-500"
                      }`}
                      title="Delete Blog"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className={`text-sm font-medium ${
                    blog.isHidden
                      ? isDarkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                      : isDarkMode
                        ? "text-green-400"
                        : "text-green-500"
                  }`}>
                    {blog.isHidden ? "Hidden" : "Published"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
