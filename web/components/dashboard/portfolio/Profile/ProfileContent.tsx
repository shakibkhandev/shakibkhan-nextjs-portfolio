import { useState } from 'react';
import { Camera, Save, Github, Linkedin, Facebook, Twitter } from 'lucide-react';

const ProfileContent = ({ portfolio, isDarkMode, handleProfileEdit } : any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: portfolio.name,
    email: portfolio.email,
    bio: portfolio.bio,
    about: portfolio.about,
    x_url: portfolio.x_url,
    github_url: portfolio.github_url,
    linkedin_url: portfolio.linkedin_url,
    facebook_url: portfolio.facebook_url
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    handleProfileEdit(formData);
    setIsEditing(false);
  };

  const baseInputClass = `w-full p-3 rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
    isDarkMode
      ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-400"
  } border`;

  const labelClass = `block text-sm font-medium mb-1 ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={portfolio.image_url}
              alt={portfolio.name}
              className="object-cover w-full h-full"
            />
          </div>
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera size={24} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="space-y-3 flex-1 text-center md:text-left">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`text-2xl font-bold ${baseInputClass}`}
            />
          ) : (
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {portfolio.name}
            </h2>
          )}
          
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={baseInputClass}
            />
          ) : (
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {portfolio.email}
            </p>
          )}

          {!isEditing && (
            <div className="flex gap-3 justify-center md:justify-start">
              {portfolio.x_url && (
                <a href={portfolio.x_url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}>
                  <Twitter size={20} className={isDarkMode ? "text-white" : "text-gray-700"} />
                </a>
              )}
              {portfolio.github_url && (
                <a href={portfolio.github_url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}>
                  <Github size={20} className={isDarkMode ? "text-white" : "text-gray-700"} />
                </a>
              )}
              {portfolio.linkedin_url && (
                <a href={portfolio.linkedin_url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}>
                  <Linkedin size={20} className={isDarkMode ? "text-white" : "text-gray-700"} />
                </a>
              )}
              {portfolio.facebook_url && (
                <a href={portfolio.facebook_url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}>
                  <Facebook size={20} className={isDarkMode ? "text-white" : "text-gray-700"} />
                </a>
              )}
            </div>
          )}
        </div>
        
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors`}
        >
          {isEditing ? (
            <>
              <Save size={18} />
              Save Profile
            </>
          ) : (
            'Edit Profile'
          )}
        </button>
      </div>

      {/* Content Sections */}
      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Bio
        </h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={`${baseInputClass} min-h-[100px]`}
          />
        ) : (
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {portfolio.bio}
          </p>
        )}
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          About
        </h3>
        {isEditing ? (
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className={`${baseInputClass} min-h-[150px]`}
          />
        ) : (
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {portfolio.about}
          </p>
        )}
      </div>

      {/* Social Links */}
      {isEditing && (
        <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Social Links
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                X / Twitter:
              </label>
              <div className="flex">
                <div className={`flex items-center justify-center px-3 rounded-l-lg ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                  <Twitter size={18} />
                </div>
                <input
                  type="url"
                  name="x_url"
                  value={formData.x_url}
                  onChange={handleChange}
                  className={`${baseInputClass} rounded-l-none`}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>
                GitHub:
              </label>
              <div className="flex">
                <div className={`flex items-center justify-center px-3 rounded-l-lg ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                  <Github size={18} />
                </div>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  className={`${baseInputClass} rounded-l-none`}
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>
                LinkedIn:
              </label>
              <div className="flex">
                <div className={`flex items-center justify-center px-3 rounded-l-lg ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                  <Linkedin size={18} />
                </div>
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  className={`${baseInputClass} rounded-l-none`}
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>
                Facebook:
              </label>
              <div className="flex">
                <div className={`flex items-center justify-center px-3 rounded-l-lg ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                  <Facebook size={18} />
                </div>
                <input
                  type="url"
                  name="facebook_url"
                  value={formData.facebook_url}
                  onChange={handleChange}
                  className={`${baseInputClass} rounded-l-none`}
                  placeholder="https://facebook.com/yourusername"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;