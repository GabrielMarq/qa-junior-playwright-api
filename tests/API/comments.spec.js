const { test, expect } = require('../fixture')
const { gerarComentario } = require('../payloads/comments')
const { gerarPost } = require('../payloads/post')
const { gerarUsuarioAleatorio } = require('../payloads/user')

test('GET /comments - deve retornar lista de comentários', async ({ apiGoRest }) => {
  const { status, body } = await apiGoRest.get('/comments')
  expect(status).toBe(200)

  expect(Array.isArray(body)).toBe(true)
  expect(body[0]).toHaveProperty('id')
  expect(body[0]).toHaveProperty('post_id')
  expect(body[0]).toHaveProperty('name')
  expect(body[0]).toHaveProperty('email')
  expect(body[0]).toHaveProperty('body')
})

test('GET /comments/{id} - deve retornar comentário específico', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  const { body: commentCriado } = await apiGoRest.post('/comments', gerarComentario(post.id))
  const { status, body } = await apiGoRest.get(`/comments/${commentCriado.id}`)

  expect(status).toBe(200)
  expect(body).toMatchObject(commentCriado)
})

test('POST /comments - deve criar novo comentário', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  const { status, body: commentCriado } = await apiGoRest.post('/comments', gerarComentario(post.id))
  const { body } = await apiGoRest.get(`/comments/${commentCriado.id}`)

  expect(status).toBe(201)
  expect(body).toMatchObject(commentCriado)
})

test('PATCH /comments/{id} - deve atualizar comentário', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  // Cria um comentário
  const { body: commentCriado } = await apiGoRest.post('/comments', gerarComentario(post.id))

  // Valores atualizados
  const commentAtualizado = {
    name: 'Nome atualizado',
    email: 'novoemail@teste.com',
    body: 'Texto atualizado do comentário'
  }

  const { status, body } = await apiGoRest.patch(`/comments/${commentCriado.id}`, commentAtualizado)
  expect(status).toBe(200)
  expect(body).toMatchObject(commentAtualizado)

  // Valida se realmente foi atualizado
  const { body: commentCheck } = await apiGoRest.get(`/comments/${commentCriado.id}`)
  expect(commentCheck).toMatchObject(commentAtualizado)
})

test('DELETE /comments/{id} - deve deletar comentário', async ({ apiGoRest }) => {
  const { body: user } = await apiGoRest.post('/users', gerarUsuarioAleatorio())
  const { body: post } = await apiGoRest.post('/posts', gerarPost(user.id))

  const { body: commentCriado } = await apiGoRest.post('/comments', gerarComentario(post.id))
  const { status } = await apiGoRest.delete(`/comments/${commentCriado.id}`)
  expect(status).toBe(204)

  const { status: statusGet } = await apiGoRest.get(`/comments/${commentCriado.id}`)
  expect(statusGet).toBe(404)
})

test('POST /comments - deve retornar erro com dados inválidos', async ({ apiGoRest }) => {
  const invalido = { name: '', email: 'errado', body: '' }
  const { status } = await apiGoRest.post('/comments', invalido)
  expect([400, 422]).toContain(status)
})