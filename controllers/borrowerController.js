const { Borrower } = require("../models");

exports.registerBorrower = async (req, res, next) => {
  try {
    const borrower = await Borrower.create(req.body);
    res.status(201).json(borrower);
  } catch (err) { next(err); }
};

exports.updateBorrower = async (req, res, next) => {
  try {
    const [updated] = await Borrower.update(req.body, { where: { id: req.params.id } });
    if (!updated) throw new Error("Borrower not found");
    res.json({ message: "Borrower updated" });
  } catch (err) { next(err); }
};

exports.deleteBorrower = async (req, res, next) => {
  try {
    const deleted = await Borrower.destroy({ where: { id: req.params.id } });
    res.json({ message: "Borrower removed" });
  } catch (err) { next(err); }
};

exports.listBorrowers = async (req, res, next) => {
  try {
    const borrowers = await Borrower.findAll();
    res.json(borrowers);
  } catch (err) { next(err); }
};
