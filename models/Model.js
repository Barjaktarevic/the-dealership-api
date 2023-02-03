const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    productionStart: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    makeId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Make',
        required: true
    }
})

const Model = mongoose.model('Model', modelSchema)

module.exports = Model
