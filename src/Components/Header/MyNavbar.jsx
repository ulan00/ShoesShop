import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useSearchParams } from 'react-router-dom';
import { productContext } from '../../Contexts/ProductsContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Break
import { ThemeProvider, createTheme } from '@mui/material/styles';
// break
import "bootstrap/dist/css/bootstrap.min.css";
// Break
import logoImg from '../../Images/logoImg.jpg';
// Break

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
export default function MyNavbar() {
    
  const { cartLength, getProducts, logout, useAuth } = React.useContext(productContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchVal, setSearchVal] = useState(searchParams.get("q") ? searchParams.get("q") : "")
  
  const currentUser = useAuth()
  
  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    setSearchParams({
      "q": searchVal,
      "_limit" : 3,
      "_page": 1
    })
  }, [searchVal])
  
  const handleValue = (e) => {
    const search = new URLSearchParams(window.location.search)
    search.set("q", e.target.value)
    setSearchVal(e.target.value)
    setSearchParams({
      'q': searchVal,
      "_limit": 3,
      "_page": 1
    })
    getProducts()
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/login">
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      </Link>
      <Link to="/register">
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/cart" style={{color: "white"}}>
        <IconButton color="inherit">
            <Badge badgeContent={cartLength} color="secondary">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
      </Link>
        
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Профиль</p>
      </MenuItem>
    </Menu>
  );

  //! Carusel

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon  /> */}
          </IconButton>
          <Link to='/' > 
              <img
                src= {logoImg} 
                alt="logo" 
                style={{maxWidth: '50px'}} /> 
          </Link>
          <Link to='/' style={{marginLeft: '0.6%', textDecoration: 'none', color: 'white'}}>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{display: { xs: 'none', sm: 'block' } }}
          >
              Обувь Shop
          </Typography>
          </Link>
          <Search 
          style={{
            // display: 'flex',
            marginLeft: '25%'
            }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchVal}
              onChange={handleValue}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          
          {currentUser?.email === "admin1@gmail.com" ? (
            <Link to="/add">
              <Button style={{background: "white"}} variant="outlined" color="success">Добавить</Button>
            </Link>
          ) : null}          
          {currentUser?.email}
          {
            currentUser ? (
              <Button variant="success" disabled={!currentUser} onClick={handleLogout}>Log out</Button>
            ) : null 
          }
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/add" style={{color: "white"}}>
                <IconButton>
                    <Badge color="secondary">
                        <AddCircleIcon />
                    </Badge>
                </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/cart" style={{color: "white"}}>
                <IconButton>
                    <Badge badgeContent={cartLength} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      
      {renderMobileMenu}
      {renderMenu}
      
    </Box>

  ); 
};
