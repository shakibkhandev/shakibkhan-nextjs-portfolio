"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion } from "framer-motion";
import { Plus, PenSquare, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  github: string;
  isHidden: boolean;
  technologies: string[];
}

export default function PortfolioTab() {
  const router = useRouter();
  const { isDarkMode } = useGlobalContext();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolios`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      setPortfolios(response.data.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = async (portfolioId: string, currentlyHidden: boolean) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolios/${currentlyHidden ? 'unhide' : 'hide'}/${portfolioId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      
      setPortfolios(portfolios.map(portfolio => 
        portfolio.id === portfolioId 
          ? { ...portfolio, isHidden: !currentlyHidden }
          : portfolio
      ));
    } catch (error) {
      console.error('Error toggling portfolio visibility:', error);
    }
  };

  const handleDelete = (portfolioId: string) => {
    setSelectedPortfolio(portfolioId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPortfolio) return;
    
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolios/${selectedPortfolio}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      setPortfolios(portfolios.filter(portfolio => portfolio.id !== selectedPortfolio));
      setIsDeleteModalOpen(false);
      setSelectedPortfolio(null);
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-xl overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-sm`}
          >
            <div className={`h-48 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } animate-pulse`} />
            <div className="p-6 space-y-4">
              <div className={`h-6 w-3/4 rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } animate-pulse`} />
              <div className={`h-4 w-full rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } animate-pulse`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          Manage Portfolio
        </h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/admin/dashboard/portfolio/create')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <Plus className="w-5 h-5" />
          New Project
        </motion.button>
      </div>

      {/* Portfolio Grid */}
      {portfolios.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="relative h-48">
                <Image
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {portfolio.title}
                </h3>
                <p className={`text-sm mb-4 line-clamp-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {portfolio.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {portfolio.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleVisibility(portfolio.id, portfolio.isHidden)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                      title={portfolio.isHidden ? "Show Project" : "Hide Project"}
                    >
                      <Eye className={`w-5 h-5 ${portfolio.isHidden ? "opacity-50" : ""}`} />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/dashboard/portfolio/edit/${portfolio.id}`)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                      title="Edit Project"
                    >
                      <PenSquare className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(portfolio.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "hover:bg-red-900/50 text-red-400"
                          : "hover:bg-red-100 text-red-600"
                      }`}
                      title="Delete Project"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    portfolio.isHidden
                      ? isDarkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                      : isDarkMode
                      ? "bg-green-900/50 text-green-400"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {portfolio.isHidden ? "Hidden" : "Published"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          No portfolio projects found. Add your first project!
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={confirmDelete}
  title="Delete Portfolio"
  message="Are you sure you want to delete this portfolio? This action cannot be undone."
/>
    </div>
  );
}
