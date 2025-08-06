
import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, InputBase, Button, Avatar, Fade } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
const fruits = [
  { name: 'Alphonso Mango', price: 120, quantity: '10 kg', farmer: 'Amit Sharma', location: 'Indore', description: 'Fresh mangoes from farm' },
  { name: 'Banana', price: 45, quantity: '15 kg', farmer: 'Rahul Singh', location: 'Bhopal', description: 'Organic bananas' },
  { name: 'Apple', price: 90, quantity: '8 kg', farmer: 'Priya Patel', location: 'Jabalpur', description: 'Premium quality apples' },
  { name: 'Grapes', price: 60, quantity: '12 kg', farmer: 'Sneha Joshi', location: 'Gwalior', description: 'Sweet and juicy grapes' },
  { name: 'Orange', price: 70, quantity: '20 kg', farmer: 'Amit Sharma', location: 'Indore', description: 'Citrus oranges' },
  { name: 'Pineapple', price: 80, quantity: '5 kg', farmer: 'Rahul Singh', location: 'Bhopal', description: 'Fresh pineapples' },
  { name: 'Papaya', price: 50, quantity: '10 kg', farmer: 'Priya Patel', location: 'Jabalpur', description: 'Ripe papayas' },
  { name: 'Watermelon', price: 30, quantity: '25 kg', farmer: 'Sneha Joshi', location: 'Gwalior', description: 'Refreshing watermelons' },
];

export default function FruitListing() {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Fruit Listing" />
      <Box sx={styles.main}>
        <PageHeader title="Fruit Listing" />

        <Grid container spacing={2}>
          {filteredFruits.map((fruit, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={kycCardStyles.card}>
                <Box sx={kycCardStyles.cardHeader}>
                  <Box sx={kycCardStyles.userInfo}>
                    <EmojiFoodBeverageIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    <Typography sx={kycCardStyles.name}>{fruit.name}</Typography>
                  </Box>
                  <IconButton sx={kycCardStyles.deleteBtn}>
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box sx={kycCardStyles.details}>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>💰 Price:</span>
                    <span style={kycCardStyles.value}>₹{fruit.price}/kg</span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>📦 Quantity:</span>
                    <span style={kycCardStyles.value}>{fruit.quantity}</span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#388e3c' }} /> Location:
                    </span>
                    <span style={kycCardStyles.value}>{fruit.location}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: '#64748b', fontSize: '0.9rem' }}>
                    {fruit.description}
                  </Typography>
                </Box>

                <Box sx={kycCardStyles.buttonRow}>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    sx={kycCardStyles.visitBtn}
                  >
                    View Details
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon sx={{ fontSize: 18, color: '#64748b' }} />
                    <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                      {fruit.farmer}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
          
          {/* Add New Fruit Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={kycCardStyles.addCard}>
              <Box sx={kycCardStyles.addCardContent}>
                <AddIcon sx={kycCardStyles.addIcon} />
                <Typography sx={kycCardStyles.addText}>
                  Add New Fruit
                </Typography>
              </Box>
            </Paper>
          </Grid>
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
    backgroundColor: '#F8F9FA',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 3,
  },
  headerTitle: {
    color: '#388e3c',
    letterSpacing: 0.5,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  notificationButton: {
    backgroundColor: '#F8F9FA',
    '&:hover': {
      backgroundColor: '#EDF2F7',
    },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  avatar: {
    bgcolor: '#E3F2FD',
    width: 40,
    height: 40,
  },
  searchIconBtn: {
    backgroundColor: '#F8F9FA',
    '&:hover': {
      backgroundColor: '#EDF2F7',
    },
    mr: 1,
  },
  searchBarBox: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    px: 1,
    width: 220,
    height: 40,
    mr: 1,
  },
  inputBase: {
    ml: 1,
    flex: 1,
    fontSize: 16,
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
  deleteBtn: {
    color: '#ef4444',
    background: 'rgba(239,68,68,0.08)',
    borderRadius: 20,
    width: 36,
    height: 36,
    '&:hover': {
      background: 'rgba(239,68,68,0.12)',
      color: '#dc2626',
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addCard: {
    minHeight: 210,
    border: '2px dashed #388e3c',
    borderRadius: 8,
    width: 380,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 24px 0 rgba(56,142,60,0.08)',
    '&:hover': {
      transform: 'translateY(-4px)',
      borderColor: '#2f6f31',
      background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
      boxShadow: '0 12px 32px 0 rgba(56,142,60,0.12)',
    },
  },
  addCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addIcon: {
    fontSize: 48,
    color: '#388e3c',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'rotate(90deg)',
    },
  },
  addText: {
    color: '#388e3c',
    fontWeight: 600,
    fontSize: 18,
  },
};
