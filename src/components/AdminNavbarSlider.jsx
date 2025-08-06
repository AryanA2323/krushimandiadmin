import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Avatar, Divider } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <BarChartIcon sx={{ color: '#22c55e' }} />,
    path: '/Dashboard',
    color: '#22c55e'
  },
  {
    text: 'User Management',
    icon: <PeopleOutlineIcon sx={{ color: '#a855f7' }} />,
    path: '/UserManagement',
    color: '#a855f7'
  },
  {
    text: 'Fruit Listings',
    icon: <LocalGroceryStoreIcon sx={{ color: '#22c55e' }} />,
    path: '/FruitListing',
    color: '#22c55e'
  },
  {
    text: 'Order Monitoring',
    icon: <ShoppingCartOutlinedIcon sx={{ color: '#fb923c' }} />,
    path: '/OrderMonitoring',
    color: '#fb923c'
  },
  {
    text: 'Notification Manager',
    icon: <NotificationsNoneOutlinedIcon sx={{ color: '#facc15' }} />,
    path: '/NotificationManager',
    color: '#facc15'
  },
  {
    text: 'Feedback & Complaints',
    icon: <FeedbackOutlinedIcon sx={{ color: '#ef4444' }} />,
    path: '/Feedback_Complaints',
    color: '#ef4444'
  },
  {
    text: 'Super Admin',
    icon: <AdminPanelSettingsIcon sx={{ color: '#0ea5e9' }} />, 
    path: '/SuperAdmin',
    color: '#0ea5e9'
  },
];

export default function AdminNavbarSlider() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 300,
          boxSizing: 'border-box',
          background: '#fff',
          color: '#222',
          borderRight: '1px solid #eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        },
      }}
    >
      <Box>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 1 }}>
          <Avatar sx={{ bgcolor: '#22c55e', width: 48, height: 48, fontWeight: 700, fontSize: 24, mb: 1 }}>
            K
          </Avatar>
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#222', textAlign: 'center', lineHeight: 1 }}>
            Krushimandi
          </Typography>
          <Typography variant="caption" sx={{ color: '#666', textAlign: 'center', mb: 1 }}>
            Admin Panel
          </Typography>
        </Box>
        {/* Menu */}
        <List sx={{ px: 2, pt: 1 }}>
          {menuItems.map((item, idx) => {
            const isSelected = item.path && location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => item.path && navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  background: isSelected ? '#ecfdf5' : undefined,
                  color: isSelected ? '#22c55e' : '#222',
                  pl: isSelected ? 1 : 2,
                  borderLeft: isSelected ? '4px solid #22c55e' : '4px solid transparent',
                  fontWeight: isSelected ? 700 : 500,
                  minHeight: 44,
                  '&:hover': {
                    background: '#ecfdf5',
                    color: '#22c55e'
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: item.color,
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: isSelected ? 700 : 500,
                  }}
                />
              </ListItem>
            );
          })}
          {/* Super Admin (not clickable) */}
          
        </List>
      </Box>
      {/* System Info */}
      <Box sx={{ px: 2, py: 2, borderTop: '1px solid #eee' }}>
        <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, letterSpacing: 1 }}>
          SYSTEM INFO
        </Typography>
        <Typography variant="caption" sx={{ color: '#222', display: 'block', mt: 1 }}>
          Version: v2.1.0
        </Typography>
        <Typography variant="caption" sx={{ color: '#22c55e', display: 'block', mt: 0.5 }}>
          Status: Online
        </Typography>
        <Typography variant="caption" sx={{ color: '#222', display: 'block', mt: 0.5 }}>
          Users: 1,200
        </Typography>
      </Box>
    </Drawer>
  );
}