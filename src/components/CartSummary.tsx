import { useCart } from "../context/CartContext";

export const CartSummary = () => {
  const { getTotalPrice, getTotalItems } = useCart();
  return (
    <div className="w-full">
      <div className="flex flex-col rounded-t-4xl overflow-hidden ">
        <div className="px-8 py-2 bg-gradient-to-r from-[#00618e] to-[#0075b5] flex gap-3 items-center justify-between">
          {/* Items counter & View cart button */}
          <div className="flex gap-2 items-center">
            {/* Items counter */}
            <div
              className="bg-white/90 flex items-center justify-center rounded 
                           w-7 h-7  font-medium text-primary"
            >
              {getTotalItems()}
            </div>

            {/* View cart button */}
            <button
              className="text-white px-4 py-[0.3rem] rounded-lg bg-white/10 backdrop-blur-sm
                             hover:bg-white/20 transition-all duration-200 flex items-center
                             gap-2 group"
            >
              <span>View Cart</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
          {/* Total price */}
          <div className="text-white font-semibold text-lg tracking-tight">
            AED {getTotalPrice()}
          </div>
        </div>

        {/* Disclaimer text */}
        <div className="p-2 text-xs bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed text-center">
            Prices are in AED and are inclusive of
            <span className="font-medium"> 10% service charges</span>,
            <span className="font-medium"> 5% VAT</span>, &
            <span className="font-medium"> 7% Municipal fee</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
