const Book = require("./Book");
const Borrower = require("./Borrower");
const Borrowing = require("./Borrowing");

Borrower.hasMany(Borrowing, { foreignKey: 'BorrowerId' });
Borrowing.belongsTo(Borrower, { foreignKey: 'BorrowerId' });

Book.hasMany(Borrowing, { foreignKey: 'BookId' });
Borrowing.belongsTo(Book, { foreignKey: 'BookId' });

module.exports = {
  Book,
  Borrower,
  Borrowing
};
