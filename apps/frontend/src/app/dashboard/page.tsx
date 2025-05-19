"use client";

import React, { useMemo, useState } from "react";
import Masonry from "react-masonry-css";
import RecommendationCards from "@/components/RecommendationCards";
import { useAppSelector } from "../../../store/hooks";
import {
  RecommendationItem,
  useAIRecommendations,
} from "../../../hooks/useAiRecommendations";

const Page = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Handle selection
  const handleSelect = (type: string) => {
    setSelectedType(type);
    setIsDropdownOpen(false);
  };

  const recommendations = useAppSelector(
    (state) => state.getRecommendations.data
  ) as RecommendationItem[];

  const userId = useAppSelector((state) => state.getUser.user._id) as string;
  const { aiRecommendations, loading } = useAIRecommendations({
    recommendations,
    userId,
  });

  const remainingRecommendations = recommendations.filter(
    (rec) => !aiRecommendations.some((ai) => ai._id === rec._id)
  );

  const combinedRecommendations = useMemo(
    () => [...aiRecommendations, ...remainingRecommendations],
    [aiRecommendations, remainingRecommendations]
  );

  // 🔍 Extract unique postTypes for filtering
  const postTypes = useMemo(() => {
    const types = new Set(combinedRecommendations.map((rec) => rec.postType));
    return ["All", ...Array.from(types)];
  }, [combinedRecommendations]);

  const [selectedType, setSelectedType] = useState("All");

  const filteredRecommendations = useMemo(() => {
    if (selectedType === "All") return combinedRecommendations;
    return combinedRecommendations.filter(
      (rec) => rec.postType === selectedType
    );
  }, [combinedRecommendations, selectedType]);

  const [dummySkelly, setDummySkelly] = React.useState<string[]>([]);
  React.useEffect(() => {
    const count = Math.floor(Math.random() * 6) + 10;
    const heights = Array.from({ length: count }, () => {
      const h = 10 + Math.random() * 10;
      return h.toFixed(1);
    });
    setDummySkelly(heights);
  }, []);

  return (
    <div className="w-full px-[1.5rem] py-[3rem] overflow-y-scroll">
      <div className="relative w-[200px] mb-6">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-left shadow-sm flex justify-between items-center"
        >
          {selectedType}
          <span className="ml-2">&#x25BC;</span> {/* Down caret */}
        </button>

        {isDropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
            {postTypes.map((type) => (
              <li
                key={type}
                onClick={() => handleSelect(type)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selectedType === type ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {type}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {loading
          ? dummySkelly.map((item, index) => (
              <div
                key={index}
                className="bg-gray-300 animate-pulse rounded-md w-full"
                style={{ height: `${item}rem` }}
              />
            ))
          : filteredRecommendations.map((item) => (
              <RecommendationCards key={item._id} item={item} />
            ))}
      </Masonry>
    </div>
  );
};

export default Page;
