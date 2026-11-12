import z from 'zod';
import type { createSupplierSchema, updateSupplierSchema } from '../schemas/supplier.schema.js';

export type Supplier = {
    id: number;
    name: string;
    email: string;
    status: "active" | "inactive";
    createdAt: Date;
};



export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;