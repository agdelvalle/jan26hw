const fs = require('fs/promises')
const express = require('express')
const pokemonService = require('./pokemon-service.js')
const pokemonController = express.Router()

pokemonController.get('/', (req, res) => {
    res.json(pokemonService.pokemons)
})

pokemonController.post('/', (req, res, next) => {
  const { name, types } = req.body;

  if (
    !name ||
    !Array.isArray(types) ||
    types.some((type) => typeof type !== 'string')
  ) {
    return res.status(400).json({
      message: 'name should be string and types should be array of string.',
    });
  }

  const newPokemon = pokemonService.addPokemon({name, types})

  return res.status(201).json(newPokemon);
});

pokemonController.get('/:id', (req, res, next) => {
  const pokemon = pokemonService.getOnePokemon(Number(req.params.id))

  if (pokemon) {
    return res.json(pokemon);
  } else {
    return res.status(404).json({
      message: 'Not found',
    });
  }
});

exports.pokemonController = pokemonController;