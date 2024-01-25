"use strict";

{
  import("sequelize-cli").Migration;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dados_vendas_veiculos",
      {
        id_marca_: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        data: {
          type: Sequelize.DATEONLY,
        },
        vendas: {
          type: Sequelize.DECIMAL,
        },
        valor_do_veiculo: {
          type: Sequelize.INTEGER,
        },
        nome: {
          type: Sequelize.STRING(11),
        },
      }
  ,
      {
        tableName: "dados_vendas_veiculos",
        underscored: true,
        timestamps: false,
      }
  );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dados_vendas_veiculos");
  },
};
