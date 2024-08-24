import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    setSnackbar({
      open: true,
      message: 'Are you sure you want to log out?',
      severity: 'warning',
    });
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
        <Toolbar
          sx={{
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: isSmallScreen ? 'center' : 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isSmallScreen ? 'center' : 'flex-start', flexGrow: 1 }}>
            {token && user && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Avatar
                  sx={{ bgcolor: 'blueviolet', marginRight: 1 }}
                  alt={user.name}
                  src={user.profilePic}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Typography variant="body1" color="inherit">
                  {user.name}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
              <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                URL Shortener
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isSmallScreen ? 'center' : 'flex-end', flexGrow: 1 }}>
            {token ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  Dashboard
                </Button>
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ color: '#6a1b9a' }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  }}
                >
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          action={
            snackbar.severity === 'warning' ? (
              <Button
                color="inherit"
                size="small"
                onClick={confirmLogout}
              >
                Confirm
              </Button>
            ) : null
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Navbar;
