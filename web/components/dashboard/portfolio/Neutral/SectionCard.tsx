import { motion } from 'framer-motion';
import { PenSquare, Plus, Trash2, Link, Calendar, Code } from 'lucide-react';
import Image from 'next/image';

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
  content: React.ReactNode;
  onEdit?: () => void;
  onAdd?: () => void;
}

export const SectionCard = ({
  title,
  icon,
  isDarkMode,
  content,
  onEdit,
  onAdd,
}: SectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-6 md:p-8 ${
        isDarkMode
          ? "bg-gray-800/80 backdrop-blur-md"
          : "bg-white/90 backdrop-blur-md"
      } shadow-xl hover:shadow-2xl transition-all duration-300 border ${
        isDarkMode ? "border-gray-700/50" : "border-gray-200/30"
      } group relative overflow-hidden`}
    >
      {/* Decorative gradient blob */}
      <div className={`absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${
        isDarkMode ? "bg-blue-600" : "bg-blue-400"
      }`}></div>
      
      {/* Second decorative blob */}
      <div className={`absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${
        isDarkMode ? "bg-purple-600" : "bg-purple-400"
      }`}></div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className={`p-3.5 rounded-2xl ${
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800" 
                  : "bg-gradient-to-br from-blue-50 to-indigo-100"
              } shadow-md transition-all duration-300 group-hover:shadow-lg`}
            >
              <div className={`${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>
                {icon}
              </div>
            </motion.div>
            <h2
              className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${
                isDarkMode ? "from-white to-blue-300" : "from-blue-600 to-indigo-600"
              } bg-clip-text text-transparent`}
            >
              {title}
            </h2>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl transition-all ${
                  isDarkMode 
                    ? "bg-gray-700/70 hover:bg-gray-600 text-blue-300" 
                    : "bg-gray-100/90 hover:bg-blue-50 text-blue-600"
                } shadow-sm hover:shadow ring-0 hover:ring-2 ${
                  isDarkMode ? "ring-blue-500/30" : "ring-blue-400/30"
                }`}
                onClick={onEdit}
                title="Edit"
              >
                <PenSquare className="w-4 h-4" />
              </motion.button>
            )}
            {onAdd && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl transition-all ${
                  isDarkMode 
                    ? "bg-blue-600/20 hover:bg-blue-600/30 text-blue-300" 
                    : "bg-blue-100/90 hover:bg-blue-200 text-blue-600"
                } shadow-sm hover:shadow ring-0 hover:ring-2 ${
                  isDarkMode ? "ring-blue-500/30" : "ring-blue-400/30"
                }`}
                onClick={onAdd}
                title="Add New"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
        {content}
      </div>
    </motion.div>
  );
};