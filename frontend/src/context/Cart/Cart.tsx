import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface ICartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<ICartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
});

export const useCart = () => useContext(CartContext);
