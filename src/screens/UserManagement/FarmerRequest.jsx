import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
    name: 'Amit Sharma',
    item: 'Tomato',
    price: 22,
    date: '2025-07-20',
    city: 'Indore',
    blocked: false,
  },
  {
    name: 'Amit Sharma',
    item: 'Tomato',
    price: 22,
    date: '2025-07-20',
    city: 'Indore',
    blocked: false,
  },
  {
    name: 'Amit Sharma',
    item: 'Tomato',
    price: 22,
    date: '2025-07-20',
    city: 'Indore',
    blocked: false,
  },
  {
    name: 'Amit Sharma',
    item: 'Tomato',
    price: 22,
    date: '2025-07-20',
    city: 'Indore',
    blocked: false,
  },
  {
    name: 'Amit Sharma',
    item: 'Tomato',
    price: 22,
    date: '2025-07-20',
    city: 'Indore',
    blocked: false,
  },
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
                  <Typography fontWeight="bold" color="success.main" fontSize={18}>
                    {req.name}
                  </Typography>
                  <Typography sx={styles.blockText}>Block</Typography>
                </Box>
                <Typography variant="body2" mt={1} mb={1} mt={2}> 
                  Wants to list: <span style={{ color: '#388e3c', fontWeight: 500 }}>{req.item}</span>
                </Typography>
                <Typography variant="body2" mb={1}>
                  Price per kg: <span style={{ color: '#388e3c', fontWeight: 500 }}>₹{req.price}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary" >
                  <CalendarMonthIcon sx={{ fontSize: 16, color: '#64748b' }} /> {req.date}
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
  card: {
    p: 0,
    mb: 3,
    borderRadius: 8,
    padding: 2, 
    boxShadow: '0 4px 24px 0 rgba(56,142,60,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: 355,
    minHeight: 210,
    position: 'relative',
    background: 'linear-gradient(135deg, #e6f7ee 0%, #ffffff 100%)',
    border: '1px solid rgba(56,142,60,0.12)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px 0 rgba(56,142,60,0.12)',
      borderColor: '#388e3c',
    },
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
    borderRadius: 10,
    px: 2,
    '&:hover': {
      background: 'rgba(229,57,53,1)',
    },
  }
};