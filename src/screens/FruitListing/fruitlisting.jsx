
import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button, Modal, Avatar, InputBase, Fade } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const initialFruits = [
  {
    name: 'Banana',
    price: 30,
    description: 'Organic bananas, rich in nutrients.',
    location: 'Jalgaon, Maharashtra',
    quantity: '15-18 tons',
    farmer: 'Rahul Singh',
    mobile: '9988776655',
    bg: '#e6f7ee',
  },
  {
    name: 'Apple',
    price: 120,
    description: 'Fresh apples from Himachal.',
    location: 'Shimla, Himachal Pradesh',
    quantity: '10-12 tons',
    farmer: 'Amit Sharma',
    mobile: '9876543210',
    bg: '#fdfbe6',
  },
  {
    name: 'Mango',
    price: 60,
    description: 'Alphonso mangoes, sweet and juicy.',
    location: 'Ratnagiri, Maharashtra',
    quantity: '20-25 tons',
    farmer: 'Priya Patel',
    mobile: '9123456789',
    bg: '#e6f1fb',
  },
  {
    name: 'Orange',
    price: 40,
    description: 'Nagpur oranges, vitamin C rich.',
    location: 'Nagpur, Maharashtra',
    quantity: '18-20 tons',
    farmer: 'Sneha Joshi',
    mobile: '9988771122',
    bg: '#e6f7ee',
  },
  {
    name: 'Grapes',
    price: 55,
    description: 'Seedless green grapes.',
    location: 'Nashik, Maharashtra',
    quantity: '12-15 tons',
    farmer: 'Vikas Jain',
    mobile: '9988773344',
    bg: '#fdfbe6',
  },
  {
    name: 'Grapes',
    price: 55,
    description: 'Seedless green grapes.',
    location: 'Nashik, Maharashtra',
    quantity: '12-15 tons',
    farmer: 'Vikas Jain',
    mobile: '9988773344',
    bg: '#fdfbe6',
  },
  {
    name: 'Grapes',
    price: 55,
    description: 'Seedless green grapes.',
    location: 'Nashik, Maharashtra',
    quantity: '12-15 tons',
    farmer: 'Vikas Jain',
    mobile: '9988773344',
    bg: '#fdfbe6',
  },
  {
    name: 'Grapes',
    price: 55,
    description: 'Seedless green grapes.',
    location: 'Nashik, Maharashtra',
    quantity: '12-15 tons',
    farmer: 'Vikas Jain',
    mobile: '9988773344',
    bg: '#fdfbe6',
  },
  {
    name: 'Grapes',
    price: 55,
    description: 'Seedless green grapes.',
    location: 'Nashik, Maharashtra',
    quantity: '12-15 tons',
    farmer: 'Vikas Jain',
    mobile: '9988773344',
    bg: '#fdfbe6',
  },
  {
    name: 'Papaya',
    price: 25,
    description: 'Sweet papayas, ready to eat.',
    location: 'Surat, Gujarat',
    quantity: '8-10 tons',
    farmer: 'Meena Gupta',
    mobile: '9988775566',
    bg: '#e6f1fb',
  },
];

const bgColors = ['#e6f7ee', '#fdfbe6', '#e6f1fb'];

export default function FruitListing() {
  const [search, setSearch] = useState('');
  const [fruits, setFruits] = useState(initialFruits);
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [newFruit, setNewFruit] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    location: '',
    quantity: '',
    farmer: '',
    mobile: '',
  });

  const navigate = useNavigate();

  const handleDeleteFruit = (idxToDelete) => {
    setFruits(fruits.filter((_, idx) => idx !== idxToDelete));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewFruit({
      name: '',
      category: '',
      price: '',
      description: '',
      location: '',
      quantity: '',
      farmer: '',
      mobile: '',
    });
  };

  const handleChange = e => {
    setNewFruit({ ...newFruit, [e.target.name]: e.target.value });
  };

  const handleAddFruit = () => {
    if (
      newFruit.name &&
      newFruit.price &&
      newFruit.description &&
      newFruit.location &&
      newFruit.quantity &&
      newFruit.farmer &&
      newFruit.mobile
    ) {
      setFruits([
        ...fruits,
        {
          name: newFruit.name,
          price: newFruit.price,
          description: newFruit.description,
          location: newFruit.location,
          quantity: newFruit.quantity,
          farmer: newFruit.farmer,
          mobile: newFruit.mobile,
          bg: bgColors[fruits.length % bgColors.length],
        },
      ]);
      handleClose();
    }
  };

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(search.toLowerCase()) ||
    fruit.farmer.toLowerCase().includes(search.toLowerCase()) ||
    fruit.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Fruit Listings" />
      <Box sx={styles.main}>
        {/* Header Section */}
        <Box sx={styles.headerRow}>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={styles.headerTitle}>
              Fruit Listings
            </Typography>
          </Box>
          <Box sx={styles.headerRight}>
            {/* Search Icon and Expandable Search Bar */}
            <Fade in={!showSearch}>
              <IconButton
                sx={styles.searchIconBtn}
                onClick={() => setShowSearch(true)}
                style={{ display: showSearch ? 'none' : 'inline-flex' }}
              >
                <SearchIcon />
              </IconButton>
            </Fade>
            <Fade in={showSearch}>
              <Box sx={styles.searchBarBox} style={{ display: showSearch ? 'flex' : 'none' }}>
                <InputBase
                  placeholder="Search Fruits"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={styles.inputBase}
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </Box>
            </Fade>
            <IconButton sx={styles.notificationButton}>
              <NotificationsIcon />
            </IconButton>
            <Box sx={styles.userInfo}>
              <Avatar sx={styles.avatar}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={500}>Admin User</Typography>
                <Typography variant="caption" color="text.secondary">
                  Super Admin
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={2} mt={1}>
          {filteredFruits.map((fruit, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={{ ...styles.card }}>
                <Box sx={styles.cardHeader}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <EmojiFoodBeverageIcon sx={{ color: '#22c55e', fontSize: 28 }} />
                    <Typography sx={styles.fruitName}>{fruit.name}</Typography>
                  </Box>
                  <IconButton sx={styles.deleteBtn} onClick={() => handleDeleteFruit(fruits.indexOf(fruit))}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                  <Typography sx={styles.priceTag}>₹{fruit.price}/kg</Typography>
                  <Typography sx={styles.quantityTag}>{fruit.quantity}</Typography>
                </Box>
                
                <Typography sx={styles.description}>{fruit.description}</Typography>
                
                <Typography sx={styles.locationText}>
                  <LocationOnIcon sx={{ fontSize: 18, color: '#64748b' }} />
                  {fruit.location}
                </Typography>
                
                <Box sx={styles.farmerRow}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon sx={{ fontSize: 18, color: '#22c55e' }} />
                    <Typography sx={{ color: '#22c55e', fontWeight: 600, fontSize: '0.9rem' }}>
                      {fruit.farmer}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                    {fruit.mobile}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
          {/* Add Card */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={styles.addCard}
              onClick={handleOpen}
              elevation={0}
            >
              <Box sx={styles.addCardContent}>
                <AddIcon sx={styles.addIcon} />
                <Typography sx={styles.addText}>Add New Fruit</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyles.modalBox}>
            <Typography variant="h6" fontWeight="bold" sx={modalStyles.modalTitle}>
              Add New Fruit
            </Typography>
            <TextField
              label="Fruit Name"
              name="name"
              value={newFruit.name}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Category"
              name="category"
              value={newFruit.category}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Price"
              name="price"
              value={newFruit.price}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Description"
              name="description"
              value={newFruit.description}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Location"
              name="location"
              value={newFruit.location}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Quantity (in tons)"
              name="quantity"
              value={newFruit.quantity}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Farmer Name"
              name="farmer"
              value={newFruit.farmer}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Farmer Mobile"
              name="mobile"
              value={newFruit.mobile}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <Box sx={modalStyles.buttonRow}>
              <Button variant="contained" sx={modalStyles.addModalBtn} onClick={handleAddFruit}>
                Add
              </Button>
              <Button variant="outlined" sx={modalStyles.cancelBtn} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
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
    justifyContent: 'space-between',
    mb: 2,
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
  headerTitle: {
    color: '#388e3c',
    letterSpacing: 0.5,
  },
  fruitName: {
    color: '#388e3c',
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  card: {
    p: 2.5,
    mb: 2,
    borderRadius: 8,
    width: 350,
    boxShadow: '0 4px 24px 0 rgba(34,197,94,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.2,
    minHeight: 170,
    position: 'relative',
    background: 'linear-gradient(135deg, #e8ffd9ff 0%, #ffffffff 100%)',
    border: '1px solid rgba(34,197,94,0.12)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px 0 rgba(34,197,94,0.12)',
      borderColor: '#22c55e',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1.5,
    pb: 1.5,
    borderBottom: '1px solid rgba(34,197,94,0.08)',
  },
  fruitName: {
    color: '#22c55e',
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: 0.3,
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
  farmerRow: {
    mt: 'auto',
    pt: 1.5,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderTop: '1px solid rgba(34,197,94,0.08)',
  },
  priceTag: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(34,197,94,0.08)',
    color: '#16a34a',
    fontWeight: 600,
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontSize: '0.9rem',
  },
  quantityTag: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(59,130,246,0.08)',
    color: '#3b82f6',
    fontWeight: 600,
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontSize: '0.9rem',
  },
  locationText: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    color: '#64748b',
    fontSize: '0.9rem',
    mt: 1,
  },
  description: {
    color: '#4b5563',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    mb: 1,
  },
  addCard: {
    minHeight: 170,
    height: '92%',
    border: '2px dashed #22c55e',
    borderRadius: 8,
    width: 360,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 24px 0 rgba(34,197,94,0.08)',
    '&:hover': {
      transform: 'translateY(-4px)',
      borderColor: '#16a34a',
      background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
      boxShadow: '0 12px 32px 0 rgba(34,197,94,0.12)',
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
    color: '#22c55e',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'rotate(90deg)',
    },
  },
  addText: {
    color: '#22c55e',
    fontWeight: 600,
    fontSize: 18,
  },
};

const modalStyles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: '#fff',
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    border: '6px solid #f9a825',
  },
  modalTitle: {
    color: '#f9a825',
    fontWeight: 700,
    mb: 1.5,
    fontSize: 20,
  },
  input: {
    mb: 1,
    background: '#f7faf7',
    borderRadius: 1,
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 2,
  },
  addBtn: {
    background: '#f9a825',
    color: '#fff',
    fontWeight: 600,
    ml: 2,
    px: 3,
    boxShadow: 'none',
    '&:hover': {
      background: '#e6b800',
      color: '#fff',
      boxShadow: 'none',
    },
  },
  addModalBtn: {
    background: '#388e3c',
    color: '#fff',
    fontWeight: 600,
    px: 3,
    boxShadow: 'none',
    '&:hover': {
      background: '#256029',
      color: '#fff',
      boxShadow: 'none',
    },
  },
  cancelBtn: {
    color: '#388e3c',
    borderColor: '#388e3c',
    fontWeight: 600,
    px: 3,
    '&:hover': {
      borderColor: '#256029',
      color: '#256029',
    },
  },
};