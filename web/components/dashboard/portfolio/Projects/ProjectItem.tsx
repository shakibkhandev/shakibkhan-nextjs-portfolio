import { motion } from 'framer-motion';
import { PenSquare, Plus, Trash2, Link, Calendar, Code } from 'lucide-react';
import Image from 'next/image';



export const ProjectItem = ({ project, isDarkMode }: any) => (
    <div className="space-y-4 flex-1">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative w-full sm:w-40 h-48 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-md group"
        >
          <Image
            src={project.image_url || "/default-project.png"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {project.web_url && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-white/90 text-gray-800 hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Link className="w-4 h-4" />
              View
            </motion.a>
          )}
        </motion.div>
        
        <div className="flex-1 space-y-3">
          <h4
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {project.name}
          </h4>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {project.technologies && project.technologies.split(',').map((tech : any, index: number) => (
              <span 
                key={index}
                className={`px-2.5 py-1 text-xs rounded-full ${
                  isDarkMode 
                    ? "bg-gray-600/50 text-gray-300" 
                    : "bg-gray-200/80 text-gray-700"
                }`}
              >
                {tech.trim()}
              </span>
            ))}
          </div>
          
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} line-clamp-3`}>
            {project.description}
          </p>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
            </p>
          </div>
          
          {project.github_url && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 mt-2 px-3.5 py-1.5 rounded-lg text-sm ${
                isDarkMode
                  ? "bg-gray-600/50 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200/80 text-gray-700 hover:bg-gray-300"
              } transition-colors`}
            >
              <Code className="w-4 h-4" />
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
  