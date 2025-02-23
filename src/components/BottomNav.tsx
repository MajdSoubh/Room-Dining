import { NavLink } from "react-router";
import { Search, House, Menu } from "lucide-react";

export const BottomNav = () => {
  return (
    <div className=" w-full">
      <div className="rounded-t-4xl text-white px-8 py-[0.7rem] bg-gradient-to-r from-[#00618e] to-[#0075b5] flex gap-3 items-center justify-between">
        <div className="flex justify-between w-full gap-2">
          {/* Menu Button */}
          <button className="cursor-pointer">
            <Menu />
          </button>
          {/* Categories page */}
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `inline-flex text-white items-center  relative ${
                isActive
                  ? " after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:absolute after:-bottom-1"
                  : "hover:after:content-[''] hover:after:block hover:after:w-full hover:after:h-[2px] hover:after:bg-gray-300 hover:after:absolute hover:after:bottom-0"
              }`
            }
          >
            <House className="text-current" />
          </NavLink>
          {/* Search Button */}
          <button className="cursor-pointer">
            <Search />
          </button>
          {/* Whats app Link */}
          <a className="flex items-center justify-center cursor-pointer">
            <svg fill="#ffffff" height="24px" width="24px" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5,3.5C18.25,1.25,15.2,0,12,0C5.41,0,0,5.41,0,12c0,2.11,0.65,4.11,1.7,5.92 L0,24l6.33-1.55C8.08,23.41,10,24,12,24c6.59,0,12-5.41,12-12C24,8.81,22.76,5.76,20.5,3.5z M12,22c-1.78,0-3.48-0.59-5.01-1.49 l-0.36-0.22l-3.76,0.99l1-3.67l-0.24-0.38C2.64,15.65,2,13.88,2,12C2,6.52,6.52,2,12,2c2.65,0,5.2,1.05,7.08,2.93S22,9.35,22,12 C22,17.48,17.47,22,12,22z M17.5,14.45c-0.3-0.15-1.77-0.87-2.04-0.97c-0.27-0.1-0.47-0.15-0.67,0.15 c-0.2,0.3-0.77,0.97-0.95,1.17c-0.17,0.2-0.35,0.22-0.65,0.07c-0.3-0.15-1.26-0.46-2.4-1.48c-0.89-0.79-1.49-1.77-1.66-2.07 c-0.17-0.3-0.02-0.46,0.13-0.61c0.13-0.13,0.3-0.35,0.45-0.52s0.2-0.3,0.3-0.5c0.1-0.2,0.05-0.37-0.02-0.52 C9.91,9.02,9.31,7.55,9.06,6.95c-0.24-0.58-0.49-0.5-0.67-0.51C8.22,6.43,8.02,6.43,7.82,6.43S7.3,6.51,7.02,6.8 C6.75,7.1,5.98,7.83,5.98,9.3c0,1.47,1.07,2.89,1.22,3.09c0.15,0.2,2.11,3.22,5.1,4.51c0.71,0.31,1.27,0.49,1.7,0.63 c0.72,0.23,1.37,0.2,1.88,0.12c0.57-0.09,1.77-0.72,2.02-1.42c0.25-0.7,0.25-1.3,0.17-1.42C18,14.68,17.8,14.6,17.5,14.45z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
