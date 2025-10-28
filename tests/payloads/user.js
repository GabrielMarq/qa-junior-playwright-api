const { faker } = require('@faker-js/faker');

function gerarUsuarioAleatorio() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    gender: 'male',
    status: 'active'
  };
}

module.exports = { gerarUsuarioAleatorio };