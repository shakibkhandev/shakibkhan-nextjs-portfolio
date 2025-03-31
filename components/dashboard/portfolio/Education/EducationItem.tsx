import { Calendar } from "lucide-react";

export const EducationItem = ({ education, isDarkMode }: any) => {
  // Format dates to be more compact (e.g., "Jan 2020 - May 2024")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short'
    });
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <h4 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {education.institution}
        </h4>
        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {education.status}
        </span>
      </div>
      <p className={`text-xs mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {education.degree}
      </p>
      <div className="flex items-center text-xs">
        <Calendar className="w-3 h-3 mr-1" />
        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {formatDate(education.startDate)} - {formatDate(education.endDate)}
        </span>
      </div>
    </div>
  );
};