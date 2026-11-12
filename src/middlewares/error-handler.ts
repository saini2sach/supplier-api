import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Your implementation

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    else {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};