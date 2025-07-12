const mongoose = require('mongoose');
const { type } = require('os');

const Schema = mongoose.Schema;

const jobDescriptionSchema = new Schema({

    decsription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('JobDescription', jobDescriptionSchema)