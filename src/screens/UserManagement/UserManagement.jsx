import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Modal, TextField, IconButton, Avatar, InputBase, Fade } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // For search bar animation (for FruitListing page, but included here for consistency)
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddAdmin = () => {
    // Add admin logic here
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', marginLeft: '10px' }}>
      <AdminNavbarSlider />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header Section */}
        <Box sx={styles.headerRow}>
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={0.5}>
              User Management
            </Typography>
          </Box>
          <Box sx={styles.headerRight}>
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
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6}>
            <Paper sx={styles.card} onClick={() => navigate('/Farmers')} style={{ cursor: 'pointer' }}>
              <PeopleIcon sx={styles.icon} />
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>Farmers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={styles.card} onClick={() => navigate('/Customers')} style={{ cursor: 'pointer' }}>
              <PersonIcon sx={styles.icon} />
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>Customers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={styles.card} onClick={() => navigate('/Farmer_KYC')} style={{ cursor: 'pointer' }}>
              <DescriptionIcon sx={styles.icon} />
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>Farmer KYC Requests</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={styles.card} onClick={() => navigate('/FarmerRequest')} style={{ cursor: 'pointer' }}>
              <InventoryIcon sx={styles.icon} />
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>Farmer Listing Requests</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Paper sx={styles.addAdminCard}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="subtitle1" fontWeight="bold">Add Admin</Typography>
            <Button variant="contained" color="success" startIcon={<PeopleIcon />} onClick={handleOpen}>
              Add
            </Button>
          </Box>
        </Paper>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Add Admin</Typography>
            <TextField
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Set Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="success" onClick={handleAddAdmin}>
              Add
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

const styles = {
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
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
  card: {
    p: 3,
    hight: 150,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 590,
    mt: 2,
    boxSizing: 'border-box',
  },
  icon: {
    fontSize: 40,
    color: 'success.main',
    mb: 1,
    ml: 2,
    mr: 5,
  },
  addAdminCard: {
    p: 2,
    mt: 8,
    display: 'flex',
    alignItems: 'center',
    width: 1200,
    height: 100,
    boxSizing: 'border-box',
    borderRadius: 5,
  },
};







