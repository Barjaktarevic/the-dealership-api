const express = require('express')
const { getAllMakes, getOneManufacturer, getAllModels, getOneModel, updateModel, deleteModel, addModel, updateModelFull } = require('../controllers/apiControllers')
const router = express.Router()
const Make = require('../models/Make')
const Model = require('../models/Model')

//  @desc   Get all manufacturers
//  @route  GET /makes
router.get('/makes', getAllMakes)

//  @desc   Get one manufacturer
//  @route  GET /makes/:abbreviation
router.get('/makes/:abbreviation', getOneManufacturer)

//  @desc   Get all models with manufacturers populated; skip step, limit step and sort param defined in the query string
//  @route  GET /models
router.get('/models', getAllModels)

//  @desc   Get one model
//  @route  GET /models/:id
router.get('/models/:id', getOneModel)

//  @desc   Delete a model
//  @route  DELETE /models/:id
router.delete('/models/:id', deleteModel)

//  @desc   Add a model
//  @route  POST /models
router.post('/models', addModel)

//  @desc   Update a model FULL
//  @route  PUT /models/:id
router.put('/models/:id', updateModelFull)

module.exports = router