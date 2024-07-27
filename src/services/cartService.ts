import { cartModel } from "../models/cartModel";

interface ICreateCartForUser {
    userId: string;
};

const createCartForUser = async ({ userId }: ICreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    return await cart.save();
};

interface IGetActiveCartForUser {
    userId: string;
};

export const getActiveCartForUser = async ({ userId }: IGetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    
    if(!cart) cart = await createCartForUser({ userId });

    return cart;
};