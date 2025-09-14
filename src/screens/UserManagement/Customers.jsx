import React, { useState,useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import StarIcon from '@mui/icons-material/Star';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import CircularProgress from '@mui/material/CircularProgress';


const customers = [
  { name: 'Ravi Kumar', joined: '2023-05-10', city: 'Indore', bg: '#e6f1fb', rating: 4.8 },
  { name: 'Meena Gupta', joined: '2022-12-22', city: 'Bhopal', bg: '#fdfbe6', rating: 4.7 },
  { name: 'Suresh Verma', joined: '2023-03-18', city: 'Jabalpur', bg: '#e6f1fb', rating: 4.9 },
  { name: 'Ravi Kumar', joined: '2023-05-10', city: 'Indore', bg: '#e6f1fb', rating: 4.8 },
  { name: 'Meena Gupta', joined: '2022-12-22', city: 'Bhopal', bg: '#fdfbe6', rating: 4.7 },
  { name: 'Suresh Verma', joined: '2023-03-18', city: 'Jabalpur', bg: '#e6f1fb', rating: 4.9 },
  { name: 'Ravi Kumar', joined: '2023-05-10', city: 'Indore', bg: '#e6f1fb', rating: 4.8 },
  { name: 'Meena Gupta', joined: '2022-12-22', city: 'Bhopal', bg: '#fdfbe6', rating: 4.7 },
  { name: 'Suresh Verma', joined: '2023-03-18', city: 'Jabalpur', bg: '#e6f1fb', rating: 4.9 },
  { name: 'Anita Sharma', joined: '2023-07-05', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Vikas Jain', joined: '2023-08-21', city: 'Indore', bg: '#e6f1fb', rating: 4.7 },
  { name: 'Pooja Singh', joined: '2023-09-12', city: 'Bhopal', bg: '#fdfbe6', rating: 4.8 },
  { name: 'Anita Sharma', joined: '2023-07-05', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Vikas Jain', joined: '2023-08-21', city: 'Indore', bg: '#e6f1fb', rating: 4.7 },
  { name: 'Pooja Singh', joined: '2023-09-12', city: 'Bhopal', bg: '#fdfbe6', rating: 4.8 },
  { name: 'Anita Sharma', joined: '2023-07-05', city: 'Gwalior', bg: '#fdfbe6', rating: 4.6 },
  { name: 'Vikas Jain', joined: '2023-08-21', city: 'Indore', bg: '#e6f1fb', rating: 4.7 },
  { name: 'Pooja Singh', joined: '2023-09-12', city: 'Bhopal', bg: '#fdfbe6', rating: 4.8 },
];

export default function Customers() {

  
    const [search, setSearch] = useState('');
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

 useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true);
        const buyersRef = collection(db, 'buyers');
        const snapshot = await getDocs(buyersRef);
        
        const buyersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setBuyers(buyersData);
      } catch (err) {
        console.error('Error fetching buyers:', err);
        setError('Failed to load buyers');
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const filteredBuyers = buyers.filter(buyer =>
    buyer.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }



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
          {filteredBuyers.map((buyer) => (
            <Grid item xs={12} md={4} key={buyer.id}>
              <Paper sx={kycCardStyles.card}>
                <Box sx={kycCardStyles.cardHeader}>
                  <Box sx={kycCardStyles.userInfo}>
                    <PersonIcon sx={{ color: '#1976d2', fontSize: 28 }} />
                    <Typography sx={kycCardStyles.name}>{buyer.displayName || 'N/A'}</Typography>
                  </Box>
                </Box>
                <Box sx={kycCardStyles.details}>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <CalendarMonthIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#1976d2' }} /> 
                      Joined: {buyer.createdAt ? new Date(buyer.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#1976d2' }} /> 
                      Business: {buyer.businessType || 'N/A'}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <StarIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#facc15' }} /> 
                      Status: {buyer.status || 'N/A'}
                    </span>
                  </Typography>
                </Box>
                <Box sx={kycCardStyles.buttonRow}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={kycCardStyles.rejectBtn}
                    startIcon={<BlockIcon />}
                    // onClick={() => handleBlockUser(buyer.id)}
                  >
                    Block
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    sx={kycCardStyles.visitBtn}
                    // onClick={() => handleViewDetails(buyer.id)}
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
};

const kycCardStyles = {
  card: {
    p: 0,
    mb: 3,
    borderRadius: 8,
    boxShadow: '0 4px 24px 0 rgba(25,118,210,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: 380,
    minHeight: 210,
    position: 'relative',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    border: '1px solid rgba(25,118,210,0.12)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px 0 rgba(25,118,210,0.12)',
      borderColor: '#1976d2',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2.5,
    pt: 2,
    pb: 1.5,
    background: 'linear-gradient(90deg, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0.02) 100%)',
    borderBottom: '1px solid rgba(25,118,210,0.08)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  name: {
    fontWeight: 600,
    color: '#1e293b',
    fontSize: 16,
    letterSpacing: 0.2,
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
  buttonRow: {
    display: 'flex',
    gap: 1,
    px: 2.5,
    pb: 2,
    pt: 1.5,
    mt: 'auto',
    background: 'linear-gradient(90deg, rgba(25,118,210,0.04) 0%, rgba(25,118,210,0.01) 100%)',
    borderTop: '1px solid rgba(25,118,210,0.08)',
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