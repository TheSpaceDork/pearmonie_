"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../../../lib/axios";
import { enqueueSnackbar } from "notistack";
import { fetchUser } from "../../../../store/thunks/getUser";
import axios from "axios";

const Page = () => {
  const user = useAppSelector((state) => state.getUser.user);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [initial, setInitial] = useState({
    name: "",
    email: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: "",
      });
      setInitial({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  // Track form changes
  useEffect(() => {
    setIsDirty(
      form.name !== initial.name ||
        form.email !== initial.email ||
        form.password !== ""
    );
  }, [form, initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm({
      name: initial.name,
      email: initial.email,
      password: "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const regExp =
      /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()\-_=\+\[\]{}|;:'",.<>/?\\]{8,}$/;
    if (
      typeof form.password === "string" &&
      form.password.trim() !== "" &&
      !regExp.test(form.password.trim())
    ) {
      enqueueSnackbar(
        "Passwords must be at least 8 characters with one uppercase letter",
        {
          variant: "error",
        }
      );
      return;
    }
    try {
      const response = await axiosInstance.put(`/users/${user._id}`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (response.status === 200) {
        console.log(response.data);
        enqueueSnackbar("Success", { variant: "success" });
        dispatch(fetchUser());

        setInitial({ name: form.name, email: form.email });
        setForm((prev) => ({ ...prev, password: "" }));
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
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPassword ? "text" : "password";
  return (
    <div className="w-full px-6 py-12">
      <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-lg">Personal Info</h4>
          <p className="text-xs text-black/50">Update your personal details</p>
        </div>

        {isDirty && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCancel}
              className="rounded-md border border-gray-300 text-xs px-4 py-2 bg-transparent w-[5rem]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-md border border-gray-300 text-white text-xs px-4 py-2 bg-black w-[5rem]"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-6 max-w-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-2">
            <input
              type={inputType}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New password"
              className="w-full  text-sm  outline-none"
            />
            <div
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
