import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, InputBase, alpha, styled } from '@mui/material';
import CreateBlogModal from '../Pages/CreateBlog';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.10),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '70%',
  marginLeft: '50px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '70%',
    [theme.breakpoints.up('md')]: {
      width: '45ch',
    },
  }
}));

function Navbar({ handleTrigger }) {


  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("q");
  const [searchBar, setSearchBar] = useState(initialSearch || "");

  useEffect(() => {
    let params = {}
    searchBar && (params.q = searchBar)
    setSearchParams(params);
  }, [searchBar])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/signin")
  }

  const token = localStorage.getItem("token");
  const username=localStorage.getItem("username");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BlogApp
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" p={2} width={"60%"}>
            <Search>
              <SearchIconWrapper>
                <IconButton type="button" aria-label="search"><SearchIcon /></IconButton>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => { setSearchBar(e.target.value) }}
                value={searchBar}
              />
            </Search>
          </Box>
          <CreateBlogModal handleTrigger={handleTrigger} />
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{color:"#138ef2"}} alt="Remy Sharp" >
                  {username[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            {token ? <Menu
              sx={{ mt: '45px' }}
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
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" sx={{ textDecoration: 'none', color: 'black' }} onClick={() => { navigate("/userblog") }}>My Blog</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}><Typography textAlign="center" sx={{ textDecoration: 'none', color: 'black' }}>profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}> <Typography textAlign="center" sx={{ textDecoration: 'none', color: 'black' }} onClick={handleLogout}>Logout</Typography>
              </MenuItem></Menu> :
              <Menu
                sx={{ mt: '45px' }}
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
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{ textDecoration: 'none', color: 'black' }} onClick={() => { navigate("/signin") }}>SignIn</Typography></MenuItem>
                <MenuItem onClick={handleCloseUserMenu}><Typography textAlign="center" sx={{ textDecoration: 'none', color: 'black' }} onClick={() => { navigate("/signup") }}>SignUp</Typography></MenuItem>

              </Menu>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Navbar;
