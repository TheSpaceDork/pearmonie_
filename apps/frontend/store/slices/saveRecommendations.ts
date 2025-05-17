import { createSlice } from "@reduxjs/toolkit";

export interface Recommendation {
  _id: string;
  title: string;
  description: string;
  postType: string;
  image: string;
  text: string;
  link: string;
  creator: {
    name: string;
  };
  likes: string[];
  comments: {
    name: string;
    text: string;
  }[];
}

// The entire slice state
interface RecommendationState {
  data: Recommendation[];
}

const initialState: RecommendationState = {
  data: [],
};

export const getRecommendations = createSlice({
  name: "AddRecommendations",
  initialState,
  reducers: {
    saveRecommendations: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveRecommendations } = getRecommendations.actions;
export default getRecommendations.reducer;
