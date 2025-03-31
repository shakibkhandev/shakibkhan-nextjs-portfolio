'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { X, Tag as TagIcon, Upload, Link2 } from 'lucide-react';
import TagModal from '@/components/TagModal';
import BlogEditor from '@/components/BlogEditor';
import { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

const tagOptions = []; // Remove hardcoded tags

export default function CreateBlogPage() {
  const router = useRouter();
  const { isDarkMode } = useGlobalContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<{ id: string; label: string; }[]>([]);
  const [coverImage, setCoverImage] = useState<{ url: string; publicId: string } | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState('');

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/tags`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      if (response.data.success) {
        setAllTags(response.data.data);
      } else {
        toast.error('Failed to fetch tags');
      }
    } catch (error) {
      toast.error('Failed to fetch tags');
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast.error('Please enter a tag name');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/tags`,
        { label: newTagName.trim() },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      if (response.data.success) {
        const newTag = response.data.data;
        setAllTags([...allTags, newTag]);
        setSelectedTagIds([...selectedTagIds, newTag.id]);
        setNewTagName('');
        setIsTagModalOpen(false);
        toast.success(response.data.message || 'Tag created successfully');
      } else {
        toast.error('Failed to create tag');
      }
    } catch (error: any) {
      toast.error('Failed to create tag', {
        description: error?.response?.data?.message || 'An unexpected error occurred'
      });
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/tags/${tagId}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      
      setAllTags(allTags.filter(tag => tag.id !== tagId));
      setSelectedTagIds(selectedTagIds.filter(id => id !== tagId));
      toast.success('Tag deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete tag', {
        description: error?.response?.data?.message || 'An unexpected error occurred'
      });
    }
  };

  const handleEditorChange = (editor: Editor) => {
    setContent(editor.getHTML());
  };

  const handleImagePreview = async () => {
    if (!imageUrl) {
      setImageError('Please enter an image URL');
      return;
    }

    try {
      setCoverImage({ url: imageUrl, publicId: '' });
      setImageError('');
    } catch (error) {
      setImageError('Failed to set image');
    }
  };

  return (
    <div className={`h-screen w-full overflow-x-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full h-full `}>
        <div className="mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Create New Blog Post
              </h1>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Fill in the details below to create your blog post
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } border border-gray-300 transition-colors`}
            >
              <X size={16} />
              Cancel
            </button>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title Input */}
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border text-lg font-medium ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter a descriptive title"
                  />
                </div>

                {/* Content Editor */}
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <label className="block text-sm font-medium mb-4">Content</label>
                  <BlogEditor onChange={handleEditorChange} isDarkMode={isDarkMode} />
                </div>
              </div>

              {/* Right Column - Meta Information */}
              <div className="space-y-6">
                {/* Description Input */}
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto min-h-[120px] resize-y`}
                    placeholder="Write a brief description of your blog post"
                  />
                </div>

                {/* Cover Image Upload */}
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <label className="block text-sm font-medium mb-2">
                    Cover Image
                  </label>
                  <div className={`rounded-lg overflow-hidden ${!coverImage && 'border-2 border-dashed'} ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}>
                    {coverImage ? (
                      <div className="relative group">
                        <Image
                          src={coverImage.url}
                          alt="Cover"
                          width={800}
                          height={400}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setCoverImage(null);
                              setImageUrl('');
                              setImageError('');
                            }}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 p-4">
                        {/* URL Input */}
                        <div className="space-y-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Link2 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} h-5 w-5`} />
                            </div>
                            <input
                              type="url"
                              value={imageUrl}
                              placeholder="Enter image URL"
                              className={`block w-full pl-10 pr-24 py-2 rounded-lg border ${
                                isDarkMode
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                              } focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                imageError ? 'border-red-500' : ''
                              }`}
                              onChange={(e) => {
                                setImageUrl(e.target.value);
                                setImageError('');
                              }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <button
                                type="button"
                                onClick={handleImagePreview}
                                disabled={!imageUrl}
                                className={`h-full px-3 text-white rounded-r-lg transition-colors flex items-center gap-2 ${
                                  imageUrl 
                                    ? 'bg-blue-500 hover:bg-blue-600' 
                                    : 'bg-gray-400 cursor-not-allowed'
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
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300"></span>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                              OR
                            </span>
                          </div>
                        </div>

                        {/* Cloudinary Upload Widget */}
                        <CldUploadWidget
                          uploadPreset="images_preset"
                          onSuccess={(result: any) => {
                            if (result.info) {
                              setCoverImage({
                                url: result.info.secure_url,
                                publicId: result.info.public_id,
                              });
                              setImageError('');
                            }
                          }}
                        >
                          {({ open }) => (
                            <div
                              onClick={() => open()}
                              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center hover:border-blue-500 transition-colors ${
                                isDarkMode 
                                  ? 'border-gray-700 hover:border-blue-400' 
                                  : 'border-gray-300'
                              }`}
                            >
                              <Upload className={`mx-auto h-12 w-12 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                              <p className={`mt-2 text-sm font-medium ${
                                isDarkMode ? 'text-gray-200' : 'text-gray-900'
                              }`}>
                                Click to upload
                              </p>
                              <p className={`mt-1 text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                SVG, PNG, JPG or GIF (max. 4MB)
                              </p>
                            </div>
                          )}
                        </CldUploadWidget>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Section */}
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium">Tags</label>
                    <button
                      type="button"
                      onClick={() => setIsTagModalOpen(true)}
                      className="text-blue-500 hover:text-blue-600 text-xs flex items-center gap-1"
                    >
                      <TagIcon size={12} />
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => {
                          const isSelected = selectedTagIds.includes(tag.id);
                          if (isSelected) {
                            setSelectedTagIds(selectedTagIds.filter(id => id !== tag.id));
                          } else {
                            setSelectedTagIds([...selectedTagIds, tag.id]);
                          }
                        }}
                        className={`
                          inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                          cursor-pointer transition-all duration-200 select-none
                          ${selectedTagIds.includes(tag.id)
                            ? isDarkMode
                              ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {tag.label}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTag(tag.id);
                          }}
                          className={`
                            ml-1 rounded-full p-0.5 hover:bg-opacity-80
                            ${selectedTagIds.includes(tag.id)
                              ? isDarkMode
                                ? 'hover:bg-blue-500/30'
                                : 'hover:bg-blue-200'
                              : isDarkMode
                              ? 'hover:bg-gray-600'
                              : 'hover:bg-gray-200'
                            }
                          `}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    {allTags.length === 0 && (
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No tags available. Create one to get started.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={async () => {
                  if (!title || !description || !content || selectedTagIds.length === 0 || !coverImage) {
                    toast.error('Please fill in all required fields', {
                      description: 'Make sure to include title, description, content, tags, and cover image'
                    });
                    return;
                  }

                  try {
                    setIsSubmitting(true);
                    const { data } = await axios.post(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`,
                      {
                        title,
                        description,
                        content,
                        tags: selectedTagIds,
                        coverImage: coverImage.url,
                        publicId: coverImage.publicId
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${Cookies.get('access_token')}`
                        }
                      }
                    );

                    toast.success('Blog post created successfully!', {
                      description: 'Redirecting to dashboard...'
                    });
                    router.push('/admin/dashboard');
                  } catch (error: any) {
                    console.error('Error creating blog post:', error);
                    toast.error('Failed to create blog post', {
                      description: error?.response?.data?.message || 'An unexpected error occurred'
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
                className={`
                  px-6 py-3 rounded-lg font-medium flex items-center gap-2
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                  ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}
                `}
              >
                {isSubmitting ? 'Creating...' : 'Create Blog Post'}
              </button>
            </div>
          </div>

          {/* Tag Creation Modal */}
          {isTagModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl w-96`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Create New Tag</h3>
                  <button
                    type="button"
                    onClick={() => setIsTagModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter tag name"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTagModalOpen(false)}
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateTag}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
