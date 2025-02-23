export interface Item {
  id: number;
  image: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  display_name: string;
  restaurant: {
    uuid: string;
  };
}
export interface ItemResponse {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  display_name: string;
}
