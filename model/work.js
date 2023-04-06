const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const baseSchema = require('./base-schema')

const workSchema = new mongoose.Schema({
    ...baseSchema,
    "title": {
        type: String,
        require: true,
    },
    "workUrl": {
        type: String,
        require: true,
    },
    "description": {
        type: String,
        require: true,
    },
    "keyWords": {
        type: [String],
        default: null
    },
    "img": {
        type: String,
        default: null
    }
})

module.exports = workSchema