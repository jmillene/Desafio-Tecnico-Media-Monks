const fs = require("fs");
const { NomeMarcaVeiculos, database } = require("../Model/NomeMarcaVeiculos.js");

async function lendo_Database_2() {
  try {
    let data2 = await fs.promises.readFile(
      "databases/broken_database_2.json",
      "utf8"
    );
    return JSON.parse(data2);
  } catch (error) {
    console.error("Erro ao carregar JSON:", error);
    return null;
  }
}

async function corrigir_e_salvar_json_2() {
  let jsonData2 = await lendo_Database_2();

  if (jsonData2) {
    let json_marca_veiculo_corrigido_2 = jsonData2.map((item) => {
      if (item.marca && typeof item.marca === "string") {
        item.marca = item.marca.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      return item;
    });

    await database.sync();
    dados2 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_2_corrigido.json",
      JSON.stringify(json_marca_veiculo_corrigido_2),
      "utf-8"
    );

    for (let item of json_marca_veiculo_corrigido_2) {
      if (item !== undefined && item.marca !== undefined) {
        try {
          const resultadoCreate2 = await NomeMarcaVeiculos.create({
            nome: item.marca,
          });
          console.log(
            "Dados das marcas criados com sucesso!: ",
            resultadoCreate2
          );
        } catch (error) {
          console.error(
            "Erro ao criar e salvar dados das marcas dos veículos!:",
            error
          );
        }
      }
    }
  }
}

async function main() {
  let sincronizar_dados;
  try {
    sincronizar_dados = await corrigir_e_salvar_json_2();
    console.log("Dados salvos no Banco de dados");
  } catch (error) {
    console.error("Erro ao sincronizar e corrigir dados:", error);
  }

  return sincronizar_dados;
}

main();
