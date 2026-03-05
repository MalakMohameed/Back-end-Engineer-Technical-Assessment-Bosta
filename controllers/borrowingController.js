const { Book, Borrower, Borrowing } = require("../models");
const { Op } = require("sequelize");
const { Parser } = require("json2csv");

exports.checkoutBook = async (req, res, next) => {
  try {
    const { BookId, BorrowerId } = req.body;
    const book = await Book.findByPk(BookId);

    if (!book || book.availableQuantity <= 0) {
      return res.status(400).json({ message: "Book is out of stock" });
    }

    const checkout = await Borrowing.create({
      BookId,
      BorrowerId,
      checkoutDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14-day limit
    });

    await book.decrement('availableQuantity');
    res.status(201).json(checkout);
  } catch (err) { next(err); }
};

exports.returnBook = async (req, res, next) => {
  try {
    const record = await Borrowing.findByPk(req.params.id);
    if (!record || record.status === 'returned') throw new Error("Invalid record");

    record.status = 'returned';
    record.returnDate = new Date();
    await record.save();

    const book = await Book.findByPk(record.BookId);
    await book.increment('availableQuantity');
    res.json({ message: "Book returned" });
  } catch (err) { next(err); }
};

exports.currentBorrowings = async (req, res, next) => {
  try {
    const list = await Borrowing.findAll({
      where: { BorrowerId: req.params.borrowerId, status: 'borrowed' },
      include: [Book]
    });
    res.json(list);
  } catch (err) { next(err); }
};

exports.listOverdue = async (req, res, next) => {
  try {
    const overdue = await Borrowing.findAll({
      where: { status: 'borrowed', dueDate: { [Op.lt]: new Date() } },
      include: [Book, Borrower]
    });
    res.json(overdue);
  } catch (err) { next(err); }
};

exports.exportOverdueCSV = async (req, res, next) => {
  try {
    const startOfLastMonth = new Date();
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    startOfLastMonth.setDate(1);

    const data = await Borrowing.findAll({
      where: { 
        status: 'borrowed', 
        dueDate: { [Op.lt]: new Date(), [Op.gte]: startOfLastMonth } 
      },
      include: [Book, Borrower],
      raw: true
    });

    const fields = ['Book.title', 'Borrower.name', 'dueDate'];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('overdue_last_month.csv');
    res.send(csv);
  } catch (err) { next(err); }
};

exports.exportAllBorrowingsCSV = async (req, res, next) => {
  try {
    const data = await Borrowing.findAll({
      include: [Book, Borrower],
      raw: true
    });

    const fields = [
      'Book.title', 
      'Borrower.name', 
      'checkoutDate',
      'dueDate',     
      'status'
    ];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('all_borrowings_report.csv');
    res.send(csv);
  } catch (err) { next(err); }
};
