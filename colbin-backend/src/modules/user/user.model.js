const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    lastLoggedAt: { // Add this new field
      type: DataTypes.DATE,
      allowNull: true, // It can be null initially
      defaultValue: null // Set a default value
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  
  return User;
};