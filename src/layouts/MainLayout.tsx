import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="mt-14 container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
