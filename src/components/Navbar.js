import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Snackbar, Alert, Avatar, useTheme } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assume user information is stored in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data
    setSnackbar({
      open: true,
      message: 'Logged out successfully.',
      severity: 'success',
    });
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <AppBar position="static" color="primary" sx={{ mb: 2 }}>
        <Toolbar>
          {token && user && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main, marginRight: 1 }}
                alt={user.name}
                src={user.profilePic} // Assuming user object has profilePic field
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="body1" color="inherit">
                {user.name}
              </Typography>
            </Box>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
              URL Shortener
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {token ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard" sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                  Dashboard
                </Button>
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register" sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Navbar;
