import { createSlice } from "@reduxjs/toolkit";

interface userType {
  user: {
    email: string;
    name: string;
    id: string;
  };
}
const initialState: userType = {
  user: {
    email: "",
    name: "",
    id: "",
  },
};

export const getUser = createSlice({
  name: "AddUser",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = getUser.actions;
export default getUser.reducer;
