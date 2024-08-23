import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { createShortUrl } from '../../services/urlService';

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Shorten URL
          </Button>
          {shortUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Short URL: 
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
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
