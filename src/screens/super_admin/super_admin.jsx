import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Avatar, Grid, CircularProgress } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import CrownIcon from '@mui/icons-material/WorkspacePremium';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import PageHeader from "../../components/PageHeader";
import { Modal, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

import { db } from '../../firebase/config';
import { collection, getDocs, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useEffect } from 'react';


// const adminUsers = [
//   {
//     name: "Rajesh Kumar",
//     email: "rajesh@admin.com",
//     password: "admin123",
//     role: "Admin",
//     permissions: "All Access",
//     status: "active",
//   },
//   {
//     name: "Priya Sharma",
//     email: "priya@admin.com", 
//     password: "admin456",
//     role: "Supervisor",
//     permissions: "User Management",
//     status: "active",
//   },
// ];

export default function SuperAdmin() {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  const [showUserModal, setShowUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


    useEffect(() => {
    fetchAdmins();
  }, []);


  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      const admins = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdminList(admins);
      setError(null);
    } catch (error) {
      setError("Failed to fetch admin users");
      console.error("Error fetching admins:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setSelectedAdmin(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleEditSubmit = () => {
  // const updatedList = adminList.map(admin => 
  //   admin.email === selectedAdmin.email ? selectedAdmin : admin
  // );

  const handleEditSubmit = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, 'users', selectedAdmin.id);
      await updateDoc(userRef, {
        name: selectedAdmin.name,
        role: selectedAdmin.role,
        permissions: selectedAdmin.permissions,
        status: selectedAdmin.status,
      });
      await fetchAdmins(); // Refresh the list
      handleEditClose();
    } catch (error) {
      setError("Failed to update admin");
      console.error("Error updating admin:", error);
    } finally {
      setIsLoading(false);
    }
  };




  const handleRemoveAdmin = async (id) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      setIsLoading(true);
      try {
        await deleteDoc(doc(db, 'users', id));
        await fetchAdmins(); // Refresh the list
      } catch (error) {
        setError("Failed to remove admin");
        console.error("Error removing admin:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };




  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Super Admin" />
      <Box sx={styles.main}>
        {/* Header */}
        <PageHeader title="Super Admin" />

        {/* Admin Level Badge */}
        <Box sx={styles.adminBadge}>
          <CrownIcon sx={{ color: '#ffd700' }} />
          <Typography sx={styles.adminBadgeText}>
            Admin Level: <span style={styles.badgeHighlight}>Super Admin</span>
          </Typography>
        </Box>

        {/* Control Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ ...styles.controlCard, background: 'linear-gradient(135deg, #2176ff 0%, #3b82f6 100%)' }}>
              <GroupIcon sx={styles.cardIcon} />
              <Typography variant="h6" sx={styles.cardTitle}>User Control</Typography>
              <Typography sx={styles.cardDesc}>
                Manage user accounts, permissions, and access levels
              </Typography>
              <Box 
                sx={styles.cardButton}
                onClick={() => setShowUserModal(true)}
              >
                Manage Users
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ ...styles.controlCard, background: 'linear-gradient(135deg, #2ecc40 0%, #22c55e 100%)' }}>
              <AdminPanelSettingsIcon sx={styles.cardIcon} />
              <Typography variant="h6" sx={styles.cardTitle}>Role Management</Typography>
              <Typography sx={styles.cardDesc}>
                Assign and remove user roles and administrative privileges
              </Typography>
              <Box sx={styles.cardButton}>Manage Roles</Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ ...styles.controlCard, background: 'linear-gradient(135deg, #a259f7 0%, #9333ea 100%)' }}>
              <SettingsIcon sx={styles.cardIcon} />
              <Typography variant="h6" sx={styles.cardTitle}>System Settings</Typography>
              <Typography sx={styles.cardDesc}>
                Configure platform-wide settings and preferences
              </Typography>
              <Box sx={styles.cardButton}>System Config</Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Admin Users Table */}
        <Paper sx={styles.tableCard}>
          <Typography variant="h6" sx={styles.tableTitle}>Admin Users</Typography>
          <Box sx={styles.tableContainer}>
            <Box sx={styles.tableHeader}>
              <Typography sx={{ flex: 2 }}>ADMIN</Typography>
              <Typography sx={{ flex: 1 }}>ROLE</Typography>
              <Typography sx={{ flex: 2 }}>PERMISSIONS</Typography>

              <Typography sx={{ flex: 1 }}>ACTIONS</Typography>
            </Box>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              adminList.map((user, index) => (
                <Box key={index} sx={styles.tableRow}>
                  <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: '#64748b' }} />
                    <Typography>{user.name}</Typography>
                  </Box>
                  <Typography sx={{ flex: 1 }}>{user.role}</Typography>
                  <Typography sx={{ flex: 2 }}>{user.permissions}</Typography>
                  {/* <Box sx={{ flex: 1 }}>
                    <Box sx={{
                      ...styles.statusBadge,
                      bgcolor: user.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: user.status === 'active' ? '#22c55e' : '#ef4444',
                    }}>
                      {user.status}
                    </Box>
                  </Box> */}
                  <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                    <Typography 
                      sx={styles.actionLink}
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Typography>
                    <Typography 
                      sx={styles.actionLinkDanger}
                      onClick={() => handleRemoveAdmin(user.email)}
                    >
                      Remove
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Paper>
      </Box>
      <Modal open={editModal} onClose={handleEditClose}>
        <Box sx={styles.modalBox}>
          <Typography variant="h6" sx={styles.modalTitle}>
            Edit Admin User
          </Typography>
          
          {selectedAdmin && (
            <Box sx={styles.modalContent}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={selectedAdmin.name}
                onChange={handleEditChange}
                sx={styles.modalField}
              />
              
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={selectedAdmin.email}
                onChange={handleEditChange}
                sx={styles.modalField}
                disabled
              />
              
              <FormControl fullWidth sx={styles.modalField}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={selectedAdmin.role}
                  onChange={handleEditChange}
                  label="Role"
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={styles.modalField}>
                <InputLabel>Permissions</InputLabel>
                <Select
                  name="permissions"
                  value={selectedAdmin.permissions}
                  onChange={handleEditChange}
                  label="Permissions"
                >
                  <MenuItem value="All Access">All Access</MenuItem>
                  <MenuItem value="User Management">User Management</MenuItem>
                  <MenuItem value="Fruit Listing">Fruit Listing</MenuItem>
                  <MenuItem value="Order Management">Order Management</MenuItem>
                  <MenuItem value="Inventory Management">Notification Manager</MenuItem>
                  <MenuItem value="Report Generation">Feedback Control</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={styles.modalField}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={selectedAdmin.status}
                  onChange={handleEditChange}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={styles.modalActions}>
                <Button 
                  onClick={handleEditClose}
                  variant="outlined" 
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleEditSubmit}
                  variant="contained" 
                  color="primary"
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );

}

const styles = {
  root: {
    display: 'flex',
    backgroundColor: '#F8F9FA',
    minHeight: '100vh',
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
    color: '#222',
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
  adminBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 3,
  },
  adminBadgeText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: 500,
  },
  badgeHighlight: {
    background: '#fff3bf',
    color: '#f59f00',
    padding: '2px 8px',
    borderRadius: 4,
    fontWeight: 600,
  },
  controlCard: {
    p: 3,
    borderRadius: 3,
    color: '#fff',
    minHeight: 220,
    display: 'flex',
    width: 330,   
    flexDirection: 'column',
    gap: 1,
  },
  cardIcon: {
    fontSize: 32,
    mb: 1,
  },
  cardTitle: {
    fontWeight: 600,
    mb: 1,
  },
  cardDesc: {
    fontSize: 14,
    opacity: 0.9,
    mb: 2,
  },
  cardButton: {
    mt: 'auto',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    py: 1,
    px: 2,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      background: 'rgba(255,255,255,0.2)',
    },
  },
  tableCard: {
    mt: 4,
    p: 3,
    borderRadius: 3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  tableTitle: {
    fontWeight: 600,
    mb: 3,
  },
  tableContainer: {
    borderRadius: 2,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    background: '#f8fafc',
    p: 2,
    borderBottom: '1px solid #e2e8f0',
    '& > *': {
      fontWeight: 600,
      color: '#475569',
      fontSize: 14,
    },
  },
  tableRow: {
    display: 'flex',
    p: 2,
    borderBottom: '1px solid #e2e8f0',
    '&:last-child': {
      borderBottom: 'none',
    },
    '& > *': {
      fontSize: 14,
      color: '#334155',
    },
  },
  statusBadge: {
    display: 'inline-block',
    px: 2,
    py: 0.5,
    borderRadius: 1,
    fontSize: 13,
    fontWeight: 600,
    textAlign: 'center',
  },
  actionLink: {
    color: '#3b82f6',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  actionLinkDanger: {
    color: '#ef4444',
    ml: 1,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  },
  
  modalTitle: {
    fontWeight: 600,
    mb: 3,
    color: '#1e293b',
  },
  
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  
  modalField: {
    mb: 2,
  },
  
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 3,
  },
};
// export { adminUsers };