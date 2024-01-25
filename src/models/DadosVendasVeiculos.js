const Sequelize = require("sequelize");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");

const dadosVendasCarrosSchema = (sequelize) => {
  const DadosVendasVeiculos = database.define(
    "DadosVendasVeiculos",
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
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "dados_vendas_veiculos",
      underscored: true,
      timestamps: false,
    }
  );
  return DadosVendasVeiculos;
};

module.exports = dadosVendasCarrosSchema;
