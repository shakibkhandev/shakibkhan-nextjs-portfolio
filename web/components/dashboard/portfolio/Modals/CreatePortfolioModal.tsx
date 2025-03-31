import { useState } from "react";
import { motion } from "framer-motion";

export const CreatePortfolioModal = ({
    isOpen,
    onClose,
    onSubmit,
    isDarkMode,
  }: any) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      about: "",
      image_url: "",
      x_url: "",
      github_url: "",
      linkedin_url: "",
      facebook_url: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.about) newErrors.about = "About is required";
      if (!formData.image_url)
        newErrors.image_url = "Profile image URL is required";
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
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className={`p-8 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } shadow-2xl`}
        >
          <h3 className="text-2xl font-bold mb-6">Create Your Portfolio</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                About
              </label>
              <textarea
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                rows={4}
                required
              />
              {errors.about && (
                <p className="mt-1 text-sm text-red-500">{errors.about}</p>
              )}
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Profile Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                required
              />
              {errors.image_url && (
                <p className="mt-1 text-sm text-red-500">{errors.image_url}</p>
              )}
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                X (Twitter) URL
              </label>
              <input
                type="url"
                value={formData.x_url}
                onChange={(e) =>
                  setFormData({ ...formData, x_url: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin_url: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
  
            <div>
              <label
                className={`block mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebook_url}
                onChange={(e) =>
                  setFormData({ ...formData, facebook_url: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
  
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  "Create Portfolio"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };
  