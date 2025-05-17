"use client";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchUser } from "../../store/thunks/getUser";
import { fetchRecommendations } from "../../store/thunks/getRecommendations";

const UserFetcher = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchRecommendations());
  }, [dispatch]);

  return null;
};

export default UserFetcher;
