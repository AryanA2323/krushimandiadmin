import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h3" mb={4}>Krushimandi</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/AdminLogin')}>
        Admin
      </Button>
    </Box>
  );
}