import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { store } from "..";
import { saveUser } from "../slices/saveUser";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axiosInstance.get("/api/user");
    console.log(response);
    console.log(response.data.data);

    const result = response.data.data;
    store.dispatch(saveUser(result));
    return result;
  } catch (error) {
    console.log(error);
  }
});
