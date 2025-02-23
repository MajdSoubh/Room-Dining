// components/ItemDetailModal.tsx
import { CircleX, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { ScrollContainer } from "../ScrollContainer";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";

export const ItemDetailModal = ({ item, onClose }) => {
  console.log(item);
  const { insertOrUpdateItem, getItemQuantity } = useCart();
  const [orderDetails, setOrderDetails] = useState({ quantity: 0 });
  const { addToast } = useToast();

  const handleIncreaseQuantity = () => {
    setOrderDetails((prevOrder) => ({
      ...prevOrder,
      quantity: prevOrder.quantity + 1,
    }));
  };
  const handleDecreaseQuantity = () => {
    if (orderDetails.quantity > 0) {
      setOrderDetails((prevOrder) => ({
        ...prevOrder,
        quantity: prevOrder.quantity - 1,
      }));
    }
  };

  const getTotalPrice = () => {
    let total = orderDetails.quantity * item.price;
    return total;
  };
  const handleAddToCart = () => {
    console.log("ss");
    addToast("Item saved successfully!", "success");
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
                    onClick={handleDecreaseQuantity}
                    className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-2 text-primary hover:scale-110 transition-transform"
                  >
                    <Minus className="size-5" />
                  </button>
                  <input
                    type="text"
                    value={orderDetails.quantity}
                    className="px-8 py-1 border-2 text-center text-primary border-primary focus:border-2 focus:outline-0 focus:ring focus:ring-primary/40 rounded-md w-28 transition-all"
                  />
                  <button
                    onClick={handleIncreaseQuantity}
                    className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-2 text-primary hover:scale-110 transition-transform"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </div>

              {/* Extra Options */}
              {item.extrasWithOptions?.length > 0 && (
                <div className="flex w-full flex-col gap-4 items-center">
                  {item.extrasWithOptions.map((extraSection) => {
                    return (
                      <div
                        key={extraSection.extra_id}
                        className="w-full flex flex-col gap-4 items-center"
                      >
                        {/* Section Name */}
                        {extraSection.is_active && (
                          <>
                            <div className="bg-background-primary/70 w-full rounded text-black/80 text-md px-3 py-2 font-[500] flex justify-between">
                              <div>{extraSection.name}</div>
                              {extraSection.is_required && (
                                <span className="text-red-700">Required</span>
                              )}
                            </div>
                            {extraSection.option.map((option) => {
                              return (
                                <div
                                  key={option.id}
                                  className="w-full px-2 text-black/80 flex justify-between"
                                >
                                  <span>{option.name}</span>
                                  <div>
                                    {option.option_has_price && (
                                      <span>
                                        + {option.currency} {option.price}
                                      </span>
                                    )}
                                    {extraSection.extra_type_name ===
                                      "radio" && <input type="radio" />}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

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
