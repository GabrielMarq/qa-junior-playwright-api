import base, { expect, request } from '@playwright/test'

async function criarRequisicoesCustomizadas() {
  const apiContext = await request.newContext()

  async function req(method, endpoint, data) {
    const url = endpoint.replace(/^\//, '')
    const response = await apiContext[method](url, {
      data,
      headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`
      }
    })

    const status = response.status()
    const body = await response.json().catch(() => ({}))

    return {
      status,
      body
    }
  }

  return {
    get: (endpoint) => req('get', endpoint),
    post: (endpoint, data) => req('post', endpoint, data),
    patch: (endpoint, data) => req('patch', endpoint, data),
    delete: (endpoint) => req('delete', endpoint),
  }
}

export const test = base.extend({
  apiGoRest: async ({}, use) => {
    const apiTest = await criarRequisicoesCustomizadas()
    await use(apiTest)
  },
})

export { expect }