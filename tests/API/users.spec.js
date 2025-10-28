const { test, expect } = require('../fixture')
const { gerarUsuarioAleatorio } = require('../payloads/user')

test('GET /users - Deve retornar lista de usuários', async ({ apiGoRest }) => {
  const { status, body: users } = await apiGoRest.get('/users')

  expect(status).toBe(200)
  expect(Array.isArray(users)).toBeTruthy()
  expect(users.length).toBeGreaterThan(0)

  expect(users[0]).toHaveProperty('id')
  expect(users[0]).toHaveProperty('name')
  expect(users[0]).toHaveProperty('email')
  expect(users[0]).toHaveProperty('gender')
  expect(users[0]).toHaveProperty('status')
})

test('GET /users/{id} - Deve retornar usuário específico', async ({ apiGoRest }) => {
  const { body: usuario } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { status, body } = await apiGoRest.get(`/users/${usuario.id}`)

  expect(status).toBe(200)
  expect(body).toMatchObject(usuario)
})

test('POST /users - Deve criar novo usuário', async ({ apiGoRest }) => {
  const usuario = gerarUsuarioAleatorio()
  const { status, body } = await apiGoRest.post('/users', usuario)
  expect(status).toBe(201)
  expect(body).toMatchObject(usuario)

  // valida que o usuário foi realmente criado
  const { body: usuarioCriado } = await apiGoRest.get(`/users/${body.id}`)
  expect(body).toMatchObject(usuarioCriado)

})

test('PATCH /users/{id} - Deve atualizar usuário existente', async ({ apiGoRest }) => {
  // criar usuário
  const { body: usuario } = await apiGoRest.post('/users', gerarUsuarioAleatorio())

  const updatedData = {
    name: 'Usuário Atualizado',
    status: 'inactive',
  }

  const { status, body } = await apiGoRest.patch(`/users/${usuario.id}`, updatedData)
  expect(status).toBe(200)
  expect(body).toMatchObject(updatedData)

  // valida atualização
  const { body: userUpdated } = await apiGoRest.get(`/users/${usuario.id}`)
  expect(userUpdated).toMatchObject(updatedData)
})

test('DELETE /users/{id} - Deve deletar usuário', async ({ apiGoRest }) => {
  // criar usuário
  const { body: usuario } = await apiGoRest.post('/users', gerarUsuarioAleatorio())

  // deletar
  const { status } = await apiGoRest.delete(`/users/${usuario.id}`)
  expect(status).toBe(204)

  // valida que foi deletado
  const { status: getStatus } = await apiGoRest.get(`/users/${usuario.id}`)
  expect(getStatus).toBe(404)
})

test('POST /users - Deve retornar erro com dados inválidos', async ({ apiGoRest }) => {
  const usuarioInvalido = {
    name: '',
    email: 'email-invalido',
    gender: 'invalido',
    status: 'invalido',
  }

  const { status, body } = await apiGoRest.post('/users', usuarioInvalido)
  expect(status).toBe(422)
  expect(body).toMatchObject([{ "field": "name", "message": "can't be blank" }, { "field": "gender", "message": "can't be blank, can be male of female" }, { "field": "status", "message": "can't be blank" }, { "field": "email", "message": "is invalid" }])
})