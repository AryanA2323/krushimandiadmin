import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  IconButton, 
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';


export default function BuyerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsRef = collection(db, 'requests');
        const snapshot = await getDocs(requestsRef);
        const requestsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(requestsData);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const formatLocation = (location) => {
    if (typeof location === 'string') return location;
    if (typeof location === 'object') {
      const parts = [];
      if (location.city) parts.push(location.city);
      if (location.district) parts.push(location.district);
      if (location.state) parts.push(location.state);
      return parts.join(', ') || 'Unknown Location';
    }
    return 'Unknown Location';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };



return (
  <Box sx={{ display: 'flex' }}>
    <AdminNavbarSlider />
    <Box sx={styles.pageContainer}>
      <Box sx={styles.headerRow}>
        <IconButton 
          sx={styles.backBtn} 
          onClick={() => navigate('/UserManagement')}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" color="#1976d2">
          Buyer Requests
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {requests.map((request) => (
          <Grid item xs={12} sm={6} lg={4} key={request.id}>
            <Paper sx={styles.requestCard}>
<Box sx={styles.cardHeader}>
  <Box sx={styles.headerLeft}>
    <Avatar sx={styles.avatar}>
      <PersonIcon />
    </Avatar>
    <Box sx={styles.headerInfo}>
      <Typography variant="subtitle1" fontWeight="bold">
        {request.buyerDetails?.name || 'Unknown Buyer'}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {request.buyerDetails?.phone || 'No phone'}
      </Typography>
    </Box>
  </Box>
  <Chip 
    label={request.status || 'Pending'}
    color={
      request.status === 'accepted' ? 'success' : 
      request.status === 'rejected' ? 'error' : 
      'default'
    }
    size="small"
    sx={{ 
      bgcolor: request.status === 'pending' ? '#f5f5f5' : undefined,
      minWidth: '80px'
    }}
  />
</Box>

                <Box sx={styles.productInfo}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Product:</strong> {request.productSnapshot?.name || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {request.productSnapshot?.category || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> ₹{request.productSnapshot?.price || 0}/{request.productSnapshot?.priceUnit || 'unit'}
                  </Typography>
                  {request.productSnapshot?.quantity && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Quantity:</strong> {request.productSnapshot.quantity[0]} - {request.productSnapshot.quantity[1]} {request.productSnapshot?.quantityUnit || 'units'}
                    </Typography>
                  )}
                </Box>

                <Box sx={styles.farmerInfo}>
                  <Typography variant="body2">
                    <PersonIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                    <strong>Farmer:</strong> {request.productSnapshot?.farmerName || 'Unknown'}
                  </Typography>
                  <Typography variant="body2">
                    <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                    {formatLocation(request.productSnapshot?.farmerLocation)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    Requested on: {formatTimestamp(request.createdAt)}
                  </Typography>
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
  pageContainer: {
    flexGrow: 1,
    p: 3,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    width: '100%',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
  },
  backBtn: {
    mr: 2,
  },
  requestCard: {
    height: '400px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    p: 2,
    borderRadius: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transform: 'translateY(-2px)',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    p: 1.5,
    borderBottom: '1px solid #eee',
    minHeight: '80px',
  },
  avatar: {
    bgcolor: '#1976d2',
  },
 headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    p: 1.5,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
    },
  },
  farmerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    p: 1.5,
    borderTop: '1px solid #eee',
    backgroundColor: '#f8faf8',
    minHeight: '100px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};