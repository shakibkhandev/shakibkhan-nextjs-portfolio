import { useState } from "react";
import { motion } from "framer-motion";

export const AddModal = ({ type, isOpen, onClose, onSubmit, isDarkMode }: any) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields: {
    [key: string]: {
      name: string;
      label: string;
      type: string;
      required?: boolean;
    }[];
  } = {
    projects: [
      { name: "name", label: "Project Name", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date", required: true },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "web_url", label: "Web URL", type: "text" },
    ],
    education: [
      {
        name: "institution",
        label: "Institution",
        type: "text",
        required: true,
      },
      { name: "degree", label: "Degree", type: "text", required: true },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date", required: true },
      { name: "status", label: "Status", type: "text", required: true },
    ],
    workExperience: [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      { name: "position", label: "Position", type: "text", required: true },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date", required: true },
    ],
    skills: [
      { name: "label", label: "Skill Name", type: "text", required: true },
      { name: "url", label: "URL", type: "text" },
    ],
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    fields[type].forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.name === "url" && formData[field.name]) {
        try {
          new URL(formData[field.name]);
        } catch (error) {
          newErrors[field.name] = "Invalid URL format";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`p-6 md:p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode ? "bg-gray-800/90" : "bg-white/90"
        } shadow-2xl backdrop-blur-sm border ${
          isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            Add {type}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields[type].map((field) => (
            <div key={field.name}>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className={`w-full p-3 border rounded-xl ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600/50 text-white"
                      : "bg-white/80 border-gray-300/50 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm`}
                  rows={4}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className={`w-full p-3 border rounded-xl ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600/50 text-white"
                      : "bg-white/80 border-gray-300/50 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm`}
                  required={field.required}
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 hover:bg-gray-700"
                  : "bg-gray-100/80 hover:bg-gray-200"
              }`}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all flex items-center gap-2 ${
                isSubmitting
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                "Add"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
