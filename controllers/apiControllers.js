const { isValidObjectId } = require('mongoose')
const Make = require('../models/Make')
const Model = require('../models/Model')
const wrapAsync = require('../utils/wrapAsync')
const isURL = require('../utils/isURL')

exports.getAllMakes = wrapAsync(async (req, res) => {
    const allMakes = await Make.find({})
    res.json(allMakes)
})

exports.getOneManufacturer = wrapAsync(async (req, res) => {
    const oneMake = await Make.find({ abbreviation: req.params.abbreviation })
    const allModelsByMake = await Model.find({ makeId: oneMake.id })
    res.json(allModelsByMake)
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
        res.json(allModels)

    } else if (make === "All" && (sort === -1 || sort === 1)) {
        const allModels = await Model.find().populate('makeId').sort({ productionStart: sort }).limit(5).skip((page - 1) * 5)
        res.json(allModels)
    }
})

exports.getOneModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    const oneModelPopulated = await Model.findOne({ _id: id }).populate('makeId')
    res.json(oneModelPopulated)
})
// add checks for valid id there

exports.updateModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    const foundModel = await Model.findOneAndUpdate({ _id: id }, { productionStart: req.body.productionStart })

    res.json('Successfully updated production start year.')
})

exports.deleteModel = wrapAsync(async (req, res) => {
    const { id } = req.params
    if (isValidObjectId(id)) {
        const deletedModel = await Model.findOneAndDelete({ _id: id })
        res.status(200).json('Successfully deleted a model.')
    } else {
        res.status(400).json('Please provide a valid model id.')
    }
})

exports.addModel = wrapAsync(async (req, res) => {
    const { name, abbreviation, image, productionStart, make } = req.body

    if (!name) res.status(400).json('Please provide a name.')
    if (!abbreviation) res.status(400).json('Please provide an abbreviation for the model.')
    if (!make) res.status(400).json('Please provide a manufacturer.')
    console.log(make)
    if (make !== 'BMW' && make != 'Toyota' && make !== 'Mercedes' && make !== 'VW' && make !== 'Audi' && make !== 'Ford') res.status(400).json('Please provide a valid make from the dropdown list.')
    if (!image) res.status(400).json('Please provide an image for the specified model.')
    if (isURL(image) === false) res.status(400).json('Please provide a valid image URL.')
    if (!productionStart) res.status(400).json('Please provide a production start year.')
    if (parseInt(productionStart) > 2023 || parseInt(productionStart) < 1930) res.status(400).json('Please provide a valid production start year.')


    const foundMake = await Make.findOne({ abbreviation: make })

    const addedModel = new Model({ name, abbreviation, image, productionStart, makeId: foundMake.id })
    await addedModel.save()
    res.status(201).json({ message: 'Successfully added a new model.', addedModel: addedModel })
})

exports.updateModelFull = wrapAsync(async (req, res) => {
    const { id } = req.params
    const { name, abbreviation, image, productionStart, make } = req.body

    if (isValidObjectId(id)) {
        if (!name) res.status(400).json('Please provide a name.')
        if (!abbreviation) res.status(400).json('Please provide an abbreviation for the model.')
        if (!make) res.status(400).json('Please provide a manufacturer.')
        console.log(make)
        if (make !== 'BMW' && make != 'Toyota' && make !== 'Mercedes' && make !== 'VW' && make !== 'Audi' && make !== 'Ford') res.status(400).json('Please provide a valid make from the dropdown list.')
        if (!image) res.status(400).json('Please provide an image for the specified model.')
        if (isURL(image) === false) res.status(400).json('Please provide a valid image URL.')
        if (!productionStart) res.status(400).json('Please provide a production start year.')
        if (parseInt(productionStart) > 2023 || parseInt(productionStart) < 1930) res.status(400).json('Please provide a valid production start year.')

        const foundMake = await Make.findOne({ abbreviation: make })
        const foundModel = await Model.findOneAndUpdate({ _id: id }, { name, abbreviation, image, productionStart, makeId: foundMake.id })
        res.status(201).json('Successfully updated the model.')
        return
    } else {
        res.status(400).json('Please provide a valid model id.')
    }

})