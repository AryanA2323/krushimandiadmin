import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button, Modal } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import AddIcon from '@mui/icons-material/Add';
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
        <Box sx={styles.headerRow}>
          <Typography variant="h6" fontWeight="bold" sx={styles.headerTitle}>
            Fruit Listings
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search Fruits"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={styles.searchBox}
          />
        </Box>
        <Grid container spacing={2} mt={1}>
          {filteredFruits.map((fruit, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={{ ...styles.card, background: fruit.bg }}>
                <Box sx={styles.cardHeader}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmojiFoodBeverageIcon sx={{ color: '#388e3c', fontSize: 24 }} />
                    <Typography fontWeight="bold" sx={styles.fruitName}>{fruit.name}</Typography>
                  </Box>
                  <IconButton sx={styles.deleteBtn} onClick={() => handleDeleteFruit(fruits.indexOf(fruit))}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" mt={1}>
                  <b>Price:</b> ₹{fruit.price}/kg
                </Typography>
                <Typography variant="body2">
                  <b>Description:</b> {fruit.description}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 16, color: '#388e3c', mr: 0.5 }} />
                  <b>Location:</b>&nbsp;{fruit.location}
                </Typography>
                <Typography variant="body2">
                  <b>Quantity:</b> {fruit.quantity}
                </Typography>
                <Typography variant="body2" sx={styles.farmerRow}>
                  <span style={{ color: '#388e3c', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <EmojiFoodBeverageIcon sx={{ fontSize: 18, mr: 0.5 }} />
                    Farmer: {fruit.farmer}
                  </span>
                  <span style={{ color: '#388e3c', fontWeight: 600, marginLeft: 12 }}>
                    Mobile: {fruit.mobile}
                  </span>
                </Typography>
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
    marginLeft: '80px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  searchBox: {
    mb: 2,
    width: '100%',
    maxWidth: 400,
    background: '#fff',
    mr: 2,
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
    p: 2,
    mb: 2,
    borderRadius: 3,
    width: 350,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    minHeight: 170,
    position: 'relative',
    background: '#e6f7ee',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
  deleteBtn: {
    color: '#e53935',
    background: '#fff',
    borderRadius: 2,
    '&:hover': {
      background: '#ffeaea',
      color: '#b71c1c',
    },
  },
  farmerRow: {
    mt: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  addCard: {
    minHeight: 170,
    height: '92%',
    border: '2px dashed #f9a825',
    borderRadius: 3,
    width: 380,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: '#fffde7',
    transition: 'box-shadow 0.2s, border-color 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    '&:hover': {
      borderColor: '#388e3c',
      background: '#f4fff7',
      boxShadow: '0 4px 16px rgba(56,142,60,0.08)',
    },
  },
  addCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    py: 4,
  },
  addIcon: {
    fontSize: 48,
    color: '#f9a825',
    mb: 1,
  },
  addText: {
    color: '#f9a825',
    fontWeight: 600,
    fontSize: 18,
    mt: 1,
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