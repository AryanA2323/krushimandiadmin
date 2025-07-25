import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpaIcon from '@mui/icons-material/Spa';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';

const farmers = [
  { name: 'Amit Sharma', joined: '2023-04-12', city: 'Indore', bg: '#e6f7ee' },
  { name: 'Priya Patel', joined: '2022-11-03', city: 'Bhopal', bg: '#f8fbe6' },
  { name: 'Rahul Singh', joined: '2024-01-20', city: 'Jabalpur', bg: '#e6f1fb' },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Sneha Joshi', joined: '2023-09-15', city: 'Gwalior', bg: '#fdfbe6' },
];
// ...existing imports...

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
            <Grid item xs={12} md={6} key={idx}>
              <Paper sx={{ ...styles.card, background: farmer.bg }}>
                <Box sx={styles.farmerInfo}>
                  <SpaIcon sx={styles.icon} />
                  <Box>
                    <Typography fontWeight="bold" color="success.main">{farmer.name}</Typography>
                    <Box sx={styles.infoRow}>
                      <CalendarMonthIcon sx={styles.infoIcon} />
                      <Typography variant="body2" color="text.secondary">
                        Joined: <span style={{ color: '#388e3c', fontWeight: 500 }}>{farmer.joined}</span>
                      </Typography>
                    </Box>
                    <Box sx={styles.infoRow}>
                      <LocationOnIcon sx={styles.infoIcon} />
                      <Typography variant="body2" color="text.secondary">
                        City: <span style={{ color: '#388e3c', fontWeight: 500 }}>{farmer.city}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <IconButton sx={styles.viewBtn}>
                    <BlockIcon />
                    <Typography variant="body2" fontWeight="bold" ml={1}>Block</Typography>
                  </IconButton>
                  <IconButton sx={styles.viewBtn}>
                    <VisibilityIcon />
                    <Typography variant="body2" fontWeight="bold" ml={1}>View</Typography>
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// ...styles unchanged...


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
    // justifyContent: 'space-between',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    mb: 2,
    borderRadius: 3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
    px: 2,
    py: 1,
    ml: 5,
    mt: 1,
  },
};