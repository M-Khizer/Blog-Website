const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.use(express.json());
require('dotenv').config()

const userRoutes = require('./routes/user')

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  const port = process.env.PORT || 3000


app.use('/users',userRoutes)



app.listen(port,()=>{
    console.log('running',port)
})