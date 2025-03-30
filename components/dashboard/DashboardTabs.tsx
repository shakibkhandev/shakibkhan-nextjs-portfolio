"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiEdit3, FiBriefcase, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orientation?: "horizontal" | "vertical";
}

const tabs = [
  { id: "overview", label: "Overview", icon: FiHome },
  { id: "blogs", label: "Blogs", icon: FiEdit3 },
  { id: "portfolio", label: "Portfolio", icon: FiBriefcase },
  { id: "account", label: "Account", icon: FiUser },
];

export default function DashboardTabs({
  activeTab,
  onTabChange,
  orientation = "horizontal",
}: DashboardTabsProps) {
  const router = useRouter();
  const { isDarkMode } = useGlobalContext();

  return (
    <AnimatePresence>
      <nav 
        className={`flex ${
          orientation === "vertical" 
            ? "flex-col space-y-2" 
            : "space-x-3 p-3 rounded-xl"
        } ${
          isDarkMode 
            ? "bg-gray-800/30" 
            : "bg-white/30"
        }`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${
                orientation === "vertical" ? "w-full" : ""
              } ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white shadow-lg shadow-blue-500/10"
                    : "bg-gradient-to-r from-blue-500/90 to-blue-400/90 text-white shadow-lg shadow-blue-400/10"
                  : isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-700/30"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-200 ${activeTab === tab.id ? "scale-110" : ""}`} />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </AnimatePresence>
  );
}
