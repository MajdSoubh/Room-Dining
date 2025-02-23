import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: CartItem, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (
    itemId: number,
    operation: "increment" | "decrement" | "set",
    quantity: number
  ) => void;
  insertOrUpdateItem: (item: CartItem, quantity: number) => void;
  getItemQuantity: (itemId: number) => number;
  getTotalPrice: () => string;
  getTotalItems: () => number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem, quantity: number = 1) => {
    if (quantity === 0) return;
    setItems([...items, { ...item, quantity }]);
  };

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const updateItemQuantity = (
    itemId: number,
    operation: "increment" | "decrement" | "set",
    value?: number
  ) => {
    setItems(
      (prevItems) =>
        prevItems
          .map((item) => {
            if (item.id === itemId) {
              let newQuantity = item.quantity;
              switch (operation) {
                case "increment":
                  newQuantity += 1;
                  break;
                case "decrement":
                  newQuantity -= 1;
                  break;
                case "set":
                  newQuantity = value!;
                  break;
              }

              return newQuantity > 0
                ? { ...item, quantity: newQuantity }
                : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const insertOrUpdateItem = (item: CartItem, quantity: number) => {
    if (quantity < 0) return;
    const existing = items.find((_item) => _item.id === item.id);
    if (existing) {
      updateItemQuantity(item.id, "set", quantity);
    } else {
      addItem(item, quantity);
    }
  };

  const getItemQuantity = (itemId: number) => {
    return items.find((item) => item.id === itemId)?.quantity || 0;
  };
  const getTotalPrice = () =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const getTotalItems = () =>
    items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        insertOrUpdateItem,
        getItemQuantity,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
