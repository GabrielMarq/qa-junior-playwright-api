# GoRest API Testing - Projeto de Testes Automatizados

## 📋 Sobre o Projeto

Este projeto é uma suíte de testes automatizados de API desenvolvida com Playwright, focada na API pública [GoRest](https://gorest.co.in/). O projeto tem como objetivo validar os principais endpoints da API (Users, Posts e Comments) através de testes funcionais automatizados.

### Objetivo do Projeto
Criar testes automatizados robustos que garantam a qualidade e funcionalidade dos serviços da API GoRest, cobrindo operações CRUD (Create, Read, Update, Delete) e casos de teste tanto de sucesso quanto de erro.

---

## 🛠️ Tecnologias Utilizadas

- **Playwright**: Framework de testes end-to-end e API
- **JavaScript/Node.js**: Linguagem de programação
- **Faker.js**: Geração de dados aleatórios para testes
- **REST API**: Testes de APIs RESTful

---

## 📁 Estrutura do Projeto

```
qa-junior-playwright-api/
├── tests/
│   ├── API/
│   │   ├── users.spec.js      # Testes do endpoint Users
│   │   ├── posts.spec.js      # Testes do endpoint Posts
│   │   └── comments.spec.js  # Testes do endpoint Comments
│   ├── payloads/
│   │   ├── users.js        # Métodos específicos de Users
│   │   ├── post.js        # Métodos específicos de Posts
│   │   └── comment.js     # Métodos específicos de Comments
├── fixture               # Configuração e extensões do Playwright
├── playwright.config.js        # Configuração do Playwright
└── package.json               # Dependências do projeto
└── README.md                    # Documentação do projeto
```

---

## 🚀 Configuração e Instalação

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm ou yarn
- Acesso à internet (para consumir a API GoRest)

### Passos para instalação:

1. **Clone ou faça o download do projeto**

2. **Navegue até a pasta do projeto**
   ```bash
   cd qa-junior-playwright-api
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Configure o token de autenticação** (opcional)
   
   Crie um arquivo `local-config.js` na pasta `tests/` (use o `local-config.example.js` como referência):
   ```javascript
   module.exports = {
     AUTH_TOKEN: 'seu-token-aqui'
   };
   ```
   
   > **Nota**: Um token padrão já está configurado para testes. Para produção ou testes mais avançados, obtenha seu próprio token em [GoRest](https://gorest.co.in/)

---

## ▶️ Como Executar os Testes

### Executar todos os testes
```bash
npx playwright test
```

### Executar testes de um arquivo específico
```bash
npx playwright test tests/API/users.spec.js
```

### Executar testes em modo headed (com interface gráfica)
```bash
npx playwright test --headed
```

### Executar testes com relatório HTML
```bash
npx playwright test
npx playwright show-report
```

### Executar testes em modo debug
```bash
npx playwright test --debug
```

---

## 🧪 Tipos de Testes Implementados

### 1. Testes de Users
- ✅ GET /users - Listar todos os usuários
- ✅ GET /users/{id} - Buscar usuário específico
- ✅ POST /users - Criar novo usuário
- ✅ PUT /users/{id} - Atualizar usuário
- ✅ DELETE /users/{id} - Deletar usuário
- ✅ Validação de dados inválidos

### 2. Testes de Posts
- ✅ GET /posts - Listar todos os posts
- ✅ GET /posts/{id} - Buscar post específico
- ✅ POST /posts - Criar novo post
- ✅ PUT /posts/{id} - Atualizar post
- ✅ DELETE /posts/{id} - Deletar post

### 3. Testes de Comments
- ✅ GET /comments - Listar todos os comentários
- ✅ GET /comments/{id} - Buscar comentário específico
- ✅ POST /comments - Criar novo comentário
- ✅ PUT /comments/{id} - Atualizar comentário
- ✅ DELETE /comments/{id} - Deletar comentário

---

## 📊 Características dos Testes

### Boas Práticas Implementadas

1. **Page Object Pattern**: Organização do código usando classes para cada endpoint
2. **Autenticação Automática**: Gerenciamento automático de tokens
3. **Data Management**: Geração automática de dados de teste com Faker.js
4. **Validações Robustas**: Verificação de status codes e estrutura de dados
5. **Limpeza Automática**: Exclusão de dados criados durante os testes
6. **Testes Isolados**: Cada teste é independente e pode rodar separadamente

---

## 📝 Estrutura de um Teste Exemplo

```javascript
test('POST /users - Deve criar novo usuário', async ({ request }) => {
  const usersAPI = new UsersAPI(request);
  const newUser = TestDataManager.generateUserData();
  
  const response = await usersAPI.createUser(newUser);
  expect(response.status()).toBe(201);
  
  const createdUser = await response.json();
  AssertionHelper.validateUserStructure(createdUser);
  
  // Limpeza - deletar o usuário criado
  await usersAPI.deleteUser(createdUser.id);
});
```

---

## 🔧 Configuração do Playwright

O arquivo `playwright.config.js` contém as configurações principais:
- Base URL: `https://gorest.co.in/public/v2`
- Worker paralelos para execução rápida
- Retry automático em caso de falha (CI/CD)
- Geração de relatórios HTML

---

## 📚 Dependências Principais

```json
{
  "@playwright/test": "^1.56.1",
  "@faker-js/faker": "^10.1.0",
  "@types/node": "^24.9.1"
}
```

---

**Desenvolvido para demonstrar conhecimento em automação de testes de API** 🚀

