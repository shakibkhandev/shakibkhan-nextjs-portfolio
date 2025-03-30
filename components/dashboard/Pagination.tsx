"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { isDarkMode } = useGlobalContext();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-300 disabled:text-gray-600"
            : "hover:bg-gray-100 text-gray-600 disabled:text-gray-300"
        } disabled:cursor-not-allowed`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            currentPage === page
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "hover:bg-gray-700 text-gray-300"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-300 disabled:text-gray-600"
            : "hover:bg-gray-100 text-gray-600 disabled:text-gray-300"
        } disabled:cursor-not-allowed`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
