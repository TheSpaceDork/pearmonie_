"use client";
import RecommendationCards from "@/components/RecommendationCards";
import React, { useEffect, useState } from "react";

import Masonry from "react-masonry-css";
import { useAppSelector } from "../../../store/hooks";
const Page = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  const recommendations = useAppSelector((state) => {
    return state.getRecommendations.data;
  });

  const [dummySkelly, setDummySkelly] = useState<string[]>([]);

  useEffect(() => {
    const count = Math.floor(Math.random() * 6) + 10; // Between 10 and 15
    const heights = Array.from({ length: count }, () => {
      const h = 10 + Math.random() * 10;
      return h.toFixed(1);
    });
    setDummySkelly(heights);
  }, []);

  return (
    <div className="w-full px-[1.5rem] py-[3rem] overflow-y-scroll">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {recommendations.length === 0
          ? dummySkelly.map((item, index) => (
              <div
                key={index}
                className="bg-gray-300 animate-pulse rounded-md w-full"
                style={{ height: `${item}rem` }}
              ></div>
            ))
          : recommendations.map((item, index) => (
              <RecommendationCards key={index} item={item} />
            ))}
      </Masonry>
    </div>
  );
};

export default Page;
