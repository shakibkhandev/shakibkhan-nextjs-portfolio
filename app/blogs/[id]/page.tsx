"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import ReactMarkdown from "react-markdown";

const mcText = `
## **The Rise of Artificial Intelligence in Everyday Life**  
*Author: Emily Chen*  
*Date: March 21, 2025*  
*Tags: Technology, AI, Innovation*

Artificial Intelligence (AI) is no longer a concept confined to science fiction novels or futuristic movies. It’s here, woven into the fabric of our daily lives, often in ways we don’t even notice. From the moment you unlock your phone with facial recognition to the personalized recommendations on your favorite streaming service, AI is quietly shaping how we interact with the world.

## A Quiet Revolution
The beauty of AI lies in its subtlety. Take virtual assistants like Siri or Alexa—they listen, learn, and adapt to our preferences over time. These tools aren’t just convenient; they’re a testament to how machine learning can anticipate human needs. Behind the scenes, algorithms analyze massive datasets to predict what we might want next, whether it’s a song, a news article, or a grocery list reminder.

But it’s not just about convenience. AI is making waves in critical areas like healthcare, where it’s being used to detect diseases earlier than ever before. Imagine a world where a computer can spot cancer in an X-ray faster and more accurately than a human doctor. That’s not a distant dream—it’s happening now.

## The Double-Edged Sword
Of course, with great power comes great responsibility. The rise of AI isn’t without its challenges. Privacy concerns loom large as companies collect more data to fuel their algorithms. Who owns that data? How is it being used? These are questions we’re still grappling with as a society. Then there’s the issue of jobs—automation powered by AI is transforming industries, and while it creates new opportunities, it also displaces workers in others.

Ethically, we’re at a crossroads. Bias in AI systems is a real problem; if the data fed into these machines reflects human prejudices, the outputs will too. Addressing this requires not just technical solutions but a broader conversation about fairness and accountability.

## Looking Ahead
So, where do we go from here? The future of AI is as exciting as it is uncertain. We’re on the cusp of breakthroughs that could revolutionize fields like education, transportation, and even creative arts. Imagine AI tutors that adapt to every student’s learning style or self-driving cars that eliminate traffic accidents. At the same time, we’ll need to navigate the societal shifts that come with such rapid change.

One thing is clear: AI isn’t going away. It’s a tool, and like any tool, its impact depends on how we choose to wield it. As we move forward, the challenge will be to harness its potential while staying mindful of its pitfalls. The rise of AI in everyday life is just the beginning—how we shape its role will define the decades to come.
`;

export default function Page() {
  const { isDarkMode } = useGlobalContext();

  return (
    <main
      className={`min-h-screen w-screen ${
        isDarkMode ? "bg-gray-900 " : "bg-gray-100"
      }`}
    >
      <main
        className={`max-w-3xl mx-auto p-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <h2 className="text-2xl font-bold">
          Pegasus Spyware: A Deep Dive into Surveillance and Privacy Concerns
        </h2>
        <br />
        <p>
          Pegasus spyware represents a significant threat to privacy, security,
          and human rights in the digital age. As technology continues to
          evolve, so do the tactics employed by those seeking to exploit it.
        </p>
        <br />
        <br />

        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <br />
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
          alt="Panda"
          className="rounded-lg object-cover max-w-2xl mx-auto h-full w-full"
        />

        <ReactMarkdown>{mcText}</ReactMarkdown>
        <br />
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <br />
      </main>
    </main>
  );
}
