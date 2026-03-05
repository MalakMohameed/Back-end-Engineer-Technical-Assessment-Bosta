const express = require("express");
const router = express.Router();
const borrowingController = require("../controllers/borrowingController");

router.post("/checkout", borrowingController.checkoutBook);
router.post("/return/:id", borrowingController.returnBook);

router.get("/current/:borrowerId", borrowingController.currentBorrowings);
router.get("/overdue", borrowingController.listOverdue);

router.get("/export/overdue", borrowingController.exportOverdueCSV);
router.get("/export/all", borrowingController.exportAllBorrowingsCSV);


module.exports = router;
