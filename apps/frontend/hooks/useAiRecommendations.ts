import { useEffect, useMemo, useState } from "react";
import { getSimilarContent } from "ai-utils";

export interface RecommendationItem {
  _id: string;
  title: string;
  description: string;
  postType: string;
  text?: string;
  likes: string[]; // Assuming user IDs are stored here
  comments: { id: string; name: string; text: string }[]; // Assuming this structure
  image?: string;
  link?: string;
  creator: {
    name: string;
  };
  createdAt: Date;
}

interface UseAIRecommendationsProps {
  recommendations: RecommendationItem[];
  userId: string;
}

export const useAIRecommendations = ({
  recommendations,
  userId,
}: UseAIRecommendationsProps) => {
  const [aiRecommendations, setAiRecommendations] = useState<
    RecommendationItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Derive likedItems and commentedItems based on userId
  const likedItems = useMemo(() => {
    return recommendations.filter((item) => item.likes?.includes(userId));
  }, [recommendations, userId]);

  const commentedItems = useMemo(() => {
    return recommendations.filter((item) =>
      item.comments?.some((comment) => comment.id === userId)
    );
  }, [recommendations, userId]);

  useEffect(() => {
    const getRecommendedWithAI = async () => {
      if (!userId) return;

      const seed = likedItems[0] || commentedItems[0];
      if (!seed) return;

      try {
        setLoading(true);
        const similar = await getSimilarContent(recommendations, seed, 5);
        setAiRecommendations(similar);
      } catch (err) {
        console.error("AI recommendation error:", err);
      } finally {
        setLoading(false);
      }
    };

    getRecommendedWithAI();
  }, [likedItems, commentedItems, recommendations, userId]);

  return { aiRecommendations, loading };
};
