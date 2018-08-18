module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    routeName: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    species: DataTypes.STRING
  });

  Pet.associate = function(models) {
    Pet.belongsTo(models.User, {
      foreign: {
        allowNull: false
      }
    });
  };

  return Pet;
};
