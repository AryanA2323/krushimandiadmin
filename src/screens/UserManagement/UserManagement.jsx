import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Modal, TextField } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddAdmin = () => {
    // Add admin logic here
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', marginLeft: '80px' }}>
      <AdminNavbarSlider />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          User Management
        </Typography>
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

// ...styles unchanged...
const styles = {
  card: {
    p: 3,
    minHeight: 190,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    width: 275, // Ensures all cards take full width of their grid cell
    boxSizing: 'border-box',
  },
  icon: {
    fontSize: 40,
    color: 'success.main',
    mb: 1,
  },
  addAdminCard: {
    p: 2,
    mt: 2,
    display: 'flex',
    alignItems: 'center',
    width: '98%',
    boxSizing: 'border-box',
  },
};