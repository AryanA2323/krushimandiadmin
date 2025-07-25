import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';

const customers = [
  { name: 'Ravi Kumar', joined: '2023-05-10', city: 'Indore', bg: '#e6f1fb' },
  { name: 'Meena Gupta', joined: '2022-12-22', city: 'Bhopal', bg: '#fdfbe6' },
  { name: 'Suresh Verma', joined: '2023-03-18', city: 'Jabalpur', bg: '#e6f1fb' },
  { name: 'Ravi Kumar', joined: '2023-05-10', city: 'Indore', bg: '#e6f1fb' },
  { name: 'Meena Gupta', joined: '2022-12-22', city: 'Bhopal', bg: '#fdfbe6' },
  { name: 'Suresh Verma', joined: '2023-03-18', city: 'Jabalpur', bg: '#e6f1fb' },
  { name: 'Ravi Kumar', joined: '2023-05-10', city: 'Indore', bg: '#e6f1fb' },
  { name: 'Meena Gupta', joined: '2022-12-22', city: 'Bhopal', bg: '#fdfbe6' },
  { name: 'Suresh Verma', joined: '2023-03-18', city: 'Jabalpur', bg: '#e6f1fb' },
  { name: 'Anita Sharma', joined: '2023-07-05', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Vikas Jain', joined: '2023-08-21', city: 'Indore', bg: '#e6f1fb' },
  { name: 'Pooja Singh', joined: '2023-09-12', city: 'Bhopal', bg: '#fdfbe6' },
  { name: 'Anita Sharma', joined: '2023-07-05', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Vikas Jain', joined: '2023-08-21', city: 'Indore', bg: '#e6f1fb' },
  { name: 'Pooja Singh', joined: '2023-09-12', city: 'Bhopal', bg: '#fdfbe6' },
  { name: 'Anita Sharma', joined: '2023-07-05', city: 'Gwalior', bg: '#fdfbe6' },
  { name: 'Vikas Jain', joined: '2023-08-21', city: 'Indore', bg: '#e6f1fb' },
  { name: 'Pooja Singh', joined: '2023-09-12', city: 'Bhopal', bg: '#fdfbe6' },
];

// ...existing imports...

export default function Customers() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Customers" />
      <Box sx={styles.main}>
        <Box sx={styles.headerRow}>
          <IconButton sx={styles.backBtn} onClick={() => navigate('/UserManagement')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" color="#1976d2" sx={{ ml: 2 }}>
            Verified Customers
          </Typography>
          <Box sx={{ flexGrow: 1 }}  />
          <TextField
            label="Search Customers"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={styles.searchBox}
          />
        </Box>
        <Grid container spacing={2} mt={1}>
          {filteredCustomers.map((customer, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Paper sx={{ ...styles.card, background: customer.bg }}>
                <Box sx={styles.customerInfo}>
                  <PersonIcon sx={styles.icon} />
                  <Box>
                    <Typography fontWeight="bold" color="#1976d2">{customer.name}</Typography>
                    <Box sx={styles.infoRow}>
                      <CalendarMonthIcon sx={styles.infoIcon} />
                      <Typography variant="body2" color="text.secondary">
                        Joined: <span style={{ color: '#1976d2', fontWeight: 500 }}>{customer.joined}</span>
                      </Typography>
                    </Box>
                    <Box sx={styles.infoRow}>
                      <LocationOnIcon sx={styles.infoIcon} />
                      <Typography variant="body2" color="text.secondary">
                        City: <span style={{ color: '#1976d2', fontWeight: 500 }}>{customer.city}</span>
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
    bgcolor: '#e6f1fb',
    color: '#1976d2',
    borderRadius: 2,
    ml: 2,
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
  customerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    color: '#1976d2',
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
    bgcolor: '#e6f1fb',
    color: '#1976d2',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    px: 2,
    py: 1,
    ml: 5,
    mt: 1,
  },
};