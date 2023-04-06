const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const baseSchema = require('./base-schema')

const articleSchema = new mongoose.Schema({
    ...baseSchema,
    "title": {
        type: String,
        require: true,
    },
    "body": {
        type: String,
        require: true,
    },
    "description": {
        type: String,
        require: true,
    },
    "cate_id1": {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
    },
    "cate_id2": {
        type: Schema.Types.ObjectId,
        ref: 'Category',
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

module.exports = articleSchema