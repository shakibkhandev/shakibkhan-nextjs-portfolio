import { motion } from 'framer-motion';
import { PenSquare, Plus, Trash2, Link, Calendar, Code } from 'lucide-react';
import Image from 'next/image';

interface Item {
  id: string;
  [key: string]: any;
}

interface ItemListProps {
  items: Item[];
  type: string;
  renderItem: (item: Item) => React.ReactNode;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isDarkMode: boolean;
}

export const ItemList = ({
  items,
  type,
  renderItem,
  onDelete,
  onEdit,
  isDarkMode,
}: ItemListProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.length > 0 ? (
        items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl ${
              isDarkMode ? "bg-gray-800/90" : "bg-white/95"
            } shadow-lg hover:shadow-xl transition-all duration-300 border ${
              isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
            } group overflow-hidden backdrop-blur-sm`}
          >
            {/* Decorative gradient line */}
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${
              isDarkMode ? "from-blue-600 via-indigo-500 to-purple-600" : "from-blue-500 via-indigo-400 to-purple-500"
            } opacity-60 group-hover:opacity-100 transition-opacity`}></div>
            
            {/* Hover glow effect */}
            <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-5 ${
              isDarkMode ? "bg-blue-400" : "bg-blue-500"
            } blur-xl`}></div>
            
            <div className="flex-1 w-full relative z-10">{renderItem(item)}</div>
            
            <div className="flex gap-2 self-end sm:self-auto relative z-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(item.id)}
                className={`p-2.5 rounded-xl transition-all ${
                  isDarkMode 
                    ? "bg-gray-700/70 hover:bg-gray-600 text-blue-300" 
                    : "bg-gray-100/90 hover:bg-blue-50 text-blue-600"
                } shadow-sm hover:shadow ring-0 hover:ring-2 ${
                  isDarkMode ? "ring-blue-500/30" : "ring-blue-400/30"
                }`}
                title="Edit"
              >
                <PenSquare className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(item.id)}
                className={`p-2.5 rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gray-700/70 hover:bg-red-900/70 text-red-400"
                    : "bg-gray-100/90 hover:bg-red-50 text-red-500"
                } shadow-sm hover:shadow ring-0 hover:ring-2 ${
                  isDarkMode ? "ring-red-500/30" : "ring-red-400/30"
                }`}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={itemVariants}
          className={`text-center py-16 px-6 rounded-2xl ${
            isDarkMode ? "bg-gray-800/50" : "bg-white/80"
          } border ${
            isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
          } border-dashed backdrop-blur-sm`}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDarkMode 
                ? "bg-gradient-to-br from-gray-700 to-gray-800" 
                : "bg-gradient-to-br from-blue-50 to-indigo-100"
            } shadow-lg`}
          >
            <Plus className={`w-10 h-10 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
          </motion.div>
          <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            No {type} found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} max-w-sm mx-auto`}>
            Add your first {type.slice(0, -1)} to showcase your work and skills
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};