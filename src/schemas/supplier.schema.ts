import { z } from 'zod';

const supplierSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.email()
})


export const createSupplierSchema = supplierSchema;

export const updateSupplierSchema = supplierSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: 'At least one field must be provided' }
    );