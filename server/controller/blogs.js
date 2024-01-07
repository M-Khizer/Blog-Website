
const Blog = require('../model/blogs');

exports.createBlog = async (req, res) => {
  
  try {
    const { title, content, author } = req.body;
    const image = req.file.filename; // Get the uploaded file name

    const cookieToken = req.cookies.token;
    console.log(cookieToken)


    const newBlog = new Blog({
      title,
      content,
      author,
      image
    });

    await newBlog.save();

    res.status(201).json({ message: 'success', newBlog});
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllBlogs = async(req,res)=>{

  try{
    const allBlogs = await Blog.find({});
    // console.log(allBlogs)
    res.status(200).json({
      message:"success",
      allBlogs
    })
  }
  catch(err){
    console.log(err)
  }
 
}