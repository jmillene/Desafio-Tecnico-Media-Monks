require("dotenv").config()

const mysql = require("mysql2")

// Configurações de conexão
const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "db_info_veiculos",
})

// Tentar estabelecer a conexão
conexao.connect((err) => {
  if (err) {
    console.error(`Erro ao conectar ao banco de dados: ${err.message}`)
  } else {
    console.log(`Conexão bem-sucedida!`)
  }

  // Fechar a conexão, independentemente do resultado
  conexao.end()
})
