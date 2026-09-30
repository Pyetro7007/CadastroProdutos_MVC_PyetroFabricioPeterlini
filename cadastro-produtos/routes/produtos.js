const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Produto, Categoria } = require('../models');

router.get('/', async (req, res) => {
  const busca = req.query.busca || '';

  const produtos = await Produto.findAll({
    where: busca ? {
      nome: { [Op.like]: `%${busca}%` }
    } : {},
    include: [{ model: Categoria }]
  });

  res.render('produtos/index', { produtos, busca });
});

router.get('/novo', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.render('produtos/novo', { categorias });
});

router.get('/categoria/:id', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);

  const produtos = await Produto.findAll({
    where: { categoriaId: req.params.id },
    include: [{ model: Categoria }]
  });

  res.render('produtos/por-categoria', { categoria, produtos });
});

router.post('/', async (req, res) => {
  await Produto.create(req.body);
  res.redirect('/produtos');
});

router.get('/:id/editar', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  const categorias = await Categoria.findAll();
  res.render('produtos/editar', { produto, categorias });
});

router.post('/:id', async (req, res) => {
  console.log('body:', req.body);
  console.log('id:', req.params.id);

  await Produto.update({
    nome: req.body.nome,
    preco: req.body.preco,
    quantidade: req.body.quantidade,
    categoriaId: req.body.categoriaId
  }, {
    where: { id: req.params.id }
  });
  res.redirect('/produtos');
});

router.post('/:id/deletar', async (req, res) => {
  await Produto.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/produtos');
});

module.exports = router;