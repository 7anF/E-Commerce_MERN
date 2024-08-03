import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Product 1",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 2",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 3",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 4",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 5",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 6",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 7",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 8",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 9",
        image: "image1",
        price: 10,
        stock: 100,
      },
      {
        title: "Product 10",
        image:
          "https://www.shutterstock.com/image-photo/bangkok-thailand-hp-launch-new-notebook-2126914553",
        price: 10,
        stock: 100,
      },
    ];

    const existingProducts = await getAllProducts();

    if (!existingProducts.length) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.log("Cannot see database", err);
  }
};
