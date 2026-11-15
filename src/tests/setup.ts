import dotenv from "dotenv";
import { beforeEach, afterAll } from "vitest";

dotenv.config({
    path: ".env.test",
    override: true
});

const { pool } = await import("../config/database.js");

beforeEach(async () => {
    if (process.env.DB_NAME !== "supplier_test_db") {
        throw new Error("Refusing to clean a non-test database");
    }

    await pool.query(
        "TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE"
    );
});

afterAll(async () => {
    await pool.end();
});