import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';

const kycRequests = [
  {
    name: 'Amit Sharma',
    phone: '9876543210',
    address: '123 Green Lane',
    city: 'Indore',
    date: '2025-07-20',
  },
  {
    name: 'Priya Patel',
    phone: '9876543211',
    address: '456 Blue Street',
    city: 'Bhopal',
    date: '2025-07-18',
  },
  {
    name: 'Rahul Singh',
    phone: '9876543212',
    address: '789 Red Avenue',
    city: 'Jabalpur',
    date: '2025-07-15',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
  {
    name: 'Sneha Joshi',
    phone: '9876543213',
    address: '321 Yellow Road',
    city: 'Gwalior',
    date: '2025-07-10',
  },
];

export default function Farmer_KYC() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredRequests = kycRequests.filter(req =>
    req.name.toLowerCase().includes(search.toLowerCase()) ||
    req.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Farmer KYC Requests" />
      <Box sx={styles.main}>
        <Box sx={styles.headerRow}>
          <IconButton sx={styles.backBtn} onClick={() => navigate('/UserManagement')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" color="success.main" sx={{ ml: 2 }}>
            Farmer KYC Requests
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search Requests"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={styles.searchBox}
          />
        </Box>
        <Grid container spacing={2} mt={1}>
          {filteredRequests.map((req, idx) => (
            <Grid item xs={12} md={4} key={idx}> 
              <Paper sx={kycCardStyles.card}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    <Typography fontWeight="bold" color="success.main">
                      {req.name}
                    </Typography>
                  </Box>
                  <Button
                    startIcon={<DescriptionIcon />}
                    sx={kycCardStyles.docBtn}
                  >
                    View Documents
                  </Button>
                </Box>
                <Typography variant="body2" mt={1}>
                  <span style={{ color: '#757575' }}>📞 Phone:</span> <span style={{ color: '#388e3c', fontWeight: 500 }}>{req.phone}</span>
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: '#757575' }}>🏠 Address:</span> <span style={{ color: '#388e3c', fontWeight: 500 }}>{req.address}</span>
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: '#757575' }}> <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#388e3c' }} /> City:</span> <span style={{ color: '#388e3c', fontWeight: 500 }}>{req.city}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date of request: {req.date}
                </Typography>
                <Box sx={kycCardStyles.buttonRow}>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    sx={kycCardStyles.visitBtn}
                  >
                    View Profile
                  </Button>
                  <Button variant="contained" color="success" sx={kycCardStyles.acceptBtn}>
                    Approve
                  </Button>
                  <Button variant="contained" color="error" sx={kycCardStyles.rejectBtn}>
                    Reject
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// Use the same styles as FarmerRequest for layout, add new for card
const styles = {
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    p: 4,
    marginLeft: '80px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  backBtn: {
    bgcolor: '#e6f7ee',
    color: 'success.main',
    borderRadius: 2,
  },
  searchBox: {
    mb: 2,
    width: '100%',
    maxWidth: 400,
    background: '#fff',
  },
};

const kycCardStyles = {
  card: {
    p: 2,
    mb: 2,
    borderRadius: 3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: 350,
    minHeight: 170,
    position: 'relative',
    background: '#e6f7ee',
  },
  docBtn: {
    color: '#1976d2',
    fontWeight: 'bold',
    background: '#e6f7ff',
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      background: '#cce6ff',
      color: '#1976d2',
      boxShadow: 'none',
    },
  },
  buttonRow: {
    display: 'flex',
    gap: 1,
    mt: 2,
    height: 40,
  },
  visitBtn: {
    background: '#a8e7c5ff',
    color: '#388e3c',
    fontWeight: 'bold',
    boxShadow: 'none',
    fontSize: 12,
    '&:hover': {
      background: '#c8f0d2',
      color: '#388e3c',
      boxShadow: 'none',
    },
  },
  acceptBtn: {
    fontWeight: 'bold',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  rejectBtn: {
    fontWeight: 'bold',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
};