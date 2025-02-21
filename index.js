const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const { render } = require('pug');
const debug = require('debug')('app:startup');
const genres = require('./routes/genres')
const home = require('./routes/home')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', home);


app.set('view engine', 'pug');
app.set('views', './views');


if (app.get('env') === 'development'){
    console.log(process.env.NODE_ENV)
    app.use(morgan('tiny'));
    console.log('Morgan is enabled...');
}


const port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log(`listening on port ${port}...`);
})