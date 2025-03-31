import { Calendar } from "lucide-react";

export const WorkExperienceItem = ({ work, isDarkMode }: any) => (
  <div className="space-y-2 flex-1">
    <h4
      className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
    >
      {work.companyName}
    </h4>
    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
      {work.position}
    </p>
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {new Date(work.startDate).toLocaleDateString()} -{" "}
        {new Date(work.endDate).toLocaleDateString()}
      </p>
    </div>
  </div>
);