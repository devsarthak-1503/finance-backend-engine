const Transaction = require("../models/Transaction");

/**
 * @desc    Get financial summary (Income, Expense, Balance)
 * @route   GET /api/v1/summary
 * @access  Private
 */
exports.getSummary = async (req, res) => {
    try {
        const userId = req.user._id;

        // 🔹 Aggregate data
        const summary = await Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                        },
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                        },
                    },
                },
            },
        ]);

        // 🔹 Default values if no data
        const totalIncome = summary[0]?.totalIncome || 0;
        const totalExpense = summary[0]?.totalExpense || 0;

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch summary",
        });
    }
};
