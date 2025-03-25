"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import ReactMarkdown from "react-markdown";
import { FiCalendar, FiTag, FiUser, FiClock } from "react-icons/fi";
import { format } from "date-fns";

const mcText = `
## **The Rise of Artificial Intelligence in Everyday Life**  
*Author: Emily Chen*  
*Date: March 21, 2025*  
*Tags: Technology, AI, Innovation*

Artificial Intelligence (AI) is no longer a concept confined to science fiction novels or futuristic movies. It's here, woven into the fabric of our daily lives, often in ways we don't even notice. From the moment you unlock your phone with facial recognition to the personalized recommendations on your favorite streaming service, AI is quietly shaping how we interact with the world.

## A Quiet Revolution
The beauty of AI lies in its subtlety. Take virtual assistants like Siri or Alexa—they listen, learn, and adapt to our preferences over time. These tools aren't just convenient; they're a testament to how machine learning can anticipate human needs. Behind the scenes, algorithms analyze massive datasets to predict what we might want next, whether it's a song, a news article, or a grocery list reminder.

But it's not just about convenience. AI is making waves in critical areas like healthcare, where it's being used to detect diseases earlier than ever before. Imagine a world where a computer can spot cancer in an X-ray faster and more accurately than a human doctor. That's not a distant dream—it's happening now.

## The Double-Edged Sword
Of course, with great power comes great responsibility. The rise of AI isn't without its challenges. Privacy concerns loom large as companies collect more data to fuel their algorithms. Who owns that data? How is it being used? These are questions we're still grappling with as a society. Then there's the issue of jobs—automation powered by AI is transforming industries, and while it creates new opportunities, it also displaces workers in others.

Ethically, we're at a crossroads. Bias in AI systems is a real problem; if the data fed into these machines reflects human prejudices, the outputs will too. Addressing this requires not just technical solutions but a broader conversation about fairness and accountability.

## Looking Ahead
So, where do we go from here? The future of AI is as exciting as it is uncertain. We're on the cusp of breakthroughs that could revolutionize fields like education, transportation, and even creative arts. Imagine AI tutors that adapt to every student's learning style or self-driving cars that eliminate traffic accidents. At the same time, we'll need to navigate the societal shifts that come with such rapid change.

One thing is clear: AI isn't going away. It's a tool, and like any tool, its impact depends on how we choose to wield it. As we move forward, the challenge will be to harness its potential while staying mindful of its pitfalls. The rise of AI in everyday life is just the beginning—how we shape its role will define the decades to come.
`;

export default function Page() {
  const { isDarkMode } = useGlobalContext();

  return (
    <article className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
            alt="AI Technology"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8"
          />
          <h1 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            The Rise of Artificial Intelligence in Everyday Life
          </h1>
        </div>

        {/* Metadata Section */}
        <div className={`flex flex-wrap gap-6 items-center text-sm mb-8 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          <div className="flex items-center gap-2">
            <FiUser className="w-4 h-4" />
            <span>Emily Chen</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            <span>{format(new Date(2025, 2, 21), 'MMMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            <span>8 min read</span>
          </div>
          <div className="flex items-center gap-2">
            <FiTag className="w-4 h-4" />
            <div className="flex gap-2">
              {["Technology", "AI", "Innovation"].map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded-full text-xs ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`prose ${isDarkMode ? "prose-invert" : ""} max-w-none`}>
          <div className={`${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } leading-relaxed`}>
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className={`text-2xl font-bold mt-8 mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-lg leading-relaxed">{children}</p>
                ),
              }}
            >
              {mcText}
            </ReactMarkdown>
          </div>
        </div>

        {/* Share and Navigation Section */}
        <div className={`mt-12 pt-8 border-t ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}>
          <div className="flex justify-between items-center">
            <button
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } transition-colors`}
            >
              ← Previous Article
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              } transition-colors`}
            >
              Next Article →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
