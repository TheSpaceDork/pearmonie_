const hexColors = [
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#EF4444",
  "#6366F1",
  "#EAB308",
  "#14B8A6",
  "#8B5CF6",
  "#F43F5E",
  "#22C55E",
];

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * hexColors.length);
  return hexColors[index];
};
