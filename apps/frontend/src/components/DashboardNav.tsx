"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { SiContentstack } from "react-icons/si";
import { GrAnalytics, GrHomeRounded } from "react-icons/gr";
import { RiRobot2Line } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useLogout } from "../../hooks/useLogout";
import { useAppSelector } from "../../store/hooks";
import { CiCircleMinus } from "react-icons/ci";

const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
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
    <>
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md relative z-50">
        <div className="flex items-center space-x-4  text-black ">
          {" "}
          <div className="text-3xl">
            <SiContentstack />
          </div>{" "}
          <span className="font-bold text-lg whitespace-nowrap ">
            C.R System
          </span>
        </div>
        <button onClick={toggleMenu} className="text-2xl text-gray-700">
          <FaBars />
        </button>
      </nav>

      {/* Sidebar & Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <div className="text-lg font-semibold">Menu</div>
            <button onClick={closeMenu} className="text-xl text-gray-700">
              <FaTimes />
            </button>
          </div>
          <div className="text-black/45 px-4  flex flex-col space-y-[4rem] py-[2rem]">
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
                      return item.allowedRoles === "All";
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
                        <span className="text-xs">{item.title}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
            <div
              onClick={logOut}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <CiCircleMinus className="text-xl" />
              <span className="text-xs">Log out</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
