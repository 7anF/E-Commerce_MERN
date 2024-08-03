import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import { ExtendedRequest } from "../types/extendedRequest";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/my-orders", validateJWT, async (req: ExtendedRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { data, statusCode } = await getMyOrders({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
