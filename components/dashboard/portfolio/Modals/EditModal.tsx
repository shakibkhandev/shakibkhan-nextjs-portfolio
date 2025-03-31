import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const EditModal = ({
  type,
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isDarkMode,
}: any) => {
  const [formData, setFormData] = useState(initialData || {});

  const fields: {
    [key: string]: { name: string; label: string; type: string }[];
  } = {
    projects: [
      { name: "name", label: "Project Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "web_url", label: "Web URL", type: "text" },
    ],
    education: [
      { name: "institution", label: "Institution", type: "text" },
      { name: "degree", label: "Degree", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "status", label: "Status", type: "text" },
    ],
    workExperience: [
      { name: "companyName", label: "Company Name", type: "text" },
      { name: "position", label: "Position", type: "text" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    skills: [
      { name: "label", label: "Skill Name", type: "text" },
      { name: "url", label: "URL", type: "text" },
    ],
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...initialData,
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData?.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : "",
    }));
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
    };
    onSubmit(formattedData);
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
        className={`p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">Edit {type}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields[type].map((field) => (
            <div key={field.name}>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className={`w-full p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required={field.name !== "web_url" && field.name !== "url"}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className={`w-full p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required={field.name !== "web_url" && field.name !== "url"}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};