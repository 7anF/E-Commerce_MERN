import { NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendedRequest } from "../types/extendedRequest";

const validateJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authoraizationHeader = req.get('authorization');

    if(!authoraizationHeader) {
        res.status(403).send('Authorization header was not provided');
        return;
    };

    const token = authoraizationHeader.split(" ")[1];

    if(!token) {
        res.status(403).send('Bearer token not found!');
        return;
    };

    jwt.verify(token, process.env.JWT_SECRET || '', async (err, payload) => {
        if(err) {
            res.status(403).send('Invalid token');
            return;
        };

        if(!payload) {
            res.status(403).send("Invalid token payload");
            return;
        };

        const userPayload = payload as {
            firstName: string;
            lastName: string;
            email: string;
        };

        // Fetch user from database based on the payload
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });
};

export default validateJWT;