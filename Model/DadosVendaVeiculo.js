const Sequelize = require("sequelize");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");

const DadosVendasVeiculos = database.define(
  "DadosVendasVeiculos",
  {
    id_venda: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    data: {
      type: Sequelize.DATEONLY,
    },
    vendas: {
      type: Sequelize.INTEGER,
    },
    valor_do_veiculo: {
      type: Sequelize.INTEGER,
    },
    nome: {
      type: Sequelize.STRING,
    },
    id_marca: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "dados_vendas_veiculos",
    underscored: true,
    timestamps: false,
  }
);

DadosVendasVeiculos.associate = (models) => {
  DadosVendasVeiculos.belongsTo(DadosVendasVeiculos, {
    foreignKey: "id_marca",
    as: "dados_vendas_veiculos",
  });

  return DadosVendasVeiculos;
};

module.exports = { DadosVendasVeiculos };
