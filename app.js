require("dotenv").config()

const mysql = require("mysql2")

// Configurações de conexão
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1' || MYSQL_HOST,
  user: 'myuser' || MYSQL_USER,
  password: 'root' || MYSQL_PASSWORD,
  database: 'dados' || MYSQL_DATABASE,
  port: '3306' || MYSQL_PORT,
});

// Para obter uma conexão do pool
const conexao = pool.getConnection((err, connection) => {
  if (err) {
    console.error(`Erro ao obter uma conexão: ${err.message}`)
  } else {
    console.log(`Conexão bem-sucedida!`)
    // Libere a conexão quando terminar
    connection.close()
  }
})
module.exports = { conexao }
