# Teste Prático: Aplicação de Reserva de Hotéis com Nuxt.js

Este repositório contém a implementação de um teste prático para uma vaga de desenvolvedor front-end, focado na construção de uma aplicação de busca e reserva de hotéis usando o ecossistema Nuxt 3.

## ✨ Features

  * **Busca de Hotéis:** Interface principal para pesquisar hotéis por destino.
  * **Renderização Server-Side (SSR):** A busca inicial é feita no lado do servidor para melhor performance e SEO.
  * **API Mockada:** Endpoints de API (`/server/api`) integrados ao Nuxt para simular o back-end.
  * **Gerenciamento de Estado:**
      * **Pinia (Auth):** Simula um fluxo de autenticação via middleware.
      * **Pinia (Hotel):** Gerencia o estado do hotel selecionado entre a página de busca e a de reserva.
  * **Fluxo de Navegação Completo:** O usuário pode clicar em um hotel, ser direcionado para a página de reserva e, após o sucesso, é redirecionado de volta à página inicial.
  * **Design Responsivo:** Interface moderna construída com TailwindCSS.

## 💻 Tech Stack

  * **Framework:** [Nuxt 3](https://nuxt.com/)
  * **Linguagem:** TypeScript
  * **Estilização:** [TailwindCSS](https://tailwindcss.com/)
  * **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/)
  * **Testes:** [Vitest](https://vitest.dev/)
  * **Arquitetura:** Nuxt Layers (para componentes de UI reutilizáveis)

## 🚀 Como Executar o Projeto

### Pré-requisitos

  * Node.js (20 ou superior)
  * `npm` (ou `pnpm`/`yarn`)

### 1\. Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-seu-repositorio>
cd <nome-do-projeto>
npm install
```

### 2\. Executando em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento (com Hot Reload):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 3\. Executando Testes Unitários

Para rodar a suíte de testes do Vitest:

```bash
npm run test
```

### 4\. Build de Produção

Para gerar a build de produção otimizada:

```bash
npm run build
```

Para iniciar o servidor de produção após a build:

```bash
npm run preview
```