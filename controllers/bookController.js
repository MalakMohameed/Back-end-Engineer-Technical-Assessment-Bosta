const { Book } = require("../models");
const { Op } = require("sequelize");

exports.addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) { next(err); }
};

exports.updateBook = async (req, res, next) => {
  try {
    const [updated] = await Book.update(req.body, { where: { id: req.params.id } });
    if (!updated) throw new Error("Book not found");
    res.json({ message: "Book updated successfully" });
  } catch (err) { next(err); }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) throw new Error("Book not found");
    res.json({ message: "Book deleted" });
  } catch (err) { next(err); }
};

exports.listBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) { next(err); }
};

exports.searchBooks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { author: { [Op.like]: `%${q}%` } },
          { isbn: q }
        ]
      }
    });
    res.json(books);
  } catch (err) { next(err); }
};
