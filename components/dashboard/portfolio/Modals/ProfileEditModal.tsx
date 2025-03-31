import { useState, useEffect } from "react";
import Image from "next/image";
import { Link2, X, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { motion } from "framer-motion";

export const ProfileEditModal = ({ 
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isDarkMode,
  }: any) => {
    const [formData, setFormData] = useState({
      name: initialData?.name || "",
      x_url: initialData?.x_url || "",
      github_url: initialData?.github_url || "",
      linkedin_url: initialData?.linkedin_url || "",
      facebook_url: initialData?.facebook_url || "",
      image_url: initialData?.image_url || null, // Added profile image field
    });
  
    const [imageUrl, setImageUrl] = useState(""); // For URL input
    const [imageError, setImageError] = useState(""); // For URL validation errors
  
    useEffect(() => {
      setFormData({
        name: initialData?.name || "",
        x_url: initialData?.x_url || "",
        github_url: initialData?.github_url || "",
        linkedin_url: initialData?.linkedin_url || "",
        facebook_url: initialData?.facebook_url || "",
        image_url: initialData?.image_url || null,
      });
    }, [initialData]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    const handleImagePreview = () => {
      try {
        const url = new URL(imageUrl);
        setFormData({ ...formData, image_url: imageUrl });
        setImageUrl("");
        setImageError("");
      } catch {
        setImageError("Please enter a valid image URL");
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
          className={`p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Edit Profile Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
  
            {/* Profile Image Section */}
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Profile Image
              </label>
              <div
                className={`rounded-lg overflow-hidden ${
                  !formData.image_url && "border-2 border-dashed"
                } ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
              >
                {formData.image_url ? (
                  <div className="relative group">
                    <Image
                      src={formData.image_url}
                      alt="Profile"
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, image_url: null })
                        }
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-4">
                    {/* URL Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link2
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          } h-5 w-5`}
                        />
                      </div>
                      <input
                        type="url"
                        value={imageUrl}
                        placeholder="Enter image URL"
                        className={`block w-full pl-10 pr-24 py-2 rounded-lg border ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          imageError ? "border-red-500" : ""
                        }`}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setImageError("");
                        }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                          type="button"
                          onClick={handleImagePreview}
                          disabled={!imageUrl}
                          className={`h-full px-3 text-white rounded-r-lg transition-colors flex items-center gap-2 ${
                            imageUrl
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <Upload size={16} />
                          Preview
                        </button>
                      </div>
                    </div>
                    {imageError && (
                      <p className="text-sm text-red-500">{imageError}</p>
                    )}
  
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300"></span>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span
                          className={`px-2 ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-400"
                              : "bg-white text-gray-500"
                          }`}
                        >
                          OR
                        </span>
                      </div>
                    </div>
  
                    {/* Cloudinary Upload Widget */}
                    <CldUploadWidget
                      uploadPreset="images_preset"
                      onSuccess={(result: any) => {
                        if (result.info) {
                          setFormData({
                            ...formData,
                            image_url: result.info.secure_url,
                          });
                          setImageError("");
                        }
                      }}
                    >
                      {({ open }) => (
                        <div
                          onClick={() => open()}
                          className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center hover:border-blue-500 transition-colors ${
                            isDarkMode
                              ? "border-gray-700 hover:border-blue-400"
                              : "border-gray-300"
                          }`}
                        >
                          <Upload
                            className={`mx-auto h-8 w-8 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <p
                            className={`mt-2 text-sm font-medium ${
                              isDarkMode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            Click to upload
                          </p>
                          <p
                            className={`mt-1 text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            SVG, PNG, JPG or GIF (max. 4MB)
                          </p>
                        </div>
                      )}
                    </CldUploadWidget>
                  </div>
                )}
              </div>
            </div>
  
            {/* Existing Social Media Fields */}
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                X URL
              </label>
              <input
                type="text"
                name="x_url"
                value={formData.x_url}
                onChange={(e) =>
                  setFormData({ ...formData, x_url: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                GitHub URL
              </label>
              <input
                type="text"
                name="github_url"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin_url: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Facebook URL
              </label>
              <input
                type="text"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={(e) =>
                  setFormData({ ...formData, facebook_url: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
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