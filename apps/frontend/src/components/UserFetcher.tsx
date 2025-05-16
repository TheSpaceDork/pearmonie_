"use client";
import { useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAppDispatch } from "../../store/hooks";
import { saveUser } from "../../store/slices/saveUser";

const UserFetcher = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUserApi = async () => {
      try {
        const response = await axiosInstance.get("/auth/get-user");
        if (response.status === 200) {
          console.log(response.data);
          dispatch(saveUser(response.data.user));
        }
      } catch (error) {
        console.error("failed to fetch user:", error);
      }
    };
    fetchUserApi();
  }, [dispatch]);

  return null;
};

export default UserFetcher;
