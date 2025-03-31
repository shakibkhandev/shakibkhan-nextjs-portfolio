import { motion } from "framer-motion";
import { Link, Code, Star } from "lucide-react";

interface Skill {
  id: string;
  label: string;
  url?: string;
  level?: number;
}

interface SkillItemProps {
  skill: Skill;
  isDarkMode: boolean;
}

export const SkillItem = ({ skill, isDarkMode }: SkillItemProps) => {
  const renderStars = (level: number = 0) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < level
            ? isDarkMode ? "text-yellow-400 fill-yellow-400" : "text-yellow-500 fill-yellow-500"
            : isDarkMode ? "text-gray-600" : "text-gray-300"
        }`}
      />
    ));
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (error) {
      console.error("Invalid URL:", error);
      return url; // Fallback to the original URL string if it's invalid
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl ${
        isDarkMode
          ? "hover:bg-gray-700/50 bg-gray-800/50"
          : "hover:bg-gray-100/80 bg-gray-50/50"
      } transition-all duration-200 border ${
        isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
      } backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isDarkMode
            ? "bg-gray-700"
            : "bg-white"
        } shadow-sm`}>
          <Code className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
        </div>
        <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {skill.label}
        </h4>
      </div>

      <div className="flex items-center gap-3 ml-7 sm:ml-0">
        {skill.level && (
          <div className="flex items-center gap-1">
            {renderStars(skill.level)}
          </div>
        )}

        {skill.url && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm px-2 py-1 rounded-md ${
              isDarkMode
                ? "bg-blue-900/30 text-blue-300 hover:bg-blue-800/50"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            } transition-colors`}
          >
            <Link className="w-3.5 h-3.5" />
            <span className="hidden sm:inline truncate max-w-[120px] lg:max-w-[200px]">
              {getHostname(skill.url)}
            </span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};
