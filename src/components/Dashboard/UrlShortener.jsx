import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { createShortUrl, redirectUrl } from '../../services/urlService';

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // For responsive checks

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) {
      setError('Please enter a valid URL.');
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await createShortUrl(originalUrl);
      setShortUrl(response.data.shortUrl);
      setError(''); // Clear previous errors
    } catch (err) {
      setError('Error creating short URL. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth={isSmallScreen ? "xs" : "sm"}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 1,
          boxShadow: 3
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          URL Shortener
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          <TextField
            label="Original URL"
            variant="outlined"
            fullWidth
            required
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            sx={{ mb: 2 }}
            color="primary"
            aria-label="Original URL"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            aria-label="Shorten URL"
          >
            Shorten URL
          </Button>
          {shortUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" color="text.primary">
                Short URL: 
                <a
                  href={redirectUrl(shortUrl)}
                  target="_blank"
                  style={{ color: '#6a1b9a' }}
                  rel="noopener noreferrer"
                  aria-label={`Redirect to ${shortUrl}`}
                >
                  {shortUrl}
                </a>
              </Typography>
            </Box>
          )}
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
