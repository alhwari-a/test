import React from "react";
import { useCart } from "../hooks/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    calculateTotalPrice,
    clearCart,
    clearProduct,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/checkout");
    } else {
      alert("Please log in to proceed to checkout.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold text-[#fa5990] mb-6 border-b-2 border-[#300a3a] pb-2">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 rounded-lg">
          <p className="text-xl text-[#fa5990] opacity-80">
            Your cart is empty
          </p>
          <p className="text-sm text-[#fa5990] opacity-60 mt-2">
            Explore our products and add some items!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="shadow-lg rounded-lg p-4 flex items-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="flex-shrink-0 mr-6">
                <img
                  src={`http://localhost:4000/${item.mainImage}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border-2"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[#fa5990]">
                  {item.name}
                </h3>
                <p className="text-[#fa5990] text-sm opacity-80">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-3 mx-6">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="text-[#fa5990] p-2 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Minus size={16} />
                </button>

                <span className="text-[#fa5990] font-semibold w-8 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="text-[#fa5990] p-2 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-lg font-bold text-[#fa5990]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="text-[#fa5990] hover:opacity-80 transition-opacity"
                  onClick={() => clearProduct(item.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="rounded-lg p-4 flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold text-[#fa5990]">Total Price</h3>
            <p className="text-2xl font-extrabold text-[#fa5990]">
              ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>

          <div className="mt-6 text-center flex justify-center gap-4">
            <button
              onClick={handleCheckout}
              className="bg-[#2d0939] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold shadow-md"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="bg-[#fa5990] text-[#2d0939] px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold shadow-md"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
