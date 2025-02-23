import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="bg-background-primary">
      <Navbar />
      <div className="mt-[3.75rem] container mx-auto pb-0 h-[calc(100vh-3.75rem)] ">
        <Outlet />
      </div>
    </div>
  );
}
