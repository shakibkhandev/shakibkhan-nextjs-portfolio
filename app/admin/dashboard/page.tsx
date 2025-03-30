"use client";

import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion } from "framer-motion";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import StatsGrid from "@/components/dashboard/overview/StatsGrid";
import BlogsTab from "@/components/dashboard/blogs/BlogsTab";
import PortfolioTab from "@/components/dashboard/portfolio/PortfolioTab";
import AccountTab from "@/components/dashboard/account/AccountTab";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type TabType = 'overview' | 'blogs' | 'portfolio' | 'account';

interface DashboardProps {
  // Add any props that Dashboard component might receive
}

interface Stats {
  totalViews: number;
  totalBlogs: number;
  totalPortfolios: number;
  avgReadTime: number;
}

export default function Dashboard(props: DashboardProps) {
  const { isDarkMode } = useGlobalContext();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.replace("/admin");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <StatsGrid
            stats={{
              totalViews: 1234,
              totalBlogs: 12,
              totalPortfolios: 8,
              avgReadTime: 5,
            }}
          />
        );
      case 'blogs':
        return <BlogsTab />;
      case 'portfolio':
        return <PortfolioTab />;
      case 'account':
        return <AccountTab />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed lg:relative w-[280px] h-screen ${
          isDarkMode ? "bg-gray-800/95" : "bg-white/95"
        } backdrop-blur-sm border-r ${
          isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
        } shadow-lg lg:shadow-none z-30`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Admin Dashboard
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <FiX className={`w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`} />
            </button>
          </div>
          <DashboardTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            orientation="vertical"
          />
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className={`sticky top-0 z-20 ${
          isDarkMode ? "bg-gray-800/80" : "bg-white/80"
        } backdrop-blur-sm border-b ${
          isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
        }`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="ml-auto">
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isDarkMode
                    ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    : "text-red-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <FiLogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {renderTabContent()}
        </motion.div>
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
