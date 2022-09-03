<h1 align='center'>
   Fullcrud (Front-end)
</h1>

<p align="center">Um crud completo feito em React e GraphQL.</p>

## 📃 Sobre o projeto

Gerenciador de cadastro de clientes, que usa MongoDB para armazenamento de dados e GraphQL para queries e mutations. Baseado no sistema CRUD, um acrônimo para as quatro funções que são essenciais em uma aplicação que envolve armazanamento de dados. Em ordem, as funções são **create**, **read**, **update** e **delete**.


### Funcionalidades

- Adicionar dados.
- Ler dados existentes.
- Atualizar dados.
- Deletar dados.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ChakraUI](https://chakra-ui.com/)
- [MongoDB](https://www.mongodb.com/)
- [GraphQL](https://graphql.org/)
- [ApolloClient](https://www.apollographql.com/docs/react/)

## 💻 Clonando projeto

Essa aplicação é dividida em duas partes, uma sendo essa (front-end) e outra back-end hospedada [aqui](https://github.com/izaiasmorais/fullcrud-backend/tree/master). Caso queira clonar a aplicação completa, você precisa ter baixadas as duas pastas (front e back) numa pasta só e depois é só seguir as instruções.

```bash
# Abra seu terminal e digite:
$ git clone https://github.com/izaiasmorais/fullcrud.git && cd fullcrud
```

```bash
# Defina a variável ambiente no frontend:
APOLLO_URL=http://localhost:4000

# Defina a variável ambiente no backend:
MONGODB_API=<link da sua API Mongodb>
```

```bash

# Instalando dependências. Na rota /frontend e /backend digite:
$ yarn

# Rodando o projeto. Na rota /frontend e /backend digite:
$ yarn dev

```

