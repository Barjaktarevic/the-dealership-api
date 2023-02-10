const express = require('express')
const { getAllMakes, getOneManufacturer, getAllModels, getOneModel, updateModel } = require('../controllers/apiControllers')
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

//  @desc   Update the production start year for one model
//  @route  PUT /models/:id
router.put('/models/:id', updateModel)

module.exports = router