import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./Cart";
import { CartItem } from "../../types/CartItem";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const addItemToCart = (productId: string) => {

    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalAmount,
                addItemToCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;