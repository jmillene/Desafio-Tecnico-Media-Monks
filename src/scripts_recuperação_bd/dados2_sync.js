const fs = require("fs")
const {
  NomeMarcasVeiculos,
  sequelize,
} = require("/home/milene/Desafio-Tecnico-Monks-Media/src/models/NomeMarcasVeiculos.js")

async function lendo_Database_2() {
  try {
    let data2 = await fs.promises.readFile(
      "/home/milene/Desafio-Tecnico-Monks-Media/databases/broken_database_2.json",
      "utf8"
    )
    return JSON.parse(data2)
  } catch (error) {
    console.error("Erro ao carregar JSON:", error)
    return null
  }
}

async function corrigirJson() {
  try {
    let jsonData2 = await lendo_Database_2()

    if (jsonData2) {
      let json_nome_veiculo_corrigido_2 = jsonData2.map((item) => {
        if (item.marca && typeof item.marca === "string") {
          item.marca = item.marca.replace(/æ/g, "a").replace(/ø/g, "o")
        }
        return item
      })

      await fs.promises.writeFile(
        "arquivos corrigidos/broken_database_2_corrigido.json",
        JSON.stringify(json_nome_veiculo_corrigido_2),
        "utf-8"
      )
      return json_nome_veiculo_corrigido_2
    }
  } catch (error) {
    console.error("Erro ao corrigir JSON:", error)
    throw error
  }
}

// Aguarda a conclusão da migração antes de executar o script
sequelize.sync().then(async () => {
  try {
    const dadosJson = await corrigirJson()
    if (dadosJson) {
      const dadosRecebidos = await Promise.all(
        dadosJson.map(async (item) => {
          const criarDados = await NomeMarcasVeiculos.create({
            marca: item.marca,
          })
          return criarDados
        })
      )
      console.log("Registros criados com sucesso:", dadosRecebidos)
    }
  } catch (error) {
    console.error("Erro geral:", error)
  } finally {
    sequelize.close()
  }
})
