import express from "express";
import {
  addItemRoCart,
  checkout,
  clearCart,
  deleteItemInCart,
  getActiveCartForUser,
  upadteItemInCart,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId, ispopulated: true });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemRoCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.put("/items", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await upadteItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendedRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
  }
);

router.delete("/", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
