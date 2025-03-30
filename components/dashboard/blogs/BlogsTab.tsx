"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion } from "framer-motion";
import { Plus, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import BlogList from "./BlogList";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import Pagination from "../Pagination";

interface Blog {
  id: string;
  title: string;
  description: string;
  image_url: string;
  createdAt: string;
  readingTime: number;
  isHidden: boolean;
}

export default function BlogsTab() {
  const router = useRouter();
  const { isDarkMode } = useGlobalContext();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?page=${currentPage}&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      setBlogs(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total / 10));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBlog = (blogId: string) => {
    router.push(`/admin/dashboard/blog/edit/${blogId}`);
  };

  const handleDeleteBlog = (blogId: string) => {
    setSelectedBlog(blogId);
    setIsDeleteModalOpen(true);
  };

  const handleToggleVisibility = async (blogId: string, currentlyHidden: boolean) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${currentlyHidden ? 'unhide' : 'hide'}/${blogId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      
      setBlogs(blogs.map(blog => 
        blog.id === blogId 
          ? { ...blog, isHidden: !currentlyHidden }
          : blog
      ));
    } catch (error) {
      console.error('Error toggling blog visibility:', error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedBlog) return;
    
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${selectedBlog}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      setBlogs(blogs.filter(blog => blog.id !== selectedBlog));
      setIsDeleteModalOpen(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 p-6 rounded-xl ${
        isDarkMode 
          ? "bg-gray-800/50 shadow-lg shadow-gray-900/20" 
          : "bg-white/50 shadow-lg shadow-gray-100/20"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Blog Posts
        </h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/admin/dashboard/blog/create")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/20"
              : "bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:shadow-lg hover:shadow-blue-400/20"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>New Blog</span>
        </motion.button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`h-24 rounded-lg animate-pulse ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="space-y-4">
          <BlogList
            blogs={blogs}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
            onToggleVisibility={handleToggleVisibility}
          />
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex flex-col items-center justify-center py-12 rounded-lg ${
            isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
          }`}
        >
          <Edit3 className={`w-12 h-12 mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
          <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            No blog posts yet
          </p>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Create your first blog post to get started
          </p>
        </motion.div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </motion.div>
  );
}
