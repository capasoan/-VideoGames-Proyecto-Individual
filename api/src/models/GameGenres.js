const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('GameGenre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    VideogamesId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Videogames',
        key: 'id',
      },
      foreignKey: true,
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genres',
        key: 'id',
      },
      foreignKey: true,
    },
  }, { timestamps: false });
};
