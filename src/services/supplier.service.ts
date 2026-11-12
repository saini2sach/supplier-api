import { AppError } from "../errors/app-error.js";
import type { Supplier, UpdateSupplierInput } from "../types/supplier.js";

const supplierList: Supplier[] = [];

let nextId = 1;

export const createSupplier = (name: string, email: string): Supplier => {
    const newSupplier: Supplier = {
        name,
        email,
        createdAt: new Date(),
        status: 'active',
        id: nextId++
    }

    supplierList.push(newSupplier);

    return newSupplier;
}

export const getAllSuppliers = () => {
    return [...supplierList];
}

export const getSupplierById = (supplierId: number) => {
    let item = supplierList.find(item => item.id === supplierId) ?? null;

    if (!item) {
        throw new AppError(404, 'Supplier not found')
    }
    return item;
}


export const updateSupplier = (supplierId: number, reqBody: UpdateSupplierInput): Supplier | null => {

    const index = supplierList.findIndex(
        item => item.id === supplierId
    );

    if (index === -1) {
        throw new AppError(404, 'Supplier not found')
    }
    supplierList[index] = {
        ...supplierList[index],
        ...reqBody
    } as Supplier;

    return supplierList[index];
}


export const deleteSupplier = (supplierId: number): Supplier | null => {
    let currIndex = supplierList.findIndex(item => item.id === supplierId);

    if (currIndex === -1) {
        throw new AppError(404, 'Supplier not found')
    }

    let deletedItemList = supplierList.splice(currIndex, 1);

    return deletedItemList[0] || null;
}