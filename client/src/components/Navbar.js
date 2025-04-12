import logo from '../assets/logo.png'; 

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useContext } from 'react';

import AuthContext from "../context/AuthContext";


import { Link } from 'react-router-dom';



const pages = [
  {name:'Dashboard', path:'/dashboard'},
  ];
const settings = [
  { name: 'Profile', path:'/UserProfile'},
  { name: 'Logout',path:'/'}
];


function Navbar() {
  
  const { user, logout } = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async(handleLogout) => {
    if(handleLogout === 'Logout') {
      try {
        await logout();
        console.log("Logout effettuato con successo");
      } catch (error) {
        console.error(error.message);
      }
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#50a6db' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           
          <img //logo immagine
            src={logo}
            alt="Logo"
            style={{ height: 50, marginRight: 0, }}
          />

          <Typography //scritta PlanFriendTrip vicino logo
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  marginLeft:2,
                  color: 'inherit',
                  textDecoration: 'none',
                
              }}
          >
          PlanFriendsTrip
          </Typography>
        

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }} /> {/* Questo spinge IconButton verso destra */}
  
            <IconButton 
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            />

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
         
          
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            PlanFriendsTrip
        </Typography>

        {user && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end'} }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
        </Box>}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

          {user && (
            <Menu //menu con profile e logout
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
            
               {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() =>
                  handleCloseUserMenu(setting.name)} >
                  <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{ textAlign: 'center', margin:0, padding:0 }}>{setting.name}</Typography>
                  </Link>
                </MenuItem> 
              ))}
            </Menu>
              )}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;