const mongoose = require('mongoose');

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    founded: {
        type: Number,
        required: true
    },
    headquarters: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
})
const Make = mongoose.model('Make', makeSchema)

module.exports = Make
