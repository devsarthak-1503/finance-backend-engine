const Transaction = require("../models/Transaction");
const validateTransaction = require("../utils/validateTransaction");

/**
 * Create Transaction
 */
exports.createTransaction = async (req, res) => {
    try {
        const error = validateTransaction(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }

        const transaction = await Transaction.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create transaction",
        });
    }
};

/**
 * Get Transactions (with filters)
 */
exports.getTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        const filter = {
            user: req.user.id,
            isDeleted: false,
        };

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const transactions = await Transaction.find(filter).sort({
            date: -1,
        });

        res.json({
            success: true,
            data: transactions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
        });
    }
};

/**
 * Delete Transaction (Soft Delete)
 */
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction || transaction.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        transaction.isDeleted = true;
        await transaction.save();

        res.json({
            success: true,
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
        });
    }
};
