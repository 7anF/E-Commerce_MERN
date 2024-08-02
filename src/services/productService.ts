import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
};

export const seedInitialProducts = async () => {
    try {
        const products = [
            { title: "Product 1", image: "image1.jpg", price: 10, stock: 100},
            { title: "Product 2", image: "image2.jpg", price: 10, stock: 100},
            { title: "Product 3", image: "image3.jpg", price: 10, stock: 100},
            { title: "Product 4", image: "image4.jpg", price: 10, stock: 100},
            { title: "Product 5", image: "image5.jpg", price: 10, stock: 100},
            { title: "Product 6", image: "image6.jpg", price: 10, stock: 100},
            { title: "Product 7", image: "image7.jpg", price: 10, stock: 100},
            { title: "Product 8", image: "image8.jpg", price: 10, stock: 100},
            { title: "Product 9", image: "image9.jpg", price: 10, stock: 100},
            { title: "Product 10", image: "image10.jpg", price: 10, stock: 100},
        ];
    
        const existingProducts = await getAllProducts();
    
        if(!existingProducts.length) { await productModel.insertMany(products)};
    } catch(err) {
        console.log("Cannot see database", err);
    }
};