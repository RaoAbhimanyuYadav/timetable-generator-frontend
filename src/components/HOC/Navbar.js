import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import NITHLogo from "../../assests/nith-logo.png";

const pages = ["Timing", "Year", "Professor", "Subject", "Generate"];
const settings = ["Logout"];

function Navbar() {
  const navigate = useNavigate();

  const authCntxt = React.useContext(AuthContext);
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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", alignItems: "center" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {authCntxt.isLoggedIn && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    key={page}
                    sx={{ minHeight: "auto" }}
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "activeRouteM" : ""
                      }
                      to={`${page.toLowerCase()}`}
                      style={{
                        textAlign: "center",
                        textDecoration: "none",
                        color: "#000",
                        fontFamily: "monospace",
                        fontSize: "12px",
                      }}
                    >
                      {page}s
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            )}
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".05rem",
                fontSize: "16px",
              }}
            >
              TimeTable Generator
            </NavLink>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
            }}
          >
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".05rem",
                fontSize: "24px",
              }}
            >
              TimeTable Generator
            </NavLink>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {authCntxt.isLoggedIn &&
                pages.map((page) => (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "activeRoute" : ""
                    }
                    to={`${page.toLowerCase()}`}
                    key={page}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".05rem",
                      fontSize: "16px",
                      padding: "10px",
                    }}
                  >
                    {page}s
                  </NavLink>
                ))}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="NITH Logo" src={NITHLogo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  sx={{ minHeight: "auto" }}
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (authCntxt.isLoggedIn) authCntxt.logout();
                    else {
                      navigate("/login");
                    }
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "#000",
                      fontFamily: "monospace",
                      fontSize: { xs: "12px", md: "16px" },
                    }}
                  >
                    {authCntxt.isLoggedIn ? setting : "Login"}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
