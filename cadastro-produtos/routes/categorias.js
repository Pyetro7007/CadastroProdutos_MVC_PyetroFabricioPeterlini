const express = require('express');
const router = express.Router();
const { Categoria } = require('../models');

// Listar categorias
router.get('/', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.render('categorias/index', { categorias });
});

// Formulário de nova categoria
router.get('/nova', (req, res) => {
  res.render('categorias/nova');
});

// Salvar nova categoria
router.post('/', async (req, res) => {
  await Categoria.create(req.body);
  res.redirect('/categorias');
});

module.exports = router;