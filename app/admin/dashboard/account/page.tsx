"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiImage, FiSave } from "react-icons/fi";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface AccountData {
  name: string;
  email: string;
  image_url: string;
}

export default function Page() {
  const { isDarkMode } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [accountData, setAccountData] = useState<AccountData>({
    name: "",
    email: "",
    image_url: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/account`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setAccountData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        toast.error("Failed to load account data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSaving(true);
    try {
      const updateData = {
        ...accountData,
        ...(newPassword ? { password: newPassword } : {}),
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/account`,
        updateData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Account updated successfully");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("Failed to update account");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`rounded-xl p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-xl space-y-8`}>
            <div className={`h-32 w-32 mx-auto rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} animate-pulse`} />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className={`h-4 w-24 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded animate-pulse`} />
                  <div className={`h-10 w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded animate-pulse`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-xl p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}
        >
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Account Settings
          </h1>

          <div className="space-y-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32">
                <Image
                  src={accountData.image_url || "/placeholder-avatar.png"}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CldUploadWidget
                uploadPreset="profile_uploads"
                onSuccess={(result: any) => {
                  if (result.info && result.info.secure_url) {
                    setAccountData({
                      ...accountData,
                      image_url: result.info.secure_url,
                    });
                  }
                }}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FiImage className="w-4 h-4" />
                    Change Photo
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <FiUser className="w-4 h-4" />
                  Name
                </div>
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  }`}
                />
              </label>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <FiMail className="w-4 h-4" />
                  Email
                </div>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  }`}
                />
              </label>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                <FiLock className="w-4 h-4" />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Change Password
                </span>
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  }`}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <FiSave className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
