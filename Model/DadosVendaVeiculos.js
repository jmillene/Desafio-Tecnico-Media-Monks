const Sequelize = require("sequelize");
const {
  NomeMarcaVeiculos,
} = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/NomeMarcaVeiculos.js");
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
      type: Sequelize.DECIMAL,
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

// Associações
DadosVendasVeiculos.belongsTo(NomeMarcaVeiculos, { foreignKey: 'id_marca', targetKey: 'id_marca' });
NomeMarcaVeiculos.hasMany(DadosVendasVeiculos, { foreignKey: 'id_marca', sourceKey: 'id_marca' });
module.exports = { DadosVendasVeiculos, database}