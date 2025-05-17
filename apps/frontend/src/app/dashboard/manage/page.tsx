"use client";

import { useState } from "react";
import { axiosInstanceForms } from "../../../../lib/axios";
import { MdCloudUpload } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const categories = [
  "UX Writing",
  "Development",
  "Social Post",
  "Marketing",
  "Blog post",
  "Comic book",
  "Fantasy",
];

export default function AddContentPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    text: "",
    link: "",
    postType: categories[0],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile); // Create a preview URL
      setPreviewUrl(imageUrl); // Update the preview URL
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields
    if (!form.title.trim()) {
      enqueueSnackbar("Title is required", { variant: "error" });
      return;
    }

    if (!form.description.trim()) {
      enqueueSnackbar("Description is required", { variant: "error" });
      return;
    }

    const hasText = form.text.trim() !== "";
    const hasImage = !!imageFile;
    const hasLink = form.link.trim() !== "";

    if (!hasText && !hasImage && !hasLink) {
      enqueueSnackbar("Please add at least one of: Text, Image, or Link", {
        variant: "error",
      });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      const response = await axiosInstanceForms.post(
        "/admin/recommendations",
        formData
      );
      if (response.status === 201) {
        console.log(response.data);
        enqueueSnackbar("Success!", { variant: "success" });
        setForm({
          title: "",
          description: "",
          text: "",
          link: "",
          postType: categories[0],
        });
        setImageFile(null);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data?.message || "An error occurred", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-scroll">
      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Add New Content</h1>

        <form className="space-y-4">
          <input
            name="title"
            placeholder="Title *"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="text"
            placeholder="Text content (optional)"
            value={form.text}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="link"
            placeholder="Link (optional)"
            value={form.link}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <select
            name="postType"
            value={form.postType}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <div>
            <label htmlFor="img" className="block text-sm font-medium mb-1">
              Image Upload (optional)
              <div
                style={{
                  backgroundImage: previewUrl ? `url(${previewUrl})` : "none", // Set background image
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className=" border border-dashed border-gray-300 w-full bg-cover rounded-md h-[15rem] my-2 "
              >
                <div className="w-full flex items-center justify-center h-full cursor-pointer bg-transparent">
                  <div className="text-sm text-center flex flex-col items-center">
                    <MdCloudUpload className="text-gray-500 text-3xl" />
                    <span className="text-gray-500">Upload</span>
                  </div>
                </div>
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
              id="img"
              name="img"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer w-[10rem] flex justify-center h-10"
          >
            {loading ? (
              <ThreeDots height={14} width={25} color="white" />
            ) : (
              "Add Content"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
