import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";
import { IorderItem, orderModel } from "../models/orderModel";

interface ICreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: ICreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  return await cart.save();
};

interface IGetActiveCartForUser {
  userId: string;
  ispopulated?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  ispopulated,
}: IGetActiveCartForUser) => {
  let cart;

  if (ispopulated) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }

  if (!cart) cart = await createCartForUser({ userId });

  return cart;
};

interface IAddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemRoCart = async ({
  userId,
  productId,
  quantity,
}: IAddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Does the item exist in the cart
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart)
    return { data: "Item already exist in cart", statusCode: 400 };

  const product = await productModel.findById(productId);

  if (!product) return { data: "Product not found", statusCode: 400 };

  if (product.stock < quantity)
    return { data: "Low stock for item", statusCode: 400 };

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });

  // Update the total amount
  cart.totalAmount += product.price * quantity;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, ispopulated: true }),
    statusCode: 201,
  };
};

interface IUpadteItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const upadteItemInCart = async ({
  productId,
  quantity,
  userId,
}: IUpadteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart)
    return { data: "Item does not exist in cart!", statusCode: 400 };

  const product = await productModel.findById(productId);
  if (!product) return { data: "Product not found", statusCode: 400 };
  if (product.stock < quantity)
    return { data: "Low stock for item", statusCode: 400 };

  // Calculate the total amount for the cart
  const OtherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  existsInCart.quantity = quantity;

  let total = OtherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, ispopulated: true }),
    statusCode: 200,
  };
};

interface IDeleteItemInCart {
  userId: string;
  productId: any;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: IDeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart)
    return { data: "Item does not exist in cart !", statusCode: 400 };

  const OtherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = OtherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  cart.items = OtherCartItems;
  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface IClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: IClearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, ispopulated: true }),
    statusCode: 200,
  };
};

interface ICheckout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: ICheckout) => {
  if (!address) return { data: "Please add the address", statusCode: 400 };

  const cart = await getActiveCartForUser({ userId });
  const orderItems: IorderItem[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);

    if (!product) return { data: "Product not found", statusCode: 400 };

    const orderItem: IorderItem = {
      productTitle: product.title,
      productImage: product.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    userId,
    total: cart.totalAmount,
    address,
  });

  await order.save();

  // Update the cart status to completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};
