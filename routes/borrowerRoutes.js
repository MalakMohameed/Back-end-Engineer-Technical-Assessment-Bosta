const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

router.get("/", borrowerController.listBorrowers);
router.post("/", borrowerController.registerBorrower);
router.put("/:id", borrowerController.updateBorrower);
router.delete("/:id", borrowerController.deleteBorrower);

module.exports = router;
