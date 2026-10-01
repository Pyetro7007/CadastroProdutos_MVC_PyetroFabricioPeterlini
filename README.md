# Cadastro de Produtos — MVC

## Integrante

Pyetro Fabrício Peterlini - 20240101

## Como executar

Clone o repositório e entre na pasta do projeto:

```bash
npm install
```

```bash
npm start
```

Acesse no navegador:

```
http://localhost:3000/produtos
```

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Cadastro de categorias
- Produtos por categoria
- Pesquisa de produtos por nome

## Desafios

### Desafio 1 — Categorias

Foi criado um novo Model chamado `Categoria` com os campos `id` e `nome`. A associação entre os Models foi feita utilizando `Produto.belongsTo(Categoria)` e `Categoria.hasMany(Produto)`, o que fez o Sequelize adicionar automaticamente a chave estrangeira `categoriaId` na tabela de produtos. Foram criadas rotas e views para cadastrar e listar categorias, e o formulário de produtos foi atualizado com um select para escolher a categoria.

### Desafio 2 — Listagem por categoria

Foi criada a rota `GET /produtos/categoria/:id` que recebe o ID da categoria e utiliza o `Produto.findAll()` com a cláusula `where: { categoriaId }` para buscar apenas os produtos daquela categoria. A listagem de categorias foi atualizada com links que redirecionam para essa rota.

### Desafio extra — Pesquisa por nome

Foi implementada uma pesquisa utilizando o operador `Op.like` do Sequelize, que gera uma consulta `LIKE '%termo%'` no banco de dados. O termo é recebido via `GET /produtos?busca=termo` e aplicado como condição no `findAll()`. Um formulário de busca foi adicionado na listagem de produtos.
