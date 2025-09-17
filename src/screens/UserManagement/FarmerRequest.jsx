import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button, CircularProgress } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';


import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { updateDoc, doc } from 'firebase/firestore';
import { FormControl, Select, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


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
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();




  const [detailsOpen, setDetailsOpen] = useState(false);
const [selectedFruit, setSelectedFruit] = useState(null);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [snackbar, setSnackbar] = useState({
  open: false,
  message: '',
  severity: 'success'
});


const handleCardStatusChange = async (fruitId, newStatus) => {
  try {
    const fruitRef = doc(db, 'fruits', fruitId);
    await updateDoc(fruitRef, {
      status: newStatus,
      updated_at: new Date().toISOString()
    });

    // Update local state
    setFruits(fruits.map(fruit => 
      fruit.id === fruitId 
        ? { ...fruit, status: newStatus }
        : fruit
    ));

    setSnackbar({
      open: true,
      message: 'Status updated successfully!',
      severity: 'success'
    });
  } catch (error) {
    console.error('Error updating status:', error);
    setSnackbar({
      open: true,
      message: 'Failed to update status',
      severity: 'error'
    });
  }
};


const handleViewDetails = (fruit) => {
  setSelectedFruit(fruit);
  setDetailsOpen(true);
};

const handleCloseDetails = () => {
  setDetailsOpen(false);
  setSelectedFruit(null);
  setCurrentImageIndex(0);
};

const handleNextImage = () => {
  if (selectedFruit?.image_urls?.length > 0) {
    setCurrentImageIndex((prev) => 
      prev === selectedFruit.image_urls.length - 1 ? 0 : prev + 1
    );
  }
};

const handlePrevImage = () => {
  if (selectedFruit?.image_urls?.length > 0) {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedFruit.image_urls.length - 1 : prev - 1
    );
  }
};

const handleStatusChange = async (newStatus) => {
  try {
    const fruitRef = doc(db, 'fruits', selectedFruit.id);
    await updateDoc(fruitRef, {
      status: newStatus,
      updated_at: new Date().toISOString()
    });

    // Update local state
    setFruits(fruits.map(fruit => 
      fruit.id === selectedFruit.id 
        ? { ...fruit, status: newStatus }
        : fruit
    ));
    setSelectedFruit({ ...selectedFruit, status: newStatus });

    setSnackbar({
      open: true,
      message: 'Status updated successfully!',
      severity: 'success'
    });
  } catch (error) {
    console.error('Error updating status:', error);
    setSnackbar({
      open: true,
      message: 'Failed to update status',
      severity: 'error'
    });
  }
};

const handleSnackbarClose = () => {
  setSnackbar({ ...snackbar, open: false });
};







  useEffect(() => {
    const fetchFruits = async () => {
      try {
        setLoading(true);
        const fruitsRef = collection(db, 'fruits');
        const snapshot = await getDocs(fruitsRef);
        const fruitsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFruits(fruitsData);
      } catch (err) {
        console.error('Error fetching fruits:', err);
        setError('Failed to load fruits');
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(search.toLowerCase()) ||
    fruit.type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="success" />
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
          {filteredFruits.map((fruit) => (
            <Grid item xs={12} md={6} key={fruit.id}>
              <Paper sx={styles.card}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  <Typography fontWeight="bold" color="success.main" fontSize={18}>
    {fruit.name}
  </Typography>
  <FormControl size="small" sx={{ minWidth: 100 }}>
    <Select
      value={fruit.status}
      onChange={(e) => handleCardStatusChange(fruit.id, e.target.value)}
      sx={{
        height: '28px',
        fontSize: '0.75rem',
        backgroundColor: fruit.status === 'active' ? '#e6f7ee' : 
                       fruit.status === 'rejected' ? '#ffe8e8' : '#fff8e1',
        color: fruit.status === 'active' ? '#388e3c' : 
               fruit.status === 'rejected' ? '#d32f2f' : '#ed6c02',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        },
        textTransform: 'capitalize'
      }}
    >
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
      <MenuItem value="rejected">Rejected</MenuItem>
    </Select>
  </FormControl>
</Box>
                <Typography variant="body2" mt={2} mb={1}> 
                  Type: <span style={{ color: '#388e3c', fontWeight: 500 }}>{fruit.type}</span>
                </Typography>
                <Typography variant="body2" mb={1}>
                  Price per kg: <span style={{ color: '#388e3c', fontWeight: 500 }}>₹{fruit.price_per_kg}</span>
                </Typography>
                <Typography variant="body2" mb={1}>
                  Quantity: <span style={{ color: '#388e3c', fontWeight: 500 }}>
                    {fruit.quantity[0]} - {fruit.quantity[1]} kg
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  <LocationOnIcon sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }} />
                  {`${fruit.location.district}, ${fruit.location.state}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {fruit.description}
                </Typography>
                <Box sx={styles.buttonRow}>
                  <Button 
                    variant="contained" 
                    sx={styles.visitBtn} 
                    onClick={() => handleViewDetails(fruit)}
                  >
                    View Details
                  </Button>
                  <Button variant="contained" color="success" sx={styles.acceptBtn}>Accept</Button>
                  <Button variant="contained" color="error" sx={styles.rejectBtn}>Reject</Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog
  open={detailsOpen}
  onClose={handleCloseDetails}
  maxWidth="md"
  fullWidth
  sx={{
    '& .MuiDialog-paper': {
      maxHeight: '90vh',
    }
  }}
>
  <DialogTitle sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    pb: 2
  }}>
    <Typography variant="h6" color="primary">
      Fruit Details
    </Typography>
    <IconButton onClick={handleCloseDetails}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent sx={{ mt: 2 }}>
    {selectedFruit && (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Image Slider */}
        <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
          <img
            src={selectedFruit.image_urls[currentImageIndex]}
            alt={`Fruit ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
          {selectedFruit.image_urls.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                sx={detailStyles.arrowButton}
                style={{ left: 16 }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={detailStyles.arrowButton}
                style={{ right: 16 }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Status Update Section */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography sx={detailStyles.label}>Status:</Typography>
  <FormControl size="small" sx={{ minWidth: 100 }}>
    <Select
      value={selectedFruit.status}
      onChange={(e) => handleStatusChange(e.target.value)}
      sx={{
        height: '28px',
        fontSize: '0.75rem',
        backgroundColor: selectedFruit.status === 'active' ? '#e6f7ee' : 
                        selectedFruit.status === 'rejected' ? '#ffe8e8' : '#fff8e1',
        color: selectedFruit.status === 'active' ? '#388e3c' : 
               selectedFruit.status === 'rejected' ? '#d32f2f' : '#ed6c02',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        },
        textTransform: 'capitalize'
      }}
    >
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
      <MenuItem value="rejected">Rejected</MenuItem>
    </Select>
  </FormControl>
</Box>

        {/* Fruit Details */}
        <Box sx={detailStyles.detailRow}>
          <Typography sx={detailStyles.label}>Name:</Typography>
          <Typography sx={detailStyles.value}>{selectedFruit.name}</Typography>
        </Box>

        <Box sx={detailStyles.detailRow}>
          <Typography sx={detailStyles.label}>Type:</Typography>
          <Typography sx={detailStyles.value}>{selectedFruit.type}</Typography>
        </Box>

        <Box sx={detailStyles.detailRow}>
          <Typography sx={detailStyles.label}>Price:</Typography>
          <Typography sx={detailStyles.value}>₹{selectedFruit.price_per_kg}/kg</Typography>
        </Box>

        <Box sx={detailStyles.detailRow}>
          <Typography sx={detailStyles.label}>Quantity Range:</Typography>
          <Typography sx={detailStyles.value}>
            {selectedFruit.quantity[0]} - {selectedFruit.quantity[1]} kg
          </Typography>
        </Box>

        <Box sx={detailStyles.detailRow}>
          <Typography sx={detailStyles.label}>Location:</Typography>
          <Typography sx={detailStyles.value}>
            {selectedFruit.location.city}, {selectedFruit.location.district}, {selectedFruit.location.state}
          </Typography>
        </Box>

        <Box sx={detailStyles.descriptionBox}>
          <Typography sx={detailStyles.label}>Description:</Typography>
          <Typography sx={{ ...detailStyles.value, mt: 1 }}>
            {selectedFruit.description}
          </Typography>
        </Box>
      </Box>
    )}
  </DialogContent>
</Dialog>

<Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Alert 
    onClose={handleSnackbarClose} 
    severity={snackbar.severity}
    sx={{ width: '100%' }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
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
  statusSelect: {
    height: '28px',
    fontSize: '0.75rem',
    '& .MuiSelect-select': {
      padding: '4px 14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid rgba(0, 0, 0, 0.23)'
    },
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
  },
  statusChip: {
    px: 2,
    py: 0.5,
    borderRadius: 1,
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'capitalize'
  }
};
// Add these styles to your existing styles object
const detailStyles = {
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 1,
    borderBottom: '1px solid #e2e8f0',
  },
  label: {
    color: '#64748b',
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  value: {
    color: '#334155',
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  descriptionBox: {
    py: 2,
    borderBottom: '1px solid #e2e8f0',
  },
};