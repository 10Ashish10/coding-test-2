const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.delete(
	'/:petId', async (req, res, next) => {
		try {
			console.log('Delete pet by id: ', req.params.petId);
			const pet = await Pet.findById(req.params.petId);
			if(!pet)
				res.status(404).send('Item not Found');
			else {
				const removedPet = await Pet.deleteOne( {_id: req.params.petId} );
				res.json(removedPet);
			}
		} catch(e) {
			next(e);
		}
	});

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Name of pet'),
    age: Joi.number().integer().required().description('Age of pet'),
    colour: Joi.string().required().description('Colour of pet'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
	  console.log('New Pet data saved in db.');
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/', async (req, res, next) => {
    try {
      const pets = await Pet.find();
	  console.log('All Pet data displayed.');
	  res.json(pets);
    } catch (e) {
      next(e);
    }
  }
)

router.get(
  '/:petId', async (req, res, next) => {
    try {
		const pet = await Pet.findById(req.params.petId);
		console.log('Find pet by id: ', req.params.petId);
		if(!pet)
			res.status(404).send('Item not Found');
		else
			res.json(pet);
	} catch (e) {
      next(e);
    }
  });

module.exports = router;