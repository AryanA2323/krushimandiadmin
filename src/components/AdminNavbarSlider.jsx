import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'User Management', icon: <PeopleIcon />, path: '/UserManagement' },
  { text: 'Fruit Listings', icon: <InventoryIcon />, path: '/FruitListing' },
  { text: 'Order Monitoring', icon: <ShoppingCartIcon /> ,path: '/OrderMonitoring' },
  { text: 'Manual Overfide', icon: <SettingsIcon /> },
  { text: 'Notification Managers (Admin permission)', icon: <NotificationsIcon /> },
  { text: 'Feedback and Complaints section', icon: <FeedbackIcon /> },
];

export default function AdminNavbarSlider() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 325, boxSizing: 'border-box', background: '#07332F', color: '#fff' },
      }}
    >
      <List>
        {menuItems.map((item, idx) => {
          const isSelected = item.path && location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => item.path && navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                background: isSelected ? '#12443A' : undefined,
                '&:hover': { background: '#12443A' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}