import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, CircularProgress, CssBaseline, Snackbar, Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UrlShortener from './UrlShortener';
import { getUserStats } from '../../services/urlService';

function Dashboard() {
  const [stats, setStats] = useState({
    today: 0,
    month: 0,
    loading: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await getUserStats();
        setStats({
          today: response.data.totalUrlsPerDay[0]?.count || 0,
          month: response.data.totalUrlsPerMonth[0]?.count || 0,
          loading: false,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStats({ ...stats, loading: false });
        setSnackbar({
          open: true,
          message: 'Error fetching statistics. Please try again later.',
          severity: 'error',
        });
      }
    }
    fetchStats();
  }, [stats]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CssBaseline />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <UrlShortener />
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          User Statistics
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">URLs Created Today</Typography>
                {stats.loading ? (
                  <Box display="flex" alignItems="center" justifyContent="center" minHeight="100px">
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography variant="h4" color="textPrimary">
                    {stats.today}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">URLs Created This Month</Typography>
                {stats.loading ? (
                  <Box display="flex" alignItems="center" justifyContent="center" minHeight="100px">
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography variant="h4" color="textPrimary">
                    {stats.month}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button component={Link} to="/url-list" variant="contained" color="primary" sx={{ mt: 4 }}>
          View Your URLs
        </Button>
      </Box>
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
    </Container>
  );
}

export default Dashboard;
