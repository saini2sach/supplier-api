import type { NextFunction, Request, Response } from "express";
import type z from "zod";


export const validateSupplier = (schema: z.ZodType) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            })
        }

        req.body = result.data; // for normalise request body
        next()
    }
}