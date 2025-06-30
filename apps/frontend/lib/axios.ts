"use client";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.API_BASE_URL || "http://localhost:4000/api",
  baseURL: "https://pearmonie-assessment.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosInstanceForms = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
