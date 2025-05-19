"use client";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pearmonieassessment-production.up.railway.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosInstanceForms = axios.create({
  baseURL: "https://pearmonieassessment-production.up.railway.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
