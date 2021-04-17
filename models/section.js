const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    sectionName: String,
    links: [{
        link: String,
        text: String,
        desc: String
    }]
})

module.exports = mongoose.model('Section', sectionSchema);