import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title }) {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  
  // Menu states and handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/AdminLogin');
  };

  return (
    <Box sx={styles.headerRow}>
      <Typography variant="h6" fontWeight="bold" sx={styles.headerTitle}>
        {title}
      </Typography>
      <Box sx={styles.headerRight}>
        <IconButton 
          sx={styles.notificationButton}
          onClick={() => navigate('/NotificationManager')}
        >
          <NotificationsIcon />
        </IconButton>
        <Box 
          sx={styles.userInfo}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <Avatar sx={styles.avatar}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {adminUser ? adminUser.name : 'Admin User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {adminUser ? adminUser.role : 'Super Admin'}
            </Typography>
          </Box>
        </Box>
        
        {/* Logout Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            sx: styles.menu
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout} sx={styles.menuItem}>
            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

const styles = {
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 3,
    width: '100%',
  },
  headerTitle: {
    color: '#222',
    letterSpacing: 0.5,
    fontSize: '24px',
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
    padding: '4px 8px',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#F8F9FA',
    },
  },
  avatar: {
    bgcolor: '#E3F2FD',
    width: 40,
    height: 40,
  },
  menu: {
    mt: 1,
    minWidth: 150,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
    borderRadius: 2,
  },
  menuItem: {
    fontSize: 14,
    py: 1,
    px: 2,
    display: 'flex',
    alignItems: 'center',
    color: '#ef4444',
    '&:hover': {
      backgroundColor: '#fee2e2',
    },
  },
};