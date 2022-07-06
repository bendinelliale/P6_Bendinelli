// MONGODB mongodb+srv://<username>:<password>@cluster0.zamo6.mongodb.net/?retryWrites=true&w=majority
//MONGODB PASSWORD: cdF7C.ZafY3yggX


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
//mongoose.connect('mongodb+srv://abendinelli:<cdF7C.ZafY3yggX>@cluster0-pme76.mongodb.net/test?retryWrites=true')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
mongoose.connect(process.env.DbPath)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use(express.json());



app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;