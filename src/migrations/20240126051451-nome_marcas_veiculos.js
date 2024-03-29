"use strict"
module.exports = {
 up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "nome_marcas_veiculos",
      {
        id_marca: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        marca: {
          type: Sequelize.STRING(11),
        },
      },
      {
        tableName: "nome_marcas_veiculos",
        underscored: true,
        timestamps: false,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("nome_marcas_veiculos")
  },
}