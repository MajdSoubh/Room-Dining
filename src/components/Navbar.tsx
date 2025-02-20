import { BackArrowIcon, CartIcon } from "./Icons";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-background-primary">
      <div className="mx-auto text-primary px-4 py-[0.9rem] container w-full flex justify-between items-center">
        <button className="flex group hover:bg-primary hover:text-white items-center border-2 border-primary pl-1 pr-2 transition-colors rounded-[0.5rem]">
          <BackArrowIcon
            stroke="#00618e"
            strokeWidth="30.44"
            width={"17px"}
            height={"15px"}
            className=" group-hover:fill-white group-hover:stroke-white transition-colors"
          />
          Back
        </button>
        <div className="font-semibold">In Room Dining</div>

        <button>
          <div className="relative">
            <div className="text-white bg-primary rounded-full absolute -top-1 -right-1 w-3 h-3 text-[0.5rem]">
              0
            </div>
            <CartIcon />
          </div>
        </button>
      </div>
    </div>
  );
}
