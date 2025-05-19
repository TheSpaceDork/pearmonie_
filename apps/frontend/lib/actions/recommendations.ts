// import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../axios";
import { fetchUser } from "../../store/thunks/getUser";
import { store } from "../../store";

export const toggleLike = async (
  recommendationId: string,
  onSuccess?: (likes: string[]) => void
) => {
  try {
    const res = await axiosInstance.post(
      `/recommendations/${recommendationId}/like`
    );
    // enqueueSnackbar(res.data.message, { variant: "success" });
    if (onSuccess) {
      onSuccess(res.data.likes);
      store.dispatch(fetchUser());
    }
  } catch (err) {
    console.error("Toggle like error:", err);
  }
};
export const addComment = async (
  recommendationId: string,
  text: string,
  onSuccess?: (comments: []) => void
) => {
  try {
    const res = await axiosInstance.post(
      `/recommendations/${recommendationId}/comment`,
      { text }
    );
    if (onSuccess) onSuccess(res.data.comments);
    // console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
