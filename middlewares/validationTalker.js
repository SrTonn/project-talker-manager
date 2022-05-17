const checkIfNotExists = ({ ...fields }) => {
  const field = Object.entries(fields).find((arr) => !arr[1]);
  console.log(field);
  if ((field && field[0] === 'talk') || Object.keys(fields.talk).length !== 2) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (!field) return false;
  return { message: `O campo "${field[0]}" é obrigatório` };
};

const isAdult = (age) => age < 18;

const checkNameAndAge = (name, age) => {
  if (name.length < 3) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  if (isAdult(age)) {
    return { message: 'A pessoa palestrante deve ser maior de idade' };
  }
  return false;
};

const regexCatchFormat = /^(\d{2}\/){2}\d{4}$/;
const isValidityDate = (date) => !regexCatchFormat.test(date);

const isInteger = (num) => {
  if (num < 1 || num > 5 || !Number.isInteger(num)) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return false;
};

module.exports = (req, res, next) => {
  const { name, age, talk } = req.body;
  if (checkIfNotExists({ name, age, talk })) {
    res.status(400).json(checkIfNotExists({ name, age, talk }));
  }
  if (checkNameAndAge(name, age)) {
    res.status(400).json(checkNameAndAge(name, age));
  }
  if (isValidityDate(talk.watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (isInteger(talk.rate)) {
    console.log(talk.rate);
    res.status(400).json(isInteger(talk.rate));
  }
  next();
};
