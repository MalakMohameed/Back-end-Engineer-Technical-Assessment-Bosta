const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'available_quantity'
  },
  shelfLocation: {
    type: DataTypes.STRING,
    field: 'shelf_location' 
  }
}, {
  tableName: 'books',
  //underscored: true 
}, {
  indexes: [
    { fields: ['title'] },
    { fields: ['author'] },
    { fields: ['isbn'] }
  ],
  tableName: 'books',
  underscored: true
});

module.exports = Book;
