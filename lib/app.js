const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/error');


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const tours = require('./routes/tours');
app.use('/api/tours', tours);

app.use(handler);

module.exports = app;
