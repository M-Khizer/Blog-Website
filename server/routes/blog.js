
const express =  require('express')
const upload = require('../multer')
const { createBlog, getAllBlogs } = require('../controller/blogs')
const router = express.Router()

// const storage = multer.memoryStorage();


router.get('/getAllBlogs',getAllBlogs);
router.post('/createBlogs',upload.single('image'),createBlog);


module.exports = router