import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../components/CategoryCard";
import SearchBar from "../components/SearchBar";
import { fetchCategories } from "../services/categoriesService";
import { Info } from "../components/Info";
import { useEffect, useMemo, useState } from "react";
import { ScrollContainer } from "../components/ScrollContainer";
import { BottomNav } from "../components/BottomNav";
import { Category } from "../types/category";
import { debounce } from "../utils/debounce";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleSearchChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.trim());
      }, 300),
    []
  );

  useEffect(() => {
    if (!isLoading && categories) {
      const filtered = categories.filter((cat: Category) =>
        cat.name.toLowerCase().includes(searchQuery)
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories, isLoading]);

  return (
    <div className="mx-auto pt-4  justify-end flex flex-col gap-3 w-full h-full">
      {/* Search */}
      <div className="px-2">
        <SearchBar
          onChange={handleSearchChange}
          placeholder="Search for Categories..."
        />
      </div>
      {/* Main Content */}
      <ScrollContainer className="flex-grow px-2 w-full">
        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-4 grid-cols-2 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-40 bg-gray-200 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        )}
        {/* Error state */}
        {isError && (
          <Info
            title="Error loading categories"
            message="Failed to load categories. Please try again later."
          />
        )}
        {/* Empty state */}
        {!isLoading && !isError && filteredCategories.length === 0 && (
          <Info
            title={
              categories?.length === 0
                ? "No Categories Available"
                : "No Matches Found"
            }
            message={
              categories?.length === 0
                ? "There are currently no categories available. Please check back later."
                : "No categories match the entered name. Try a different search term."
            }
          />
        )}
        {/* Success state with data */}
        {!isLoading && !isError && filteredCategories.length > 0 && (
          <div className="grid gap-4 grid-cols-2 w-full">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </ScrollContainer>
      {/* Bottom Navbar */}
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
