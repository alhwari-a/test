import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartNavRefresh, setCartNavRefresh] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("Carts");

    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);

      const totalQuantity = parsedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartNavRefresh(totalQuantity);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("Carts", JSON.stringify(cartItems));
    }

    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartNavRefresh(totalQuantity);
  }, [cartItems]);

  const addToCart = (product) => {
    const updatedCart = [...cartItems];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("Carts");
    setCartNavRefresh(0);
  };

  const clearProduct = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("Carts", JSON.stringify(updatedCart));
    const totalQuantity = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartNavRefresh(totalQuantity);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartNavRefresh,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        clearProduct,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
