import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { CiGrid31 } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex">
      <div
        className={`${
          isCollapsed ? "md:w-16 w-10" : "md:w-72 w-20 px-3"
        } bg-green-400 min-h-screen transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className={`${
            isCollapsed ? "justify-center" : "justify-end"
          } grid grid-cols-2 w-full p-4 text-white hidden md:block`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <FiChevronRight size={24} />
          ) : (
            <FiChevronLeft size={24} />
          )}
        </button>

        <NavLink
          to={"all-quize"}
          className={({ isActive }) =>
            `flex items-center py-3 px-5 my-2 bg-white rounded-md ${isActive ? "text-green-500 font-semibold bg-[#0F172A]" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <CiGrid31 className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {!isCollapsed && "All Quize"}
          </span>
        </NavLink>
        <NavLink
          to={"create-quize"}
          className={({ isActive }) =>
            `flex items-center py-3 px-5 my-1 bg-white rounded-md ${isActive ? "text-green-500 font-semibold bg-[#0F172A]" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <IoCreateOutline  className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {!isCollapsed && "Create/Edit Quiz"}
          </span>
        </NavLink>
      </div>
      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
