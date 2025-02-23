import { useQuery } from "@tanstack/react-query";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import { fetchCategoryItems } from "../services/categoriesService";
import { Info } from "../components/Info";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartSummary } from "../components/CartSummary";
import { ScrollContainer } from "../components/ScrollContainer";
import { ItemDetailModal } from "../components/modals/ItemDetailModal";
import { Item } from "../types/item";

export default function ItemsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { "category-id": categoryId } = useParams<{ "category-id": string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () =>
      categoryId
        ? fetchCategoryItems(categoryId)
        : Promise.reject("No category ID"),
    enabled: !!categoryId,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.trim());
  };

  useEffect(() => {
    if (data?.items.data) {
      const filtered = data.items.data
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((itemResponse) => ({
          ...itemResponse,
          currency: data.currency,
          restaurant: {
            uuid: data.restaurant.uuid,
          },
        }));

      setFilteredItems(filtered);
    }
  }, [searchQuery, data]);

  // Derived values for empty state
  const itemsData = data?.items.data || [];
  const isEmptyState = !isLoading && !isError && filteredItems.length === 0;

  return (
    <div className="mx-auto justify-end pt-4 flex flex-col gap-3 w-full h-full lg:w-[60rem]">
      {/* Search */}
      <div className="px-2">
        <SearchBar
          onChange={handleSearchChange}
          placeholder="Search for Dishes, Drinks ..."
        />
      </div>

      {/* Main Content */}
      <ScrollContainer className="flex-grow px-2 w-full">
        {isLoading && (
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-40 bg-gray-200 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        )}

        {isError && (
          <Info
            title="Error loading items"
            message="Failed to load items. Please try again later."
          />
        )}

        {isEmptyState && (
          <Info
            title={
              itemsData.length === 0 ? "No Items Available" : "No Matches Found"
            }
            message={
              itemsData.length === 0
                ? "There are currently no items available. Please check back later."
                : "No items match the entered name. Try a different search term."
            }
          />
        )}

        {!isLoading && !isError && filteredItems.length > 0 && (
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 w-full">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={{
                  ...item,
                  currency: data?.currency || "USD",
                  restaurant: {
                    uuid: data?.restaurant.uuid || "",
                  },
                }}
                onShowDetail={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}
      </ScrollContainer>

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <div>
        <CartSummary />
      </div>
    </div>
  );
}
