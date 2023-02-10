const Make = require('../models/Make')
const Model = require('../models/Model')
const wrapAsync = require('../utils/wrapAsync')

exports.getAllMakes = wrapAsync(async (req, res) => {
    const allMakes = await Make.find({})
    res.json({ makes: allMakes })
})

exports.getOneManufacturer = wrapAsync(async (req, res) => {
    const oneMake = await Make.find({ abbreviation: req.params.abbreviation })
    res.json(oneMake)
})

exports.getAllModels = wrapAsync(async (req, res) => {
    const limit = req.query.limit
    const sort = req.query.sort
    const skip = req.query.skip

    const allModels = await Model.find({}).populate('makeId').sort({ productionStart: sort }).limit(limit).skip(skip)
    res.json({ models: allModels })
})

exports.getOneModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    const oneModelPopulated = await Model.findOne({ _id: id }).populate('makeId')
    console.log(oneModelPopulated)
    res.json(oneModelPopulated)
})

exports.updateModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    const foundModel = await Model.findOneAndUpdate({ id: id }, { productionStart: req.body.productionStart })

    res.json('Successfully updated production start year!')
})