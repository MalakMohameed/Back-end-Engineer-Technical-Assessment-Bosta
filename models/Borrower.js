const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Borrower = sequelize.define("Borrower", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true 
    }
  },
  registeredDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
    field: 'registered_date'    
  }
}, {
  tableName: 'borrowers',
  //underscored: true 
}, {
  indexes: [
    { fields: ['due_date'] },
    { fields: ['status'] }
  ],
  tableName: 'borrowings',
  underscored: true
});
module.exports = Borrower;
