const fs = require("fs")
const {
  DadosVendasVeiculos,
} = require("/home/milene/Desafio-Tecnico-Monks-Media/models/DadosVendasVeiculos.js")

async function lerDatabase1() {
  try {
    let data1 = await fs.promises.readFile(
      "/home/milene/Desafio-Tecnico-Monks-Media/databases/broken_database_1.json",
      "utf8"
    )
    return JSON.parse(data1)
  } catch (error) {
    console.error("Erro ao carregar JSON:", error)
    return null
  }
}

async function corrigirJson() {
  try {
    let jsonData1 = await lerDatabase1()

    if (jsonData1) {
      let jsonNomeVeiculoCorrigido1 = jsonData1.map((item) => {
        if (item.nome && typeof item.nome === "string") {
          item.nome = item.nome.replace(/æ/g, "a").replace(/ø/g, "o")
        }
        if (item.vendas && typeof item.vendas === "string") {
          item.vendas = Number(item.vendas)
        }
        return item
      })

      await fs.promises.writeFile(
        "arquivos corrigidos/broken_database_1_corrigido.json",
        JSON.stringify(jsonNomeVeiculoCorrigido1),
        "utf-8"
      )

      return jsonNomeVeiculoCorrigido1 // Garante que os dados corrigidos sejam retornados
    }
  } catch (error) {
    console.error("Erro ao corrigir JSON:", error)
    return null
  }
}

;(async () => {
  try {
    const dadosJson = await corrigirJson()
    if (dadosJson) {
      let dadosRecebidos = await Promise.all(
        dadosJson.map(async (item) => {
          const criarDados = await DadosVendasVeiculos.create({
            data: item.data,
            vendas: item.vendas,
            valor_do_veiculo: item.valor_do_veiculo,
            nome: item.nome,
          })
          return criarDados
        })
      )
      return dadosRecebidos
    }
  } catch (error) {
    console.error("Erro geral:", error)
  }
})()
