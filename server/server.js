const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const path = require('path')
const Blog = require('./model/blogs')
const cookieParser =  require('cookie-parser')

app.use(cookieParser());

app.use(express.json());
require('dotenv').config()

app.use('/uploads', express.static('uploads')); // Serve uploaded files

app.use(cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')

// app.use('/uploads', upload.single('image'), blogRoutes);


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

app.use('/blog',blogRoutes)

app.listen(port,()=>{
    console.log('running',port)
})