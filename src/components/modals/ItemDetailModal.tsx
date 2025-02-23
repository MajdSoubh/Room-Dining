import { CircleX, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { ScrollContainer } from "../ScrollContainer";
import { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { FC } from "react";
import { Item } from "../../types/item";
import { ExtraOptions } from "../ExtraOption";

interface ExtraOption {
  id: number;
  name: string;
  option_has_price: boolean;
  price?: number;
  currency?: string;
}

interface ExtraSection {
  extra_id: number;
  name: string;
  is_active: boolean;
  is_required: boolean;
  extra_type_name: "radio" | "checkbox";
  option: ExtraOption[];
}

interface OrderDetails {
  quantity: number;
  extras: Array<{
    extra_id: number;
    option_id: number;
  }>;
}

interface ItemDetailModalProps {
  item: (Item & { extrasWithOptions?: ExtraSection[] }) | null;
  onClose: () => void;
}

export const ItemDetailModal: FC<ItemDetailModalProps> = ({
  item,
  onClose,
}) => {
  const { insertOrUpdateItem } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    quantity: 0,
    extras: [],
  });
  const { addToast } = useToast();

  useEffect(() => {
    return () => {
      setOrderDetails({ quantity: 0, extras: [] });
    };
  }, [item]);
  const updateQuantity = (
    operation: "increase" | "decrease" | "set",
    value?: number
  ) => {
    setOrderDetails((prev) => ({
      ...prev,
      quantity: calculateNewQuantity(prev.quantity, operation, value),
    }));
  };

  const calculateNewQuantity = (
    current: number,
    operation: "increase" | "decrease" | "set",
    value?: number
  ) => {
    switch (operation) {
      case "increase":
        return current + 1;
      case "decrease":
        return Math.max(0, current - 1);
      case "set":
        return Math.max(0, value || 0);
      default:
        return current;
    }
  };

  const handleExtraSelection = (
    extraId: number,
    optionId: number,
    type: "radio" | "checkbox"
  ) => {
    setOrderDetails((prev) => {
      let newExtras = [...prev.extras];

      if (type === "radio") {
        // Remove existing selections and insert new if radio buttion
        newExtras = newExtras.filter((e) => e.extra_id !== extraId);
        newExtras.push({ extra_id: extraId, option_id: optionId });
      } else {
        // Checkbox logic
        const existingIndex = newExtras.findIndex(
          (e) => e.extra_id === extraId && e.option_id === optionId
        );

        if (existingIndex > -1) {
          newExtras.splice(existingIndex, 1);
        } else {
          newExtras.push({ extra_id: extraId, option_id: optionId });
        }
      }

      return { ...prev, extras: newExtras };
    });
  };

  const getTotalPrice = () => {
    const basePrice = orderDetails.quantity * (item?.price || 0);
    const extrasPrice = orderDetails.extras.reduce((acc, extra) => {
      const option = item?.extrasWithOptions
        ?.find((e) => e.extra_id === extra.extra_id)
        ?.option.find((o) => o.id === extra.option_id);
      return acc + (option?.price || 0) * orderDetails.quantity;
    }, 0);
    return basePrice + extrasPrice;
  };

  const handleAddToCart = () => {
    if (!item) return;
    const _item = { id: item.id, price: item.price };
    insertOrUpdateItem(_item, orderDetails.quantity);

    addToast("Item saved successfully!", "success");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-all duration-300 items-center justify-center p-4
      ${item ? "visible" : "invisible"}`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300
          ${item ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Modal content */}
      <ScrollContainer
        className={`bg-white max-h-[90vh] rounded-lg p-6 max-w-md w-full relative transform
          transition-all duration-100 ease-out
          ${item ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        {item && (
          <>
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CircleX size={24} />
            </button>

            <div className="flex flex-col gap-4">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg transition-opacity duration-200"
              />
              {/* Title */}
              <h2 className="text-2xl font-bold transition-colors duration-200">
                {item.display_name}
              </h2>
              {/* Description */}
              <p className="text-gray-600 transition-colors duration-200">
                {item.description}
              </p>
              {/* Quantity Controls */}
              <div className="flex justify-between items-center transition-colors duration-200">
                <span className="text-md font-bold text-primary">
                  AED {item.price}
                </span>
                <div className="relative">
                  <button
                    onClick={() => updateQuantity("decrease")}
                    className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-2 text-primary hover:scale-110 transition-transform"
                  >
                    <Minus className="size-5" />
                  </button>
                  <input
                    type="text"
                    onChange={(event) => {
                      updateQuantity("set", parseInt(event?.target.value));
                    }}
                    value={orderDetails.quantity}
                    className="px-8 py-1 border-2 text-center text-primary border-primary focus:border-2 focus:outline-0 focus:ring focus:ring-primary/40 rounded-md w-28 transition-all"
                  />
                  <button
                    onClick={() => updateQuantity("increase")}
                    className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-2 text-primary hover:scale-110 transition-transform"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </div>

              {/* Extra Options */}
              {item.extrasWithOptions?.map((extraSection) => (
                <ExtraOptions
                  key={extraSection.extra_id}
                  extraSection={extraSection}
                  selectedExtras={orderDetails.extras}
                  onExtraSelect={handleExtraSelection}
                />
              ))}
              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                className="flex cursor-pointer gap-2 items-center bg-gradient-to-r from-[#00618e] to-[#0073b3] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <div className="flex gap-2 items-center justify-between w-full">
                  <div className="flex gap-2 items-center">
                    <Plus className="bg-white text-primary rounded size-4" />
                    <span>Add to Cart</span>
                  </div>
                  <div className="flex gap-2">
                    <div>{item.currency}</div>
                    <div>{getTotalPrice()}</div>
                  </div>
                </div>
              </button>
            </div>
          </>
        )}
      </ScrollContainer>
    </div>
  );
};
