import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface ICartContextType {
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
};

export const CartContext = createContext<ICartContextType>({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {}
});

export const useCart = () => useContext(CartContext);