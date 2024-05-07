const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
    id: {
      type:DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Descripcion: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    Plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    Imagen:{
      type: DataTypes.STRING, 
      allowNull: true 
    },

    Fechadelanzamiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

   
  }, { timestamps: false });

};
