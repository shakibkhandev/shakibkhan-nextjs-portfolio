"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isDarkMode } = useGlobalContext();
  const router = useRouter();

  // Function to generate dummy timestamps in BDT format
  const generateTimestamp = (index: any) => {
    const baseDate = new Date("2024-03-21T12:00:00+06:00"); // Static base time in BDT
    baseDate.setMinutes(baseDate.getMinutes() - index * 5); // Subtract minutes for each item
    return baseDate.toLocaleString("en-BD", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
      timeZone: "Asia/Dhaka",
    });
  };

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
        {/* Main Banner */}
        <div
          className="flex w-full mb-4 sm:flex-row flex-col cursor-pointer"
          onClick={() => router.push(`/blogs/1`)}
        >
          {/* Image - Half width with 16:9 aspect ratio */}
          <div className="sm:w-1/2 w-full">
            <div className="rounded-lg overflow-hidden aspect-w-16 aspect-h-9">
              <img
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
                alt="Panda"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Text Content - Half width */}
          <div className="sm:w-1/2 w-full p-4 flex-1">
            <h4 className="text-lg font-semibold">Hello, this is gone</h4>
            <p className="text-sm opacity-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              nesciunt itaque soluta aliquid aperiam dolorem eum commodi impedit
              nisi cum est
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Content Section */}
        <div className="w-full space-y-6">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>
              <div
                className="pt-4 pb-4 rounded-lg flex flex-row gap-4 items-start cursor-pointer"
                onClick={() => router.push(`/blogs/${i}`)}
              >
                {/* Text Content */}
                <div className="flex-1">
                  <p className="text-xs opacity-50">{generateTimestamp(i)}</p>
                  <h4 className="text-lg font-semibold">Hello, this is gone</h4>
                  <p className="text-xs opacity-75">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci, nesciunt itaque soluta aliquid aperiam dolorem eum
                    commodi impedit nisi cum est
                  </p>
                </div>

                {/* Image - Smaller on small screens, on the right */}
                <div className="w-24 md:w-40">
                  <div className="rounded-lg overflow-hidden aspect-w-16 aspect-h-9">
                    <img
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
                      alt="Panda"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
            </div>
          ))}
        </div>
      </main>
    </main>
  );
}
