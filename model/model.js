import { connection } from "/home/jessica/Documentos/DESAFIO TECH MEDIA MONKS/app.js";
import { DataTypes } from "sequelize";

const Marca = connection.define("Marca", {
  marca: {
    type: DataTypes.STRING,
  },
});

const Venda = connection.define("Venda", {
  data: {
    type: DataTypes.DATEONLY,
  },
  vendas: {
    type: DataTypes.INTEGER,
  },
  valor_do_veiculo: {
    type: DataTypes.INTEGER,
  },
  nome: {
    type: DataTypes.STRING,
  },
});

// Relacionamento entre as tabelas
Marca.hasMany(Venda, { foreignKey: "id_marca" });
Venda.belongsTo(Marca, { foreignKey: "id_marca" });

export { Marca, Venda };
