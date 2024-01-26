const Sequelize = require("sequelize")
require("dotenv").config();
const sequelize = new Sequelize(process.env.MYSQL_DATABASE || "dados", process.env.MYSQL_USER || "myuser", process.env.MYSQL_PASSWORD || "root", {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  dialect: "mysql",
});

const dadosVendasCarrosSchema = (sequelize) => {
  const DadosVendasVeiculos = sequelize.define(
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
  )
  return DadosVendasVeiculos
}

module.exports = {
  sequelize,
  DadosVendasVeiculos: dadosVendasCarrosSchema(sequelize),
}
