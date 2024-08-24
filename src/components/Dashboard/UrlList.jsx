import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getUserUrls, redirectUrl } from '../../services/urlService';
import {format} from 'date-fns';

export default function UrlList() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await getUserUrls();
        setUrls(response.data);
      } catch (err) {
        setError('Error fetching URLs. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }} color="primary">
          Your URLs
        </Typography>

        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        ) : (
          <TableContainer component={Paper} sx={{ width: '100%', overflowX: isSmallScreen ? 'auto' : 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: '#ffffff', border: '1px solid white' }}>S.No</TableCell>
                  <TableCell sx={{ color: '#ffffff', border: '1px solid white' }}>Original URL</TableCell>
                  <TableCell sx={{ color: '#ffffff', border: '1px solid white' }}>Short URL</TableCell>
                  <TableCell sx={{ color: '#ffffff', border: '1px solid white' }}>Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {urls.map((url, index) => (
                  <TableRow key={url["_id"]}>
                    <TableCell sx={{ color: '#000', border: '1px solid white' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: '#000', border: '1px solid white' }}>{url.originalURL}</TableCell>
                    <TableCell sx={{ color: '#000', border: '1px solid white' }}>
                      <a
                        href={redirectUrl(url.shortURL)}
                        style={{ color: '#6a1b9a' }}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Redirect to ${url.shortURL}`}
                      >
                        {redirectUrl(url.shortURL)}
                      </a>
                    </TableCell>
                    {console.log(url)}
                    <TableCell sx={{ color: '#000', border: '1px solid white' }}>{format(url.createdAt, "dd/MM/yyyy")}</TableCell>
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
