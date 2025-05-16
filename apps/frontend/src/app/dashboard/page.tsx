"use client";
import RecommendationCards from "@/components/RecommendationCards";
import React from "react";

import Masonry from "react-masonry-css";
const Page = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div className="w-full px-[1.5rem] py-[3rem]">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <RecommendationCards />
        <RecommendationCards />
        <RecommendationCards />
      </Masonry>
    </div>
  );
};

export default Page;
