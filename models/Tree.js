const mongoose = require('mongoose')

const schema = mongoose.Schema({
	_id: Number,
	label: String,
    children:[{ ref: this }],
})

module.exports = mongoose.model('Tree', schema)