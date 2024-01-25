const fs = require("fs")
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js")
const DadosVendasVeiculos = require("../model/DadosVendasVeiculos.js")(database)

async function lendo_Database_2() {
  try {
    let data2 = await fs.promises.readFile(
      "/home/milene/Desafio-Tecnico-Monks-Media/databases/broken_database_2.json",
      "utf8",
    )
    return JSON.parse(data2)
  } catch (error) {
    console.error("Erro ao carregar JSON:", error)
    return null
  }
}

async function corrigir_json() {
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
      "utf-8",
    )
  }
}
corrigir_json()
