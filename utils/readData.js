const fs = require('fs');

const readData = () => fs.readFileSync('talker.json', 'utf8');

module.exports = readData;