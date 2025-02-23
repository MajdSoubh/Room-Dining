import { ShoppingCart, ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="z-40 fixed top-0 left-0 right-0 h-[3.75rem] bg-navbar-primary">
      <div className="mx-auto text-primary px-4 py-[0.9rem] container w-full flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex group bg-gradient-to-r 
                hover:from-[#00587e] hover:to-[#006699] hover:bg-primary hover:text-white items-center border-2 border-primary pl-1 pr-2 py-[0.1rem] text-md transition-colors rounded-[0.35rem]"
        >
          <ChevronLeft className="stroke-2 w-5 h-5 group-hover:text-white group-hover:stroke-white" />
          Back
        </button>
        <div className="font-bold">In Room Dining</div>

        <button>
          <div className="relative">
            <div className="text-white bg-primary rounded-full absolute -top-1 -right-1 w-3 h-3 text-[0.5rem]">
              {getTotalItems()}
            </div>
            <ShoppingCart className="fill-primary" />
          </div>
        </button>
      </div>
    </div>
  );
}
