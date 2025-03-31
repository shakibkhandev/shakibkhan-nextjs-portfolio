'use client'

import { useState, useEffect, use } from 'react';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { X, Tag as TagIcon, Upload, Link2 } from 'lucide-react';
import TagModal from '@/components/TagModal';
import BlogEditor from '@/components/BlogEditor';
import { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import axios from 'axios';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface Tag {
  value: string;
  label: string;
}

const tagOptions: Tag[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'programming', label: 'Programming' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UpdateBlogPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isDarkMode } = useGlobalContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [coverImage, setCoverImage] = useState<{ url: string; publicId: string } | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('access_token')}`
            }
          }
        );
        
        const blog = response.data.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setCoverImage({
          url: blog.image_url,
          publicId: blog.public_id || blog.image_url
        });
        
        const blogTags = blog.tags || [];
        const formattedTags = Array.isArray(blogTags) ? blogTags.map((tag: string) => ({
          value: tag,
          label: tag.charAt(0).toUpperCase() + tag.slice(1)
        })) : [];
        setTags(formattedTags);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog post');
        router.push('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  const handleEditorChange = (editor: Editor) => {
    setContent(editor.getHTML());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content || tags.length === 0 || !coverImage) {
      toast.error('Please fill in all required fields', {
        description: 'Make sure to include title, description, content, tags, and cover image'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`,
        {
          title,
          description,
          content,
          tags: tags.map(tag => tag.value),
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

      toast.success('Blog post updated successfully!', {
        description: 'Redirecting to dashboard...'
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error updating blog post:', error);
      toast.error('Failed to update blog post', {
        description: error?.response?.data?.message || 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-x-hidden">
      <div className={`w-full h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Update Blog Post
              </h1>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Update the details below to modify your blog post
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

          <form onSubmit={handleSubmit} className="space-y-8">
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
                  <BlogEditor onChange={handleEditorChange} content={content} isDarkMode={isDarkMode} />
                </div>
              </div>

              {/* Right Column - Meta Info */}
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
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium">Tags</label>
                    <button
                      type="button"
                      onClick={() => setIsTagModalOpen(true)}
                      className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-sm ${
                        isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <TagIcon size={14} />
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag.value}
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                      >
                        {tag.label}
                        <button
                          type="button"
                          onClick={() => setTags(tags.filter(t => t.value !== tag.value))}
                          className="hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting && 'opacity-75 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    'Update Blog Post'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Tag Modal */}
      <TagModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        onSelect={(newTags: Tag[]) => {
          setTags(newTags);
          setIsTagModalOpen(false);
        }}
        selectedTags={tags}
        options={tagOptions}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
