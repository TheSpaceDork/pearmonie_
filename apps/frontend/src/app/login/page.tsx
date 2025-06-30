"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SiContentstack } from "react-icons/si";
import { axiosNextApi } from "../../../lib/axios";
import { ThreeDots } from "react-loader-spinner";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../store/hooks";
import { saveUser } from "../../../store/slices/saveUser";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPassword ? "text" : "password";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // checks for fields with only spaces or empty
    if (!password.trim() || !email.trim()) {
      enqueueSnackbar("Please fill all fields!", { variant: "error" });
      setIsLoading(false);
      return;
    }
    try {
      const response = await axiosNextApi.post("/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log(response);
        enqueueSnackbar("Success", { variant: "success" });
        console.log("Redirecting...");
        router.replace("/dashboard");
        dispatch(saveUser(response.data.user));
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data?.message || "An error occurred", {
          variant: "error",
        });
      }
    }
  };
  return (
    <div className="flex justify-between w-screen h-screen">
      <div className="w-full md:w-1/2 p-8">
        <div className="flex items-center space-x-4 ">
          {" "}
          <div className="text-4xl">
            <SiContentstack />
          </div>{" "}
          <span className="font-semibold">C.R System</span>
        </div>
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-[22rem]">
            <div className="mb-[4rem]">
              <h1 className="text-2xl font-bold">Welcome back,User</h1>
              <p className="text-xs text-gray-500">Log in to your account</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <input
                type="text"
                placeholder="Email"
                className="border-b border-b-gray-300 outline-none placeholder:text-sm py-3 text-sm "
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex items-center  justify-between border-b border-b-gray-300 outline-none placeholder:text-sm py-3 ">
                <input
                  type={inputType}
                  placeholder="Password"
                  className="outline-none border-none w-full placeholder:text-sm text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="mt-[2.4px] accent-black"
                />
                <label htmlFor="terms" className="text-xs text-gray-500 ">
                  Remember me
                </label>
              </div>
              <button className="bg-black cursor-pointer w-full flex justify-center items-center h-10 px-4 py-3 text-sm rounded-md text-white font-semibold">
                {isLoading ? (
                  <ThreeDots height={14} width={25} color="white" />
                ) : (
                  <span> Log In</span>
                )}
              </button>
              <span className="text-sm flex space-x-2">
                {" "}
                <span>{"Don't have an account ? "}</span>
                <Link href={"/"}>
                  <span className="underline">Sign Up</span>
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block  w-1/2 relative">
        <Image
          src={"/assets/login-img2.webp"}
          alt="Login image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 text-white h-full w-full absolute top-0 left-0 bottom-0 flex flex-col items-end py-[3rem] px-6">
          <h1 className="text-3xl font-bold mt-auto">
            Smarter recommendations, happier customers.
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Page;
