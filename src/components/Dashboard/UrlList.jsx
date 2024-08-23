import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { getUserUrls, redirectUrl } from '../../services/urlService';

export default function UrlList() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await getUserUrls();
        setUrls(response.data);
      } catch (err) {
        setError('Error fetching URLs');
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }} color="text.primary">
          Your URLs
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Original URL</TableCell>
                  <TableCell>Short URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {urls.map((url, index) => (
                  <TableRow key={url["_id"]}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{url.originalURL}</TableCell>
                    <TableCell>
                      <a href={redirectUrl(url.shortURL)} style={{ color: '#6a1b9a' }} target="_blank" rel="noopener noreferrer">
                        {url.shortURL}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}
