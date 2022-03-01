const mongoose = require('mongoose')

const schema = mongoose.Schema({
	_id: Number,
	label: String,
})

module.exports = mongoose.model('Tree', schema)