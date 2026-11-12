import express from 'express';
import supplierRouter from './routes/supplier.routes.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

app.use(express.json());
app.use('/api/suppliers', supplierRouter);

app.use(errorHandler);

// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

export default app;