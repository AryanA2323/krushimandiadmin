import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const requests = [
  {
    name: 'Amit Sharma',
    item: 'Tomato',
    price: 22,
    date: '2025-07-20',
    city: 'Indore',
    blocked: false,
  },
  {
    name: 'Priya Patel',
    item: 'Potato',
    price: 18,
    date: '2025-07-18',
    city: 'Bhopal',
    blocked: false,
  },
  {
    name: 'Rahul Singh',
    item: 'Onion',
    price: 25,
    date: '2025-07-15',
    city: 'Jabalpur',
    blocked: false,
  },
  {
    name: 'Sneha Joshi',
    item: 'Carrot',
    price: 30,
    date: '2025-07-10',
    city: 'Gwalior',
    blocked: false,
  },
];

export default function FarmerRequest() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredRequests = requests.filter(req =>
    req.name.toLowerCase().includes(search.toLowerCase()) ||
    req.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Farmer Listing Requests" />
      <Box sx={styles.main}>
        <Box sx={styles.headerRow}>
          <IconButton sx={styles.backBtn} onClick={() => navigate('/UserManagement')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" color="success.main" sx={{ ml: 2 }}>
            Farmer Listing Requests
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
            <Grid item xs={12} md={6} key={idx}>
              <Paper sx={styles.card}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography fontWeight="bold" color="success.main">
                    {req.name}
                  </Typography>
                  <Typography sx={styles.blockText}>Block</Typography>
                </Box>
                <Typography variant="body2" mt={1}>
                  Wants to list: <span style={{ color: '#388e3c', fontWeight: 500 }}>{req.item}</span>
                </Typography>
                <Typography variant="body2">
                  Price per kg: <span style={{ color: '#388e3c', fontWeight: 500 }}>₹{req.price}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date of request: {req.date}
                </Typography>
                <Box sx={styles.buttonRow}>
                  <Button variant="contained" sx={styles.visitBtn}>Visit Profile</Button>
                  <Button variant="contained" color="success" sx={styles.acceptBtn}>Accept</Button>
                  <Button variant="contained" color="error" sx={styles.rejectBtn}>Reject</Button>
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
  card: {
    p: 2,
    mb: 2,
    borderRadius: 3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    minHeight: 170,
    position: 'relative',
  },
  blockText: {
    color: 'error.main',
    fontWeight: 'bold',
    fontSize: 15,
    cursor: 'pointer',
    ml: 2,
  },
  buttonRow: {
    display: 'flex',
    gap: 1,
    mt: 2,
  },
  visitBtn: {
    background: '#e6f7ee',
    color: '#388e3c',
    fontWeight: 'bold',
    boxShadow: 'none',
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