import { FC } from "react";
import { Item } from "../types/item";

interface ItemCardProps {
  item: Item;
  onShowDetail: () => void;
  className?: string;
}

const ItemCard: FC<ItemCardProps> = ({
  item,
  onShowDetail,
  className = "",
}) => {
  return (
    <div
      className={`relative group shadow border-2 border-gray-200 bg-white rounded-e-lg rounded-ss-lg transition-all duration-300 ease-in-out hover:scale-101 ${className}`}
    >
      <div className="flex rounded-ss-lg h-[12rem] w-full overflow-hidden">
        {/* Image Container */}
        <div className="relative w-[35%] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 group-hover:to-black/20 transition-opacity duration-300" />
        </div>

        {/* Information */}
        <div className="flex flex-col justify-between p-4 md:px-8 md:py-6 w-[65%] tracking-wide">
          {/* Text Content */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
              {item.name}
            </h3>
            <p className="text-sm mt-2 text-black font-semibold line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Price*/}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg font-bold text-primary">
                {item.currency}
              </span>
              <span className="text-lg font-bold text-primary ml-1">
                {item.price}
              </span>
            </div>
            {/* Add to Cart */}
            <button
              onClick={onShowDetail}
              className="px-3 md:px-4 py-[0.4rem] text-white text-[0.9rem] font-medium rounded-lg 
                bg-gradient-to-r from-[#00618e] to-[#0073b3]
                hover:from-[#00587e] hover:to-[#006699]
                transition-all duration-300
                transform hover:scale-102"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
