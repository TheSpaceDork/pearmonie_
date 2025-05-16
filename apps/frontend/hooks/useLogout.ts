"use client";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      if (response.status === 200) {
        router.replace("/login");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data?.message || "An error occurred", {
          variant: "error",
        });
      }
    }
  };

  return logout;
};
