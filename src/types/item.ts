export interface Item {
  id: number;
  image: string;
  name: string;
  description: string;
  currency: string;
  price: number;
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
}
