const { faker } = require('@faker-js/faker');

function gerarPost(user_id = null) {
  return {
    title: faker.book.title(),
    body: "Este é o conteúdo do meu post de teste.",
    user_id
  };
}

module.exports = { gerarPost };