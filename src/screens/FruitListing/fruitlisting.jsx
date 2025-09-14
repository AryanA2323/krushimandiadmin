import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Grid, 
  InputBase, 
  Button, 
  Avatar, 
  Fade,
  CircularProgress,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  InputAdornment
} from '@mui/material';
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
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { deleteDoc, doc } from 'firebase/firestore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




// const fruits = [
//   { name: 'Alphonso Mango', price: 120, quantity: '10 kg', farmer: 'Amit Sharma', location: 'Indore', description: 'Fresh mangoes from farm' },
//   { name: 'Banana', price: 45, quantity: '15 kg', farmer: 'Rahul Singh', location: 'Bhopal', description: 'Organic bananas' },
//   { name: 'Apple', price: 90, quantity: '8 kg', farmer: 'Priya Patel', location: 'Jabalpur', description: 'Premium quality apples' },
//   { name: 'Grapes', price: 60, quantity: '12 kg', farmer: 'Sneha Joshi', location: 'Gwalior', description: 'Sweet and juicy grapes' },
//   { name: 'Orange', price: 70, quantity: '20 kg', farmer: 'Amit Sharma', location: 'Indore', description: 'Citrus oranges' },
//   { name: 'Pineapple', price: 80, quantity: '5 kg', farmer: 'Rahul Singh', location: 'Bhopal', description: 'Fresh pineapples' },
//   { name: 'Papaya', price: 50, quantity: '10 kg', farmer: 'Priya Patel', location: 'Jabalpur', description: 'Ripe papayas' },
//   { name: 'Watermelon', price: 30, quantity: '25 kg', farmer: 'Sneha Joshi', location: 'Gwalior', description: 'Refreshing watermelons' },
// ];

export default function FruitListing() {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(search.toLowerCase())
  );

const [openModal, setOpenModal] = useState(false);
const [newFruit, setNewFruit] = useState({
  name: '',
  type: '',
  description: '',
  price_per_kg: '',
  quantity: [0, 0],
  availability_date: new Date(),
  location: {
    city: '',
    district: '',
    state: '',
    pincode: '',
    lat: 0,
    lng: 0
  },
  status: 'active',
  images: [],
  admin_name: '' 
});
const [imageFiles, setImageFiles] = useState([]);



const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [fruitToDelete, setFruitToDelete] = useState(null);
const [snackbar, setSnackbar] = useState({
  open: false,
  message: '',
  severity: 'success'
});

// Add these functions inside the FruitListing component
const handleDeleteClick = (fruit) => {
  setFruitToDelete(fruit);
  setDeleteDialogOpen(true);
};

const handleDeleteConfirm = async () => {
  if (!fruitToDelete) return;

  try {
    setLoading(true);
    await deleteDoc(doc(db, 'fruits', fruitToDelete.id));
    
    // Update local state
    setFruits(fruits.filter(fruit => fruit.id !== fruitToDelete.id));
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Fruit deleted successfully!',
      severity: 'success'
    });
  } catch (error) {
    console.error('Error deleting fruit:', error);
    setSnackbar({
      open: true,
      message: 'Failed to delete fruit. Please try again.',
      severity: 'error'
    });
  } finally {
    setDeleteDialogOpen(false);
    setFruitToDelete(null);
    setLoading(false);
  }
};

const handleDeleteCancel = () => {
  setDeleteDialogOpen(false);
  setFruitToDelete(null);
};

const handleSnackbarClose = () => {
  setSnackbar({ ...snackbar, open: false });
};





  useEffect(() => {
    const fetchFruits = async () => {
      if (!adminUser) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const fruitsRef = collection(db, 'fruits');
        const snapshot = await getDocs(fruitsRef);
        const fruitsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFruits(fruitsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching fruits:', err);
        setError('Failed to load fruits. Please check your permissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, [adminUser, navigate]);



  useEffect(() => {
  const checkAuth = async () => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (!user || !user.uid) {
      navigate('/login');
      return;
    }
    setAdminUser(user);
  };

  checkAuth();
}, [navigate]);





  

 if (loading) {
    return (
      <Box sx={styles.root}>
        <AdminNavbarSlider selected="Fruit Listing" />
        <Box sx={styles.main}>
          <PageHeader title="Fruit Listing" />
          <Box sx={styles.loadingContainer}>
            <CircularProgress sx={{ color: '#388e3c' }} />
            <Typography sx={{ mt: 2, color: '#64748b' }}>Loading fruits...</Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Add error state
  if (error) {
    return (
      <Box sx={styles.root}>
        <AdminNavbarSlider selected="Fruit Listing" />
        <Box sx={styles.main}>
          <PageHeader title="Fruit Listing" />
          <Box sx={styles.errorContainer}>
            <Typography color="error">{error}</Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

const handleModalOpen = () => setOpenModal(true);
const handleModalClose = () => {
  setOpenModal(false);
  setNewFruit({
    name: '',
    type: '',
    description: '',
    price_per_kg: '',
    quantity: [0, 0],
    availability_date: new Date(),
    location: {
      city: '',
      district: '',
      state: '',
      pincode: '',
      lat: 0,
      lng: 0
    },
    status: 'active',
    images: [],
  });
  setImageFiles([]);
};

const handleImageUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 4) {
    alert('Maximum 4 images allowed');
    return;
  }
  setImageFiles(files);
};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formattedDate = newFruit.availability_date.toISOString();
    
//     const imageUrls = await Promise.all(
//       imageFiles.map(async (file) => {
//         const storageRef = ref(storage, `fruits/${adminUser.uid}/${Date.now()}_${file.name}`);
//         await uploadBytes(storageRef, file);
//         return getDownloadURL(storageRef);
//       })
//     );

//     const fruitData = {
//       name: newFruit.name,
//       type: newFruit.type.toLowerCase(),
//       description: newFruit.description,
//       price_per_kg: Number(newFruit.price_per_kg),
//       quantity: [Number(newFruit.quantity[0]), Number(newFruit.quantity[1])],
//       availability_date: formattedDate,
//       location: {
//         city: newFruit.location.city,
//         district: newFruit.location.district,
//         state: newFruit.location.state,
//         pincode: newFruit.location.pincode,
//         lat: Number(newFruit.location.lat) || 0,
//         lng: Number(newFruit.location.lng) || 0
//       },
//       status: newFruit.status,
//       image_urls: imageUrls, 
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//       likes: 0,
//       views: 0,
//       requestCount: 0,
//       lastRequestAt: new Date()
//     };

//     // Update validation
//     if (!fruitData.admin_name) {
//       throw new Error('Admin name is required');
//     }

//     const docRef = await addDoc(collection(db, 'fruits'), fruitData);
//     setFruits(prevFruits => [...prevFruits, { ...fruitData, id: docRef.id }]);
//     handleModalClose();
    
//   } catch (error) {
//     console.error('Error adding fruit:', error);
//     setError(error.message || 'Failed to add fruit');
//   } finally {
//     setLoading(false);
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Validate required fields first
    if (!adminUser) {
      throw new Error('Please login again');
    }

    if (!imageFiles.length) {
      throw new Error('Please upload at least one image');
    }

    const formattedDate = newFruit.availability_date.toISOString();
    
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const storageRef = ref(storage, `fruits/${adminUser.uid}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })
    );

    const fruitData = {
      name: newFruit.name,
      type: newFruit.type.toLowerCase(),
      description: newFruit.description,
      price_per_kg: Number(newFruit.price_per_kg),
      quantity: [Number(newFruit.quantity[0]), Number(newFruit.quantity[1])],
      availability_date: formattedDate,
      location: {
        city: newFruit.location.city,
        district: newFruit.location.district,
        state: newFruit.location.state,
        pincode: newFruit.location.pincode,
        lat: Number(newFruit.location.lat) || 0,
        lng: Number(newFruit.location.lng) || 0
      },
      status: newFruit.status,
      image_urls: imageUrls,
      admin_name: adminUser.displayName || 'Admin', // Add admin name
      admin_id: adminUser.uid, // Add admin ID for reference
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes: 0,
      views: 0,
      requestCount: 0,
      lastRequestAt: new Date()
    };

    // Validate required fields
    const requiredFields = ['name', 'type', 'description', 'price_per_kg'];
    for (const field of requiredFields) {
      if (!fruitData[field]) {
        throw new Error(`${field.replace('_', ' ')} is required`);
      }
    }

    const docRef = await addDoc(collection(db, 'fruits'), fruitData);
    
    // Update local state and show success message
    setFruits(prevFruits => [...prevFruits, { ...fruitData, id: docRef.id }]);
    setSnackbar({
      open: true,
      message: 'Fruit added successfully!',
      severity: 'success'
    });
    handleModalClose();
    
  } catch (error) {
    console.error('Error adding fruit:', error);
    setSnackbar({
      open: true,
      message: error.message || 'Failed to add fruit',
      severity: 'error'
    });
  } finally {
    setLoading(false);
  }
};



const AddFruitModal = (
  <Modal
    open={openModal}
    onClose={handleModalClose}
    aria-labelledby="add-fruit-modal"
  >
    <Box sx={modalStyles.modal}>
      <Typography variant="h6" sx={{ mb: 2 }}>Add New Fruit</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            label="Fruit Name"
            value={newFruit.name}
            onChange={(e) => setNewFruit({...newFruit, name: e.target.value})}
          />
          
          <TextField
            required
            label="Fruit Type"
            value={newFruit.type}
            onChange={(e) => setNewFruit({...newFruit, type: e.target.value})}
          />

          <TextField
            required
            label="Description"
            multiline
            rows={3}
            value={newFruit.description}
            onChange={(e) => setNewFruit({...newFruit, description: e.target.value})}
          />

          <TextField
            required
            label="Price per kg"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            value={newFruit.price_per_kg}
            onChange={(e) => setNewFruit({...newFruit, price_per_kg: Number(e.target.value)})}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              required
              label="Min Quantity"
              type="number"
              value={newFruit.quantity[0]}
              onChange={(e) => setNewFruit({
                ...newFruit, 
                quantity: [Number(e.target.value), newFruit.quantity[1]]
              })}
            />
            <TextField
              required
              label="Max Quantity"
              type="number"
              value={newFruit.quantity[1]}
              onChange={(e) => setNewFruit({
                ...newFruit, 
                quantity: [newFruit.quantity[0], Number(e.target.value)]
              })}
            />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Availability Date"
              value={newFruit.availability_date}
              onChange={(newValue) => setNewFruit({...newFruit, availability_date: newValue})}
            />
          </LocalizationProvider>

          <TextField
            required
            label="City"
            value={newFruit.location.city}
            onChange={(e) => setNewFruit({
              ...newFruit, 
              location: {...newFruit.location, city: e.target.value}
            })}
          />

          <TextField
            required
            label="District"
            value={newFruit.location.district}
            onChange={(e) => setNewFruit({
              ...newFruit, 
              location: {...newFruit.location, district: e.target.value}
            })}
          />

          <TextField
            required
            label="State"
            value={newFruit.location.state}
            onChange={(e) => setNewFruit({
              ...newFruit, 
              location: {...newFruit.location, state: e.target.value}
            })}
          />

          <TextField
            required
            label="Pincode"
            value={newFruit.location.pincode}
            onChange={(e) => setNewFruit({
              ...newFruit, 
              location: {...newFruit.location, pincode: e.target.value}
            })}
          />

          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              value={newFruit.status}
              label="Status"
              onChange={(e) => setNewFruit({...newFruit, status: e.target.value})}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            component="label"
          >
            Upload Images (Max 4)
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {imageFiles.length > 0 && (
            <Typography variant="caption">
              {imageFiles.length} images selected
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Fruit'}
          </Button>
        </Stack>
      </form>
    </Box>
  </Modal>
);
 return (
  <Box sx={styles.root}>
    <AdminNavbarSlider selected="Fruit Listing" />
    <Box sx={styles.main}>
      <PageHeader title="Fruit Listing" />

      <Grid container spacing={2}>
        {filteredFruits.map((fruit) => (
          <Grid item xs={12} md={4} key={fruit.id}>
            <Paper sx={kycCardStyles.card}>
              <Box sx={kycCardStyles.cardHeader}>
                <Box sx={kycCardStyles.userInfo}>
                  <EmojiFoodBeverageIcon sx={{ color: 'success.main', fontSize: 28 }} />
                  <Typography sx={kycCardStyles.name}>{fruit.name}</Typography>
                </Box>
                <IconButton 
                  sx={kycCardStyles.deleteBtn}
                  onClick={() => handleDeleteClick(fruit)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box sx={kycCardStyles.details}>
                <Typography variant="body2">
                  <span style={kycCardStyles.label}>💰 Price:</span>
                  <span style={kycCardStyles.value}>₹{fruit.price_per_kg}/kg</span>
                </Typography>
                <Typography variant="body2">
                  <span style={kycCardStyles.label}>📦 Quantity:</span>
                  <span style={kycCardStyles.value}>
                    {fruit.quantity[0]} - {fruit.quantity[1]} kg
                  </span>
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={kycCardStyles.label}>
                    <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: '#388e3c', mr: 0.5 }} />
                    Location:
                  </span>
                  <span style={kycCardStyles.value}>
                    {fruit.location.city}, {fruit.location.district}, {fruit.location.state}
                  </span>
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
                  <Typography 
                    sx={{ 
                      color: '#64748b', 
                      fontSize: '0.9rem',
                      backgroundColor: fruit.status === 'sold' ? '#fee2e2' : '#dcfce7',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontWeight: 500
                    }}
                  >
                    {fruit.status.charAt(0).toUpperCase() + fruit.status.slice(1)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
          
        {/* Add New Fruit Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={kycCardStyles.addCard} onClick={handleModalOpen}>
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
    {AddFruitModal}
    <Dialog
  open={deleteDialogOpen}
  onClose={handleDeleteCancel}
  aria-labelledby="delete-dialog-title"
  aria-describedby="delete-dialog-description"
>
  <DialogTitle id="delete-dialog-title">
    Confirm Delete
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="delete-dialog-description">
      Are you sure you want to permanently delete this fruit? This action cannot be undone.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button 
      onClick={handleDeleteCancel} 
      color="primary"
      disabled={loading}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleDeleteConfirm} 
      color="error" 
      variant="contained"
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  </DialogActions>
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
    variant="filled"
    sx={{ width: '100%' }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
  </Box>
);
}

const styles = {
   loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
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
    height: 340, 
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
    flex: 1, // Add flex grow
  },
  label: {
    color: '#64748b',
    fontWeight: 500,
    fontSize: 13,
    display: 'inline-block', // Change to inline-block
    minWidth: 80, // Add minimum width for alignment
  },
  value: {
    color: '#334155',
    fontWeight: 500,
    fontSize: 14,
    display: 'inline-block', // Change to inline-block
    verticalAlign: 'top', // Align with label
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
    height: 280, // Match the height of regular cards
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
const modalStyles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '90vh',
    overflowY: 'auto'
  }
};
