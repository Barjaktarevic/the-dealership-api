const express = require('express')
const router = express.Router()
const Make = require('../models/Make')
const Model = require('../models/Model')

//  @desc   Get all manufacturers
//  @route  GET /makes
router.get('/makes', async (req, res) => {
    const allMakes = await Make.find({})
    res.json({ makes: allMakes })
})

//  @desc   Get all models with manufacturers populated
//  @route  GET /makes
router.get('/models', async (req, res) => {
    const allModels = await Model.find({}).populate('makeId')

    res.json({ models: allModels })
})

module.exports = router