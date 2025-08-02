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
                <Box sx={kycCardStyles.cardHeader}>
                  <Box sx={kycCardStyles.userInfo}>
                    <PersonIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    <Typography sx={kycCardStyles.name}>{req.name}</Typography>
                  </Box>
                  <Button
                    startIcon={<DescriptionIcon />}
                    sx={kycCardStyles.docBtn}
                  >
                    View Documents
                  </Button>
                </Box>
                <Box sx={kycCardStyles.details}>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>📞 Phone:</span>
                    <span style={kycCardStyles.value}>{req.phone}</span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>🏠 Address:</span>
                    <span style={kycCardStyles.value}>{req.address}</span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#388e3c' }} /> City: <span style={kycCardStyles.value}>{req.city}</span>
                    </span>
                    
                  </Typography>
                  <Typography sx={kycCardStyles.date}>
                    <CalendarMonthIcon sx={{ fontSize: 16, color: '#64748b' }} />
                    {req.date}
                  </Typography>
                </Box>
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
    marginLeft: '10px',
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
    p: 0,
    mb: 3,
    borderRadius: 8,
    boxShadow: '0 4px 24px 0 rgba(56,142,60,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: 380,
    minHeight: 210,
    position: 'relative',
    background: 'linear-gradient(135deg, #f8faf8 0%, #ffffff 100%)',
    border: '1px solid rgba(56,142,60,0.12)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px 0 rgba(56,142,60,0.12)',
      borderColor: '#388e3c',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2.5,
    pt: 2,
    pb: 1.5,
    background: 'linear-gradient(90deg, rgba(56,142,60,0.08) 0%, rgba(56,142,60,0.02) 100%)',
    borderBottom: '1px solid rgba(56,142,60,0.08)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  name: {
    fontWeight: 600,
    color: '#2f3542',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  docBtn: {
    color: '#1976d2',
    fontWeight: 500,
    background: 'rgba(25,118,210,0.08)',
    borderRadius: 20,
    textTransform: 'none',
    boxShadow: 'none',
    fontSize: 13,
    px: 2,
    py: 0.5,
    '&:hover': {
      background: 'rgba(25,118,210,0.12)',
      color: '#1976d2',
    },
  },
  details: {
    px: 2.5,
    pt: 2,
    pb: 1.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.2,
    background: 'transparent',
  },
  label: {
    color: '#64748b',
    fontWeight: 500,
    fontSize: 13,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
  },
  value: {
    color: '#334155',
    fontWeight: 500,
    fontSize: 14,
    ml: 0.5,
  },
  date: {
    color: '#64748b',
    fontSize: 12.5,
    mt: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  buttonRow: {
    display: 'flex',
    gap: 1,
    px: 2.5,
    pb: 2,
    pt: 1.5,
    mt: 'auto',
    background: 'linear-gradient(90deg, rgba(56,142,60,0.04) 0%, rgba(56,142,60,0.01) 100%)',
    borderTop: '1px solid rgba(56,142,60,0.08)',
  },
  visitBtn: {
    background: 'rgba(25,118,210,0.08)',
    color: '#1976d2',
    fontWeight: 500,
    boxShadow: 'none',
    fontSize: 13,
    textTransform: 'none',
    borderRadius: 20,
    px: 2,
    '&:hover': {
      background: 'rgba(25,118,210,0.12)',
      color: '#1976d2',
    },
  },
  acceptBtn: {
    background: 'rgba(67,160,71,0.9)',
    color: '#fff',
    fontWeight: 500,
    boxShadow: 'none',
    fontSize: 13,
    textTransform: 'none',
    borderRadius: 20,
    px: 2,
    '&:hover': {
      background: 'rgba(67,160,71,1)',
    },
  },
  rejectBtn: {
    background: 'rgba(229,57,53,0.9)',
    color: '#fff',
    fontWeight: 500,
    boxShadow: 'none',
    fontSize: 13,
    textTransform: 'none',
    borderRadius: 20,
    px: 2,
    '&:hover': {
      background: 'rgba(229,57,53,1)',
    },
  },
};