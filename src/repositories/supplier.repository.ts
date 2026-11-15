import { pool } from "../config/database.js";
import { Supplier, UpdateSupplierInput } from "../types/supplier.js";

type SupplierDbRow = {
    id: number;
    name: string;
    email: string;
    status: "active" | "inactive";
    created_at: Date;
};

const mapSupplier = (row: SupplierDbRow): Supplier => ({
    id: row.id,
    name: row.name,
    email: row.email,
    status: row.status,
    createdAt: row.created_at
});


export const getAllSuppliersDb = async (): Promise<Supplier[]> => {
    const result = await pool.query<SupplierDbRow>(
        "SELECT * FROM suppliers ORDER BY id ASC"
    );

    return result.rows.map(mapSupplier);
};

export const getSupplierByIdDb = async (id: number): Promise<Supplier | null> => {
    const result = await pool.query<SupplierDbRow>(
        `Select * from suppliers where id = $1`, [id]
    )

    const row = result.rows[0];

    return row ? mapSupplier(row) : null;
}

export const createSupplierDb = async (name: string, email: string): Promise<Supplier | null> => {
    const result = await pool.query<SupplierDbRow>(
        `insert into suppliers (name, email) values ($1, $2) RETURNING *`, [name, email]
    )

    const row = result.rows[0];

    return row ? mapSupplier(row) : null;
}


export const updateSupplierDb = async (
    id: number,
    data: UpdateSupplierInput
): Promise<Supplier | null> => {
    const updates: string[] = [];
    const values: unknown[] = [];

    if (data.name !== undefined) {
        values.push(data.name);
        updates.push(`name = $${values.length}`);
    }

    if (data.email !== undefined) {
        values.push(data.email);
        updates.push(`email = $${values.length}`);
    }

    if (updates.length === 0) {
        throw new Error("No fields provided for update");
    }

    values.push(id);

    const result = await pool.query<SupplierDbRow>(
        `UPDATE suppliers
         SET ${updates.join(", ")}
         WHERE id = $${values.length}
         RETURNING *`,
        values
    );

    const row = result.rows[0];

    return row ? mapSupplier(row) : null;
};

export const deleteSupplierDb = async (id: number): Promise<Supplier | null> => {
    const result = await pool.query<SupplierDbRow>(
        `delete from suppliers where id = $1 returning *`, [id]
    )

    const row = result.rows[0];

    return row ? mapSupplier(row) : null;
}