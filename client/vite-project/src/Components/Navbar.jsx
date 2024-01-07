import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import AllBlogs from './AllBlogs';

export default function Navbar() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="fixed" sx={{ backgroundColor: '#1976D2', marginBottom:'3rem'}}>
       
        <Toolbar>  
          
          <Typography variant="h6" component={Link} to='/' color='inherit'
                      sx={{ flexGrow: 1, 
                      display: 'flex', 
                      justifyContent: 'flex-start',
                      alignItems: 'center', 
                      gap: '5px',
                      textDecoration:'none'
                      }}>

            <AutoStoriesTwoToneIcon />
            QuickBlogQuest
          </Typography>

          {/* Show the Signup and Login buttons only on larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <Button color="inherit" component={Link} to='/createblogs' 
              sx={{ textDecoration: 'none', color: 'inherit' }}>
                Create Blogs
            </Button>

            <Button color="inherit" component={Link} to='/signup' 
            sx={{ textDecoration: 'none', color: 'inherit' }}>
              Signup
            </Button>

            <Button color="inherit" component={Link} to='/login' 
            sx={{ textDecoration: 'none', color: 'inherit' }}>
              Login
            </Button>

            
          </Box>
          
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) for smaller screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
        
      >
        <List sx={{
          width: '50vw', // Set the width to 50% of the viewport width
          '@media (min-width: 600px)': {
            width: '20vw', // Adjust the width for larger screens
          },
        }}>

          <ListItem button component={Link} to='/signup' onClick={toggleDrawer}>
            <ListItemText primary={
              <Typography variant="button" fontWeight="bold" textTransform="uppercase">
                Signup
              </Typography>
            } />
          </ListItem>

          <ListItem button component={Link} to='/login' onClick={toggleDrawer}>
            <ListItemText primary={
              <Typography variant="button" fontWeight="bold" textTransform="uppercase">
                Login
              </Typography>
            } />
          </ListItem>

          <ListItem button component={Link} to='/createblogs' onClick={toggleDrawer}>

            <ListItemText primary={
              <Typography variant="button" fontWeight="bold" textTransform="uppercase">
                Create Blogs
              </Typography>
            } />
          </ListItem>
        </List>
      </Drawer>

      <Outlet />
      {/* <AllBlogs/> */}
    </Box>
  );
}
