import express from 'express';
import { addItemRoCart, getActiveCartForUser } from '../services/cartService';
import validateJWT from '../middlewares/validateJWT';
import { ExtendedRequest } from '../types/extendedRequest';

const rotuer = express.Router();

rotuer.get(
    '/', 
    validateJWT, 
    async (req: ExtendedRequest, res) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
});

rotuer.post('/items', validateJWT, async (req: ExtendedRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemRoCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
});

export default rotuer;