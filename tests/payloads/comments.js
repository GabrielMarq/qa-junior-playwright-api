const { faker } = require('@faker-js/faker');

function gerarComentario(post_id = null) {
  return {
    post_id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    body: faker.lorem.sentence()
  };
}

module.exports = { gerarComentario };