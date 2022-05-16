const fs = require('fs');

const readData = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

module.exports = readData;