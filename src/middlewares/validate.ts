import type { NextFunction, Request, Response } from "express";
import type z from "zod";


export const validateSupplier = (schema: z.ZodType) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "Validation error",
                message: result.error
            })
        }

        req.body = result.data; // for normalise request body
        next()
    }
}