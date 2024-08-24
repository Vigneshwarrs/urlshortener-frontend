import React from 'react';
import { Container, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import UrlList from './UrlList';

function UrlListPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'block', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          color="primary"
        >
          Back to Dashboard
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UrlList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default UrlListPage;
