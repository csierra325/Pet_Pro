module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    todo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATE
    }
  });

  Todo.associate = function(models) {
    Todo.belongsTo(models.Pet, {
      foreign: {
        allowNull: false
      }
    });
  };
  return Todo;
};
