const fs = require("fs")
const {
  NomeMarcasVeiculos,
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

      // Retorna os dados corrigidos para poderem ser utilizados posteriormente
      console.log(json_nome_veiculo_corrigido_2);
      return json_nome_veiculo_corrigido_2
    }
  } catch (error) {
    console.error("Erro ao corrigir JSON:", error)
    throw error // Lança o erro para ser capturado no bloco catch do script principal
  }
}
;(async () => {
  try {
    const dadosJson = await corrigirJson()
    if (dadosJson) {
      const dadosRecebidos = await Promise.all(
        dadosJson.map(async (item) => {
          const criarDados = await NomeMarcasVeiculos.create({
            marca: item.marca,
          });
          return criarDados;
        })
      );      
      return dadosRecebidos
    }
  } catch (error) {
    console.error("Erro geral:", error)
  }
})()
