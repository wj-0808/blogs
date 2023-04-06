const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const baseSchema = require('./base-schema')

const categorySchema = new mongoose.Schema({
    ...baseSchema,
    "name": {
        type: String,
        require: true,
    },
    "parent": {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    "status": {
        type: Boolean,
        default: true
    }
})

module.exports = categorySchema