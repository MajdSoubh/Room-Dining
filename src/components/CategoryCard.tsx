import { FC } from "react";
import { NavLink } from "react-router";
import { Category } from "../types/category";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, className = "" }) => {
  return (
    <NavLink
      to={`/categories/${category.id}`}
      className={`rounded-3xl w-full relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Open Time if Closed */}
      {category.closed && (
        <div className="absolute z-10 top-4 -left-2 text-xs text-white">
          <div className="bg-red-500 pl-3 flex items-center justify-center p-[6px] h-6 rounded-es-[1.8rem] rounded-e-3xl after:content-[''] after:block after:w-[20px] after:h-[6px] after:rounded-ss-[100%] after:bg-red-700 after:absolute after:left-0 after:-top-1">
            Opens at {category.openTime}
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="rounded-3xl overflow-hidden w-full h-full aspect-[5/3]">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="rounded-3xl absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Category Name */}
        <div className="z-10 truncate w-[90%] text-center absolute bottom-5 left-1/2 uppercase tracking-widest -translate-x-1/2 text-white font-extrabold text-sm md:text-lg">
          {category.name}
        </div>
      </div>
    </NavLink>
  );
};

export default CategoryCard;
