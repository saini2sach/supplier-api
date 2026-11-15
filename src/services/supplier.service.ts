import { AppError } from "../errors/app-error.js";
import { createSupplierDb, deleteSupplierDb, getAllSuppliersDb, getSupplierByIdDb, updateSupplierDb } from "../repositories/supplier.repository.js";
import type { Supplier, UpdateSupplierInput } from "../types/supplier.js";

export const createSupplier = (name: string, email: string): Promise<Supplier | null> => {
    return createSupplierDb(name, email);
}

export const getAllSuppliers = () => {
    return getAllSuppliersDb();
}

export const getSupplierById = async (supplierId: number) => {

    const result = await getSupplierByIdDb(supplierId);

    if (!result) {
        throw new AppError(404, 'Supplier not found')
    }
    return result;
}


export const updateSupplier = async (supplierId: number, reqBody: UpdateSupplierInput): Promise<Supplier> => {

    const result = await updateSupplierDb(supplierId, reqBody);

    if (!result) {
        throw new AppError(404, 'Supplier not found');
    }

    return result;
}


export const deleteSupplier = async (supplierId: number): Promise<Supplier> => {

    const result = await deleteSupplierDb(supplierId);

    if (!result) {
        throw new AppError(404, 'Supplier not found');
    }

    return result;
}



/*

const supplierList: Supplier[] = [];

let nextId = 1;

export const resetSuppliers = () => {
    supplierList.length = 0;
    nextId = 1;
};

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
*/