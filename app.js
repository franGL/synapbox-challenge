var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')

var indexRouter = require('./routes/index');

// Before Node 17 -> localhost
// On, After Node 17 -> 127.0.0.1
mongoose
	.connect('mongodb://127.0.0.1:27017/synapboxdb', { useNewUrlParser: true })
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
	}).catch(reason => console.log(reason))