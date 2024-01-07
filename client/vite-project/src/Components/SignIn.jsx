// SignupPage.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CssBaseline, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const Login = () => {

  const [formData, setFormData] = useState({
    logInUserName: '',
    logInPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted:', formData);
    try{
        const res = await axios.post("http://localhost:5001/users/login",{
            username:formData.logInUserName,
            password:formData.logInPassword
        })
        
        console.log(res.data)
       
    }
    catch(err){
        console.log(err)
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

        <Avatar sx={{marginBottom:1,backgroundColor:'green',}}>
            <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Log In
        </Typography>
       
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
         

          <TextField
            margin="normal"
            required
            fullWidth
            id="logInUserName"
            label="Username"
            name="logInUserName"
            autoComplete="logInUserName"
            autoFocus
            onChange={handleChange}
          />
         
          <TextField
            margin="normal"
            required
            fullWidth
            name="logInPassword"
            label="Password"
            type="password"
            id="loginpassword"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
