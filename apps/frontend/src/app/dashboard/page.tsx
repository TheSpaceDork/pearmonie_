"use client";
import axios from "axios";
import React from "react";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../../../lib/axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      if (response.status === 200) {
        console.log(response);
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data?.message || "An error occurred", {
          variant: "error",
        });
      }
    }
  };
  return (
    <div>
      Dash home
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Page;
