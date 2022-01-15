import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { UserContext } from "../Utils/AuthAtApp";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("userToken");
    setUser();
    navigate("/", { replace: true });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: "auto", display: { xs: "flex", md: "flex" } }}>
            GetMyQontacts
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Link
              to='/'
              onClick={handleCloseNavMenu}
              style={{
                margin: "0 20px 0 20px",
                color: "white",
                display: "block",
                textDecoration: "none",
                alignSelf: "center",
              }}>
              Quick Search
            </Link>
            {user && (
              <Link
                to='/contacts'
                onClick={handleCloseNavMenu}
                style={{
                  margin: "0 20px 0 20px",
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  alignSelf: "center",
                }}>
                My Contacts
              </Link>
            )}
            {user ? (
              <Button
                onClick={signOut}
                style={{
                  margin: "0 20px 0 20px",
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                }}>
                Sign Out
              </Button>
            ) : (
              <Link
                to='/auth'
                onClick={handleCloseNavMenu}
                style={{
                  margin: "0 20px 0 20px",
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  alignSelf: "center",
                }}>
                Sign Up
              </Link>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to='/'
                  onClick={handleCloseNavMenu}
                  style={{
                    margin: "0 4px 0 4px",
                    display: "block",
                    textDecoration: "none",
                    color: "#2196f3",
                  }}>
                  Quick Search
                </Link>
              </MenuItem>
              {user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to='/contacts'
                    onClick={handleCloseNavMenu}
                    style={{
                      margin: "0 4px 0 4px",
                      textDecoration: "none",
                      display: "block",
                      color: "#2196f3",
                    }}>
                    My Contacts
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                {user ? (
                  <div
                    onClick={signOut}
                    style={{
                      margin: "0 4px 0 4px",
                      color: "#2196f3",
                      textDecoration: "none",
                      display: "block",
                    }}>
                    Sign Out
                  </div>
                ) : (
                  <Link
                    to='/auth'
                    onClick={handleCloseNavMenu}
                    style={{
                      margin: "0 4px 0 4px",
                      textDecoration: "none",
                      display: "block",
                      color: "#2196f3",
                    }}>
                    Sign Up
                  </Link>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
