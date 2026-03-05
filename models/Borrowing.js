const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Borrowing = sequelize.define("Borrowing", {
  checkoutDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'checkout_date' 
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'due_date'
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'return_date'
  },
  status: {
    type: DataTypes.ENUM("borrowed", "returned"),
    defaultValue: "borrowed"
  }
}, {
  tableName: 'borrowings',
  //underscored: true 
});

module.exports = Borrowing;
