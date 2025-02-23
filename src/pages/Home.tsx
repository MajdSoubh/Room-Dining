import { NavLink } from "react-router";
import { BottomNav } from "../components/BottomNav";

export default function Home() {
  return (
    <div className="mx-auto pt-4 flex flex-col justify-end gap-3 w-full h-full">
      <div className="flex-grow grid grid-cols-3">
        {/* In-menu dining */}
        <NavLink
          to="/categories"
          className="p-2 flex flex-col items-center cursor-pointer"
        >
          <img src="/images/in-menu-dining.png" alt="" />
          <span className="font-bold text-black/70">In Room Dining</span>
        </NavLink>
      </div>
      <BottomNav />
    </div>
  );
}
