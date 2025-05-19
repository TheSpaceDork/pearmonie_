import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { store } from "..";
import { saveRecommendations } from "../slices/saveRecommendations";

export const fetchRecommendations = createAsyncThunk(
  "user/fetchRecommendations",
  async () => {
    try {
      const response = await axiosInstance.get("/recommendations");
      if (response.status === 200) {
        // console.log(response.data);
        store.dispatch(saveRecommendations(response.data.data));
      }

      return response.data.user;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
);
