import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetSuppliers } from "../services/supplier.service.js";

describe("Supplier API", () => {

    beforeEach(() => {
        resetSuppliers();
    });

    it("should create a supplier successfully", async () => {

        const response = await request(app)
            .post("/api/suppliers")
            .send({
                name: "ABC Technologies",
                email: "abc@example.com"
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("ABC Technologies");
        expect(response.body.email).toBe("abc@example.com");
        expect(response.body.status).toBe("active");
    });

    it("should return an empty supplier list initially", async () => {
        const response = await request(app)
            .get("/api/suppliers");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it("should reject supplier creation with invalid email", async () => {

        const response = await request(app)
            .post("/api/suppliers")
            .send({
                name: "ABC Technologies",
                email: "asdfds"
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Validation failed");

        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: "email",
                    message: "Invalid email address"
                })
            ])
        );
    });

    it('should return supplier by id', async () => {

        const createResp = await request(app)
            .post("/api/suppliers")
            .send({
                name: "ABC Technologies",
                email: "abc@clear.in"
            });

        const resp = await request(app)
            .get('/api/suppliers/' + createResp.body.id)

        expect(resp.status).toBe(200);
        expect(resp.body.name).toBe("ABC Technologies");
        expect(resp.body.email).toBe("abc@clear.in");
        expect(resp.body.status).toBe("active");
        expect(resp.body.id).toBe(createResp.body.id);

    });

    it('should show supplier not found with wrong supplier id', async () => {

        const resp = await request(app)
            .get('/api/suppliers/999')

        expect(resp.status).toBe(404);
        expect(resp.body.message).toBe('Supplier not found')
    });

    it('should update supplier with given name', async () => {
        const createresp = await request(app)
            .post('/api/suppliers')
            .send({
                name: 'ABC',
                email: 'abc@clear.in'
            });

        expect(createresp.status).toBe(201);

        const resp = await request(app)
            .patch('/api/suppliers/' + createresp.body.id)
            .send({
                name: 'XYZ'
            });

        expect(resp.status).toBe(200);
        expect(resp.body.name).toBe('XYZ');
        expect(resp.body.email).toBe('abc@clear.in')
    });

    it('should delete supplier with given supplier id', async () => {

        const createResp = await request(app)
            .post('/api/suppliers')
            .send({
                name: 'ABC',
                email: 'anbsd@sdf.sdf'
            })

        expect(createResp.status).toBe(201);

        const resp = await request(app)
            .delete('/api/suppliers/' + createResp.body.id);


        expect(resp.status).toBe(200);

        const nextResp = await request(app)
            .get('/api/suppliers/' + createResp.body.id);

        expect(nextResp.status).toBe(404)
    });

    it('should reject update when empty request body', async () => {

        const createResp = await request(app)
            .post('/api/suppliers')
            .send({
                name: 'ABC',
                email: 'anbsd@sdf.sdf'
            })


        const resp = await request(app)
            .patch('/api/suppliers/' + createResp.body.id)
            .send({})

        expect(resp.status).toBe(400);
    })

    it('should reject update when invalid email pass in body', async () => {

        const createResp = await request(app)
            .post('/api/suppliers')
            .send({
                name: 'ABC',
                email: 'anbsd@sdf.sdf'
            })


        const resp = await request(app)
            .patch('/api/suppliers/' + createResp.body.id)
            .send({
                email: 'sjdksad'
            })

        expect(resp.status).toBe(400);
    })

    it('should reject delete when invalid id pass in body', async () => {
        const resp = await request(app)
            .delete('/api/suppliers/abc')

        expect(resp.status).toBe(400);
    })

});