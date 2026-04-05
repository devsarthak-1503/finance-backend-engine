const express = require("express");
const router = express.Router();

const {
    createTransaction,
    getTransactions,
    deleteTransaction,
} = require("../controllers/transactionController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// Create → admin + analyst
router.post("/", protect, authorize("admin", "analyst"), createTransaction);

// View → all
router.get("/", protect, authorize("admin", "analyst", "viewer"), getTransactions);

// Delete → admin only
router.delete("/:id", protect, authorize("admin"), deleteTransaction);

module.exports = router;
