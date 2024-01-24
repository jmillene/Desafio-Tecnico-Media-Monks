const fs = require("fs");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");
const NomesMarcasVeiculos =
  require("/home/milene/Desafio-Tecnico-Monks-Media/Model/NomesMarcasVeiculos.js")(
    database
  );

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
    try {
      await database.sync(); // Sincroniza os modelos com o banco de dados
      console.log("Modelos sincronizados com o banco de dados");

      await fs.promises.writeFile(
        "arquivos corrigidos/broken_database_1_corrigido.json",
        JSON.stringify(json_marca_veiculo_corrigido_2),
        "utf-8"
      );

      for (let item of json_marca_veiculo_corrigido_2) {
        try {
          // Verifica se a chave id_marca existe no objeto
          if ("id_marca" in item && item.id_marca !== null) {
            const atualiza_chave = await NomesMarcasVeiculos.findByPk(
              item.id_marca
            );
            console.log(atualiza_chave, item);
            if (atualiza_chave) {
              // Se já existir, atualiza o registro existente
              await atualiza_chave.update({
                id_marca_: item.id_marca,
                marca: item.marca,
              });
              console.log(
                "Dados das marcas dos veículos atualizados com sucesso!"
              );
            } else {
              const resultadoCreate1 = await NomesMarcasVeiculos.create({
                id_marca_: item.id_marca,
                marca: item.marca,
              });
              console.log(
                "Dados das marcas dos veículos criados e salvos com sucesso!: ",
                resultadoCreate1.toJSON()
              );
            }
          } else {
            console.error(
              "Erro: A chave id_marca está ausente ou é nula no objeto:",
              item
            );
          }
        } catch (error) {
          console.error(
            "Erro ao criar e salvar dados das marcas dos veículos: ",
            error
          );
        }
      }
    } catch (error) {
      console.error("Erro ao sincronizar modelos com o banco de dados:", error);
    }
  }
}

async function main() {
  try {
    await corrigir_e_salvar_json_2();
    console.log("Dados salvos no Banco de dados");
  } catch (error) {
    console.error("Erro ao sincronizar e corrigir dados:", error);
  } finally {
    await database.close();
  }
}

main();
