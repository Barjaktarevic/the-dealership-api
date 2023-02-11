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
    const page = parseInt(req.query.page)
    const sort = parseInt(req.query.sort)
    const make = req.query.make

    if (make !== "All" && sort !== -1 && sort !== 1) {
        const oneMake = await Make.findOne({ abbreviation: make })
        const allModelsFiltered = await Model.find({ makeId: oneMake.id }).populate('makeId').limit(5).skip((page - 1) * 5)
        res.json(allModelsFiltered)

    } else if (make !== "All" && (sort === -1 || sort === 1)) {
        const oneMake = await Make.findOne({ abbreviation: make })
        const allModelsFiltered = await Model.find({ makeId: oneMake.id }).populate('makeId').sort({ productionStart: sort }).limit(5).skip((page - 1) * 5)
        res.json(allModelsFiltered)

    } else if (make === "All" && sort !== -1 && sort !== 1) {
        const allModels = await Model.find().populate('makeId').limit(5).skip((page - 1) * 5)
        res.json({ models: allModels })

    } else if (make === "All" && (sort === -1 || sort === 1)) {
        const allModels = await Model.find().populate('makeId').sort({ productionStart: sort }).limit(5).skip((page - 1) * 5)
        res.json({ models: allModels })
    }
})

exports.getOneModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    const oneModelPopulated = await Model.findOne({ _id: id }).populate('makeId')
    console.log(oneModelPopulated)
    res.json(oneModelPopulated)
})

exports.updateModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    const foundModel = await Model.findOneAndUpdate({ _id: id }, { productionStart: req.body.productionStart })

    res.json('Successfully updated production start year!')
})