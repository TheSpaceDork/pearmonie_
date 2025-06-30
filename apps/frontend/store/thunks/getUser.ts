import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosNextApi } from "../../lib/axios";
import { store } from "..";
import { saveUser } from "../slices/saveUser";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axiosNextApi.get("/auth/get-user");
    if (response.status === 200) {
      // console.log(response.data);
      store.dispatch(saveUser(response.data.user));
    }

    return response.data.user;
  } catch (error) {
    // console.log(error);
    return error;
  }
});
