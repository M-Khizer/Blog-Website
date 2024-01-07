
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios'
const BlogForm = () => {

    const [formData, setFormData] = useState({
       title:'',
       content:'',
       author:'',
       image:null
      });
    
      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
      }

      const handleFile = (e)=>{
        setFormData({...formData,image: e.target.files[0]})
      }

    const handleCreateBlog = async(e)=>{
        
      e.preventDefault();

      console.log(formData.author,formData.content,formData.image,formData.title);

      const data = new FormData();

        try{
          
          data.append('title', formData.title);
          data.append('content', formData.content);
          data.append('author', formData.author);
          data.append('image', formData.image);

          console.log(data)

          console.log(data.get('image'));
          console.log(data.get('title'));
          console.log(data.get('author'));
          console.log(data.get('content'));
          
          const res = await axios.post('http://localhost:5001/blog/createBlogs',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
     
          console.log(res.data);

        }
        catch(err){
            console.log(err)
        }
       
    }

  return (
    <Container maxWidth="md" sx={{marginTop:'8rem'}}>
      
      <form onSubmit={handleCreateBlog}>
      
      <Typography component="h1" variant="h4">
          Create Blogs
        </Typography>

        <Grid container spacing={3} style={{ marginTop: '1em', marginBottom: '1em' }}>
          <Grid item xs={12} sm={6}>
            <TextField
                autoFocus
              fullWidth
              label="Title"
              name="title"
              variant="outlined"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              variant="outlined"
              onChange={handleChange}

              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              variant="outlined"
              multiline
              rows={4}
              onChange={handleChange}

              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="file"
              name="image"
              variant="outlined"
              color='primary'
              onChange={handleFile}
              inputProps={{
                accept: 'image/*', // Accept all image file types
              }}
              required
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: '1em' }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BlogForm;
