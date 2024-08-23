import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, CircularProgress, CssBaseline, Snackbar, Alert } from '@mui/material';
import UrlShortener from './UrlShortener';
import UrlList from './UrlList';
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
    severity: 'info'
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
          severity: 'error'
        });
      }
    }
    fetchStats();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CssBaseline />
      <Typography variant="h2" color="text.primary" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UrlShortener />
        </Grid>
        <Grid item xs={12} md={6}>
          <UrlList />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          User Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
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
              <CardContent>
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
