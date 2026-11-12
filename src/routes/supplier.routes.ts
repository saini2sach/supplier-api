import express from 'express';
import { validateSupplier } from '../middlewares/validate.js';
import { createSupplierSchema, updateSupplierSchema } from '../schemas/supplier.schema.js';
import { createSupplierController, deleteSupplierController, getAllSupplierController, getSupplierController, updateSupplierController } from '../controllers/supplier.controller.js';

const router = express.Router();


router.post('/', validateSupplier(createSupplierSchema), createSupplierController);

router.patch('/:id', validateSupplier(updateSupplierSchema), updateSupplierController);

router.get('/', getAllSupplierController);

router.get('/:id', getSupplierController);

router.delete('/:id', deleteSupplierController)

export default router;