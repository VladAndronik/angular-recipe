const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
	name: String,
    category: String,
    date: String,
    description_short:String,
    description_long:[{type:String}],
    author_id: String,
    author_name: String
}, {
	versionKey: false
});

module.exports = mongoose.model('Recipe', Recipe);
