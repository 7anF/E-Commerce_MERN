import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

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

interface IAddItemToCart {
    userId: string;
    productId: any,
    quantity: number;
};

export const addItemRoCart = async ({ userId, productId, quantity }: IAddItemToCart) => {
    const cart = await getActiveCartForUser({ userId });

    // Does the item exist in the cart
    const existsInCart = cart.items.find(
        (p) => p.product.toString() === productId
    );

    if(existsInCart) return { data: 'Item already exist in cart', statusCode: 400 };

    const product = await productModel.findById(productId);

    if(!product) return { data: 'Product not found', statusCode: 400 };

    if(product.stock < quantity) return { data: 'Low stock for item', statusCode: 400 }

    cart.items.push({ 
        product: productId, 
        unitPrice: product.price, 
        quantity: quantity 
    });

    // Update the total amount 
    cart.totalAmount += product.price * quantity;

    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 201 };
};

interface IUpadteItemInCart {
    userId: string;
    productId: any,
    quantity: number;
};


export const upadteItemInCart = async ({ productId, quantity, userId }: IUpadteItemInCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existsInCart = cart.items.find(
        (p) => p.product.toString() === productId
    );

    if(!existsInCart) return { data: "Item does not exist in cart!", statusCode: 400};
    
    const product = await productModel.findById(productId);
    if(!product) return { data: 'Product not found', statusCode: 400 };
    if(product.stock < quantity) return { data: 'Low stock for item', statusCode: 400 }

    // Calculate the total amount for the cart
    existsInCart.quantity = quantity;
    const OtherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

    let total = OtherCartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);

    total += existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount = total;
    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 201 };
};