"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiCircleMinus } from "react-icons/ci";
import { GrAnalytics, GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { SiContentstack } from "react-icons/si";
import { useAppSelector } from "../../store/hooks";
import { useLogout } from "../../hooks/useLogout";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const logOut = useLogout();
  const user = useAppSelector((state) => {
    return state.getUser.user;
  });
  const dashLinks = [
    {
      title: "Home",
      icon: <GrHomeRounded className="text-xl" />,
      route: "/dashboard",
      allowedRoles: "All",
    },
    {
      title: "Analytics",
      icon: <GrAnalytics className="text-xl" />,
      route: "/dashboard/analytics",
      allowedRoles: "Admin",
    },
    {
      title: "Manage System",
      icon: <RiRobot2Line className="text-xl" />,
      route: "/dashboard/manage",
      allowedRoles: "Admin",
    },
    {
      title: "Profile",
      icon: <IoPersonOutline className="text-xl" />,
      route: "/dashboard/profile",
      allowedRoles: "All",
    },
  ];
  return (
    <div className="w-[17rem] py-[3rem] pb-[4.5rem] px-[2.3rem] border-r border-r-gray-300 flex flex-col justify-between text-black/45">
      <div className="flex flex-col space-y-[6rem]">
        <div className="flex items-center space-x-4  text-black ">
          {" "}
          <div className="text-4xl">
            <SiContentstack />
          </div>{" "}
          <span className="font-bold text-xl ">C.R System</span>
        </div>
        {user.name === "" ? (
          <div className="flex flex-col space-y-6">
            {dashLinks.map((_, index) => (
              <div
                key={index}
                className="w-full h-4 bg-gray-300 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            {dashLinks
              .filter((item) => {
                if (user.role === "admin") {
                  return true;
                } else {
                  return (
                    item.allowedRoles === "All" ||
                    item.allowedRoles.includes(user.role)
                  );
                }
              })

              .map((item, index) => (
                <Link key={index} href={item.route}>
                  <div
                    className={`flex items-center space-x-4 ${
                      pathname === item.route && "text-black "
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>

      <div
        onClick={logOut}
        className="flex items-center space-x-4 cursor-pointer"
      >
        <CiCircleMinus className="text-xl" />
        <span className="text-sm">Log out</span>
      </div>
    </div>
  );
};

export default DashboardSidebar;
