const { test, expect } = require('../fixture')
const { gerarPost } = require('../payloads/post')
const { gerarUsuarioAleatorio } = require('../payloads/user')

test('GET /posts - Deve retornar lista de posts', async ({ apiGoRest }) => {
  const { status, body } = await apiGoRest.get('/posts')

  expect(status).toBe(200)
  expect(Array.isArray(body)).toBeTruthy()
  expect(body.length).toBeGreaterThan(0)

  expect(body[0]).toHaveProperty('id')
  expect(body[0]).toHaveProperty('title')
  expect(body[0]).toHaveProperty('body')
  expect(body[0]).toHaveProperty('user_id')
})

test('GET /posts/{id} - Deve retornar post específico', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  const { status, body } = await apiGoRest.get(`/posts/${post.id}`)

  expect(status).toBe(200)
  expect(body).toMatchObject(post)
})

test('POST /posts - Deve criar novo post', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const postData = gerarPost(user.id)

  const { status, body } = await apiGoRest.post('/posts', postData)
  expect(status).toBe(201)
  expect(body).toMatchObject(postData)

  // valida criação
  const { body: postCriado } = await apiGoRest.get(`/posts/${body.id}`)
  expect(postCriado).toMatchObject(postData)
})

test('PATCH /posts/{id} - Deve atualizar post existente', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  const postAtualizado = { title: 'Título Atualizado', body: 'Conteúdo atualizado' }
  const { status, body } = await apiGoRest.patch(`/posts/${post.id}`, postAtualizado)
  expect(status).toBe(200)
  expect(body).toMatchObject(postAtualizado)

  // valida atualização
  const { body: postUpdated } = await apiGoRest.get(`/posts/${post.id}`)
  expect(postUpdated).toMatchObject(postAtualizado)
})

test('DELETE /posts/{id} - Deve deletar post', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  const { status } = await apiGoRest.delete(`/posts/${post.id}`)
  expect(status).toBe(204)

  const { status: getStatus } = await apiGoRest.get(`/posts/${post.id}`)
  expect(getStatus).toBe(404)
})

test('POST /posts - Deve retornar erro com dados inválidos', async ({ apiGoRest }) => {
  const invalido = { title: '', body: '', user_id: null }
  const { status, body } = await apiGoRest.post('/posts', invalido)

  expect([400, 422]).toContain(status)
  expect(body).toMatchObject([
    { field: 'user', message: 'must exist' },
    { field: 'user_id', message: 'is not a number' },
    { field: 'title', message: "can't be blank" },
    { field: 'body', message: "can't be blank" }
  ])
})