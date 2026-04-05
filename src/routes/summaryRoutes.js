const express = require("express");
const router = express.Router();

const { getSummary } = require("../controllers/summaryController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Summary → analyst + admin
router.get("/", protect, authorize("admin", "analyst"), getSummary);

module.exports = router;
