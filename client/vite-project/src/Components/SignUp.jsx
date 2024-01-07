// SignupPage.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CssBaseline, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    signUpUserName: '',
    signUpName: '',
    signUpPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted:', formData);

    try{
        const res = await axios.post('http://localhost:5001/users/signup',{
            name:formData.signUpName,
            username:formData.signUpUserName,
            password:formData.signUpPassword
        })

        toast.success("User created");

    }

    catch(err){
        console.log(err)
        toast.error(err.response.data.message)
    }

};

  return (
    <Container component="main" maxWidth="xs" sx={{marginTop:'8rem'}}>
      <CssBaseline />
     
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Avatar sx={{marginBottom:1,backgroundColor:'red',}}>
            <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
       
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
         
        <TextField
            margin="normal"
            required
            fullWidth
            id="signupname"
            label="Full name"
            name="signUpName"
            autoComplete='none'
            autoFocus
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="signUpUserName"
            autoComplete='none'
            onChange={handleChange}
          />
         
          <TextField
            margin="normal"
            required
            fullWidth
            name="signUpPassword"
            label="Password"
            type="password"
            id="signUpPassword"
            autoComplete='none'
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
