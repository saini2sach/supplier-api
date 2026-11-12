import type { Request, Response, NextFunction } from "express";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplierById, updateSupplier } from "../services/supplier.service.js";
import { AppError } from "../errors/app-error.js";

export const createSupplierController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Your implementation here
    const { name, email } = req.body;

    try {

        const data = await createSupplier(name, email);
        return res.status(201).json(data);
    }
    catch (err) {
        next(err);
    }
};

export const getAllSupplierController = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const data = await getAllSuppliers();
        return res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }

}

export const getSupplierController = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(400, 'Invalid ID format');
        }

        const data = await getSupplierById(id);

        return res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}


export const updateSupplierController = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(400, 'Invalid ID format');
        }

        const data = await updateSupplier(id, req.body);

        return res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}

export const deleteSupplierController = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError(400, 'Invalid ID format');
        }

        const data = await deleteSupplier(id);

        return res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}