const fs = require('fs').promises;

const writeData = (path, newData) => {
  fs.writeFile(path, JSON.stringify(newData, null, 2))
    .then(() => {
      console.log('Arquivo escrito com sucesso!');
    })
    .catch((err) => {
      console.error(`Erro ao escrever o arquivo: ${err.message}`);
    });
};

module.exports = writeData;