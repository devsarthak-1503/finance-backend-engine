const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
//routes import
const transactionRoutes = require('./routes/transactionRoutes');
const summaryRoutes = require("./routes/summaryRoutes");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Finance API is operational' });
});

// Routes
app.use('/api/v1/auth', authRoutes);
//transactions route mount
app.use('/api/v1/transactions', transactionRoutes);
app.use("/api/v1/summary", summaryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;
