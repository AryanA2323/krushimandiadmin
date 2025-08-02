import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpaIcon from '@mui/icons-material/Spa';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import StarIcon from '@mui/icons-material/Star';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person'; // <-- Add this import

const farmers = [
  { name: 'Amit Sharma', joined: '2023-04-12', city: 'Indore', bg: '#e6f7ee', rating: 4.8 },
  { name: 'Priya Patel', joined: '2022-11-03', city: 'Bhopal', bg: '#f8fbe6', rating: 4.7 },
  { name: 'Rahul Singh', joined: '2024-01-20', city: 'Jabalpur', bg: '#e6f1fb', rating: 4.9 },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
];

export default function Farmers() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Farmers" />
      <Box sx={styles.main}>
        <Box sx={styles.headerRow}>
          <IconButton sx={styles.backBtn} onClick={() => navigate('/UserManagement')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" color="success.main" sx={{ ml: 2 }}>
            Verified Farmers
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search Farmers"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={styles.searchBox}
          />
        </Box>
        <Grid container spacing={2} mt={1}>
          {filteredFarmers.map((farmer, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={kycCardStyles.card}>
                <Box sx={kycCardStyles.cardHeader}>
                  <Box sx={kycCardStyles.userInfo}>
                    <PersonIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    <Typography sx={kycCardStyles.name}>{farmer.name}</Typography>
                  </Box>
                  <Button
                    startIcon={<DescriptionIcon />}
                    sx={kycCardStyles.docBtn}
                  >
                    View Profile
                  </Button>
                </Box>
                <Box sx={kycCardStyles.details}>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <CalendarMonthIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#388e3c' }} /> Joined: {farmer.joined}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#388e3c' }} /> City: {farmer.city}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <StarIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#facc15' }} /> Rating: {farmer.rating}
                    </span>
                  </Typography>
                </Box>
                <Box sx={kycCardStyles.buttonRow}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={kycCardStyles.rejectBtn}
                    startIcon={<BlockIcon />}
                  >
                    Block
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    sx={kycCardStyles.visitBtn}
                  >
                    View
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
    // ml: 2,
  },
  searchBox: {
    mb: 2,
    width: '100%',
    maxWidth: 400,
    background: '#fff',
  },
  card: {
    width: 360,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    mb: 2,
    borderRadius: 3,
    boxShadow: '5 2px 8px rgba(0,0,0,0.04)',
  },
  farmerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    color: 'success.main',
    fontSize: 32,
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mt: 0.5,
  },
  infoIcon: {
    fontSize: 18,
    color: 'grey.600',
  },
  viewBtn: {
    bgcolor: '#e6f7ee',
    color: 'success.main',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    px: 2,
    py: 1,
    ml: 5,
    mt: 1,
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