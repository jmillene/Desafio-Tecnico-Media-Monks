require("dotenv").config()

const mysql = require("mysql2")

// Configurações de conexão
const pool= mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "bd_info_veiculos",
})

// Para obter uma conexão do pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error(`Erro ao obter uma conexão: ${err.message}`)
  } else {
    console.log(`Conexão bem-sucedida!`)
    // Libere a conexão quando terminar
    connection.release()
  }
})
