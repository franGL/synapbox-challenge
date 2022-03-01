const express = require('express');
const mongoose = require('mongoose')
var router = express.Router();

mongoose
	.connect("mongodb://localhost:27017/synapboxdb", { useNewUrlParser: true })
	.then(() => {
		const app = express()

		app.listen(5000, () => {
			console.log('DB has started!')
		})
	})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;