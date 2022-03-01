const mongoose = require('mongoose')

const schema = mongoose.Schema({
	_id: {
        type: Number,
        unique: true
    },
	label: String,
    children:[{ ref: this }],
})

module.exports = mongoose.model('Tree', schema)