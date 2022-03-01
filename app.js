var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')

var indexRouter = require('./routes/index');

mongoose
	.connect('mongodb://localhost:27017/synapboxdb', { useNewUrlParser: true })
	.then(() => {
		const app = express()

        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.json())
        app.use('/api', indexRouter)

		app.listen(5000, () => {
			console.log('DB has started!')
		})
	})