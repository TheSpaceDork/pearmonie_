// analytics/page.tsx
"use client";

import React, { useMemo } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { ChartData } from "chart.js";
import { useAppSelector } from "../../../../store/hooks";
import { Recommendation } from "../../../../store/slices/saveRecommendations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale
);

const AnalyticsPage = () => {
  const recommendations = useAppSelector(
    (state) => state.getRecommendations.data as Recommendation[]
  );

  const analytics = useMemo(() => {
    const engagementByType: Record<
      string,
      { likes: number; comments: number }
    > = {};

    recommendations.forEach((item) => {
      const type = item.postType || "Unknown";
      if (!engagementByType[type]) {
        engagementByType[type] = { likes: 0, comments: 0 };
      }
      engagementByType[type].likes += item.likes?.length || 0;
      engagementByType[type].comments += item.comments?.length || 0;
    });

    return engagementByType;
  }, [recommendations]);

  const postTypes = Object.keys(analytics);
  const likeCounts = postTypes.map((type) => analytics[type].likes);
  const commentCounts = postTypes.map((type) => analytics[type].comments);

  const barData: ChartData<"bar"> = {
    labels: postTypes,
    datasets: [
      {
        label: "Likes",
        data: likeCounts,
        backgroundColor: "#4F46E5",
      },
      {
        label: "Comments",
        data: commentCounts,
        backgroundColor: "#10B981",
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) =>
            `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
      title: {
        display: true,
        text: "Likes and Comments by Post Type",
      },
    },
  };

  const pieData: ChartData<"pie"> = {
    labels: postTypes,
    datasets: [
      {
        label: "Total Engagement (Likes + Comments)",
        data: postTypes.map(
          (type) => analytics[type].likes + analytics[type].comments
        ),
        backgroundColor: [
          "#6366F1",
          "#F59E0B",
          "#10B981",
          "#EF4444",
          "#3B82F6",
          "#A855F7",
          "#F97316",
        ],
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value} engagements`;
          },
        },
      },
      title: {
        display: true,
        text: "Engagement Distribution by Post Type",
      },
    },
  };

  const lineData: ChartData<"line"> = useMemo(() => {
    const dailyMap: Record<string, { likes: number; comments: number }> = {};

    recommendations.forEach((item) => {
      const date = new Date(item.createdAt).toISOString().split("T")[0];
      if (!dailyMap[date]) {
        dailyMap[date] = { likes: 0, comments: 0 };
      }
      dailyMap[date].likes += item.likes?.length || 0;
      dailyMap[date].comments += item.comments?.length || 0;
    });

    const sortedDates = Object.keys(dailyMap).sort();

    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Likes",
          data: sortedDates.map((d) => dailyMap[d].likes),
          borderColor: "#4F46E5",
          backgroundColor: "#4F46E540",
          fill: true,
          tension: 0.3,
        },
        {
          label: "Comments",
          data: sortedDates.map((d) => dailyMap[d].comments),
          borderColor: "#10B981",
          backgroundColor: "#10B98140",
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }, [recommendations]);

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) =>
            `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
      title: {
        display: true,
        text: "Engagement Trends Over Time",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Engagement Count",
        },
      },
    },
  };

  return (
    <div className="p-8 space-y-12">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Engagement by Post Type</h3>
        <Bar data={barData} options={barOptions} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Engagement Distribution</h3>
        <Pie data={pieData} options={pieOptions} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Engagement Trends Over Time
        </h3>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
