import { useState } from "react";
import { CartContext } from "./CartContext";

// Cart item shape:
// { id, serviceId, serviceName, priceCents, carModel, carPlate, date, notes }
export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItems = (newItems) => setItems((prev) => [...prev, ...newItems]);
  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItems, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
