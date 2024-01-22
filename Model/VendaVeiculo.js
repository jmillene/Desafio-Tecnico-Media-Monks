const Sequelize = require('sequelize');
const database = require('/home/milene/Desafio-Tecnico-Monks-Media/app.js');


const Venda = database.define(
  "Venda",
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
    tableName: "venda",
    underscored: true,
    timestamps: false,
  }
);

Venda.associate = (models) => {
  Venda.belongsTo(models.MarcaVeiculo, {
    foreignKey: "id_marca",
    as: "marcaVeiculo",
  });

  return Venda;
};

module.exports = {Venda};

