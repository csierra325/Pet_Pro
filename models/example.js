module.exports = function(sequelize, DataTypes) {
  var TodoTable = sequelize.define("TodoTable", {
    todo: {
      type: DataTypes.STRING
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATE
    }
  });
  return TodoTable;
};
