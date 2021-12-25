const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');


// Initilize the app
const app = express();

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/react-query')
    .then(() =>  console.log('Database is connected'))
    .catch(error => console.log(error.message))


// Imports App Routes
const postRoutes = require('./routes/post');


// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));


// App Routes;
app.use('/post', postRoutes);


// server configuration
const port = 8000;
app.listen(port, () => {
    console.log(`Server is playing at ${port}`)
})
