import { useEffect, useState } from "react";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";

let model: use.UniversalSentenceEncoder | null = null;

const getText = (item: any): string =>
  `${item.title} ${item.description} ${item.postType} ${item.text || ""}`;

export const getSimilarContent = async (
  allItems: any[],
  targetItem: any,
  topN: number = 5
): Promise<any[]> => {
  if (!model) {
    model = await use.load();
  }

  const embeddings = await model.embed(allItems.map(getText));
  const targetEmbedding = await model.embed([getText(targetItem)]);

  const scores = await tf
    .matMul(
      embeddings as unknown as tf.Tensor,
      targetEmbedding as unknown as tf.Tensor,
      false,
      true
    )
    .array();

  const scoresArray = scores as number[][];

  return allItems
    .map((item, i) => ({ item, score: scoresArray[i][0] }))
    .filter((x) => x.item._id !== targetItem._id)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((x) => x.item);
};

export const useAIRecommendations = ({
  likedItems,
  commentedItems,
  recommendations,
  userId,
}: {
  likedItems: any[];
  commentedItems: any[];
  recommendations: any[];
  userId: string;
}) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const seed = likedItems[0] || commentedItems[0];
        if (!userId || !seed) return;

        const similar = await getSimilarContent(recommendations, seed, 5);
        setResults(similar);
      } catch (err: any) {
        console.error("AI Recommendation Error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (
      (likedItems.length || commentedItems.length) &&
      recommendations.length
    ) {
      run();
    }
  }, [likedItems, commentedItems, recommendations, userId]);

  return { recommendations: results, loading, error };
};
