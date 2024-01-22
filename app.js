import { Sequelize, DataTypes } from "sequelize";

const connection = new Sequelize("dbvendas", "dbuser", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

const connection_sync = connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco bem-sucedida");
    return connection.sync();
  })
  .then(() => {
    console.log("Modelo sincronizado com o banco de dados");
  })
  .catch((err) => {
    console.log("Não foi possível estabelecer uma conexão:", err);
  });

export { connection, connection_sync, DataTypes };
