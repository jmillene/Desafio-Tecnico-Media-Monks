"use strict";
const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nome_marcas_veiculos",
      {
        id_marca_: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        marca:{
          type: Sequelize.STRING(11)
        }
      }
  ,
      {
        tableName: "nome_marcas_veiculos",
        underscored: true,
        timestamps: false,
      }
  );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("nome_marcas_veiculos");
  },
};
