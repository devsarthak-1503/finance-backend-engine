const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Root Route (IMPORTANT for live demo)
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Finance Backend API is live ...",
        endpoints: {
            health: "/health",
            auth: "/api/v1/auth",
            transactions: "/api/v1/transactions",
            summary: "/api/v1/summary"
        }
    });
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Finance API is operational'
    });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/summary', summaryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;
