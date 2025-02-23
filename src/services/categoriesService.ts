import { Category } from "../types/category";
import { ItemResponse } from "../types/item";
import api from "./api";

interface CategoriesResponse {
  data: {
    categories: Category[];
  };
}

interface ItemsResponse {
  data: {
    items: {
      data: ItemResponse[];
      links: {
        total: number;
        first_page_url: string;
        next_page_url: string | null;
        prev_page_url: string | null;
        last_page_url: string;
        last_page: number;
        current_page: number;
      };
    };
    currency: string;
    restaurant: {
      uuid: string;
      id: number;
    };
  };
}

// Define the return type for fetchCategoryItems
export interface FetchCategoryItemsResult {
  items: {
    data: ItemResponse[];
    links: {
      total: number;
      first_page_url: string;
      next_page_url: string | null;
      prev_page_url: string | null;
      last_page_url: string;
      last_page: number;
      current_page: number;
    };
  };
  currency: string;
  restaurant: {
    uuid: string;
    id: number;
  };
}

// Fetch categories
export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<CategoriesResponse>(
    "8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c"
  );
  return data.data.categories ?? [];
};

// Fetch items of a specific category: returns an object with the items array, currency, and restaurant.
export const fetchCategoryItems = async (
  categoryId: string
): Promise<FetchCategoryItemsResult> => {
  const { data } = await api.get<ItemsResponse>(
    `8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`
  );
  return {
    items: data.data.items,
    currency: data.data.currency,
    restaurant: data.data.restaurant,
  };
};
