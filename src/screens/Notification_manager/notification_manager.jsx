import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Modal, IconButton, Avatar, TextField } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';





const initialNotifications = [
  {
    header: 'Season Update',
    title: 'Mango Season Starts!',
    description: 'Fresh Alphonso mangoes are now available for buyers and sellers.',
    date: '2025-07-25',
  },
  {
    header: 'New Buyer Live',
    title: 'Buyer Priya Singh Joined',
    description: 'A new buyer Priya Singh is now live on the platform.',
    date: '2025-07-24',
  },
  {
    header: 'Feature Update',
    title: 'Order Tracking Added',
    description: 'You can now track your orders in real time from the dashboard.',
    date: '2025-07-23',
  },
  {
    header: 'Feature Update',
    title: 'Order Tracking Added',
    description: 'You can now track your orders in real time from the dashboard.',
    date: '2025-07-23',
  },
  {
    header: 'Feature Update',
    title: 'Order Tracking Added',
    description: 'You can now track your orders in real time from the dashboard.',
    date: '2025-07-23',
  },
  {
    header: 'Feature Update',
    title: 'Order Tracking Added',
    description: 'You can now track your orders in real time from the dashboard.',
    date: '2025-07-23',
  },
];

export default function NotificationManager() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    header: '',
    title: '',
    description: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewNotification({ header: '', title: '', description: '' });
  };

  const handleChange = e => {
    setNewNotification({ ...newNotification, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (newNotification.header && newNotification.title && newNotification.description) {
      setNotifications([
        {
          ...newNotification,
          date: new Date().toISOString().slice(0, 10),
        },
        ...notifications,
      ]);
      handleClose();
    }
  };

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Notification Manager" />
      <Box sx={styles.main}>
        {/* Header */}
        <PageHeader title="Notification Manager" />

        {/* 3 Notification Cards */}
        <Box sx={{ mb: 3 ,display:'flex', gap:2}}>
          <Paper sx={{ ...styles.bigCard, background: 'linear-gradient(90deg,#3576ef 60%,#3576ef 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CampaignIcon sx={{ color: '#fff', fontSize: 28 }} />
              <Typography sx={styles.bigCardTitle}>Season Update</Typography>
            </Box>
            <Typography sx={styles.bigCardDesc}>
              Notify farmers about seasonal fruit updates and market trends
            </Typography>
            <Button sx={styles.bigCardBtn} variant="contained">Create Update</Button>
          </Paper>
          <Paper sx={{ ...styles.bigCard, background: 'linear-gradient(90deg,#1db954 60%,#1db954 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <GroupsIcon sx={{ color: '#fff', fontSize: 28 }} />
              <Typography sx={styles.bigCardTitle}>New Buyer Live</Typography>
            </Box>
            <Typography sx={styles.bigCardDesc}>
              Alert farmers when new buyers join the platform in their region
            </Typography>
            <Button sx={styles.bigCardBtnGreen} variant="contained">Notify Farmers</Button>
          </Paper>
          <Paper sx={{ ...styles.bigCard, background: 'linear-gradient(90deg,#a259e6 60%,#a259e6 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SettingsSuggestIcon sx={{ color: '#fff', fontSize: 28 }} />
              <Typography sx={styles.bigCardTitle}>Feature Update</Typography>
            </Box>
            <Typography sx={styles.bigCardDesc}>
              Announce new features and improvements to all users
            </Typography>
            <Button sx={styles.bigCardBtnPurple} variant="contained">Announce Feature</Button>
          </Paper>
        </Box>

        {/* Notification List */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2, color: '#000000ff' }}>
          Recent Notifications
        </Typography>
        <Grid container spacing={2} mt={1}>
          {notifications.map((n, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={styles.card}>
                <Box sx={styles.cardHeader}>
                  <Typography sx={styles.headerText}>{n.header}</Typography>
                  <Typography sx={styles.dateText}>{n.date}</Typography>
                </Box>
                <Typography sx={styles.titleText}>{n.title}</Typography>
                <Typography sx={styles.descText}>{n.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyles.modalBox}>
            <Typography variant="h6" fontWeight="bold" sx={modalStyles.modalTitle}>
              New Notification
            </Typography>
            <TextField
              label="Header"
              name="header"
              value={newNotification.header}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Title"
              name="title"
              value={newNotification.title}
              onChange={handleChange}
              fullWidth
              sx={modalStyles.input}
              size="small"
            />
            <TextField
              label="Description"
              name="description"
              value={newNotification.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={modalStyles.input}
              size="small"
            />
            <Box sx={modalStyles.buttonRow}>
              <Button variant="contained" sx={modalStyles.sendBtn} onClick={handleSend}>
                Send Notification
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
    backgroundColor: '#F8F9FA',
    marginLeft: '10px',
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
  announceBtn: {
    background: '#3576ef',
    color: '#fff',
    fontWeight: 600,
    px: 2.5,
    boxShadow: 'none',
    '&:hover': {
      background: '#2456b3',
      color: '#fff',
      boxShadow: 'none',
    },
    height: 40,
    textTransform: 'none',
    mr: 1,
  },
  bigCard: {
    borderRadius: 5,
    p: 3,
    mb: 2,
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    minHeight: 150,
    width: '30%'  ,
  },
  bigCardTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: '#fff',
    mb: 0.5,
  },
  bigCardDesc: {
    fontSize: 16,
    color: '#f3f3f3',
    mb: 2,
    mt: 0.5,
  },
  bigCardBtn: {
    background: '#5c9eff',
    color: '#fff',
    fontWeight: 600,
    px: 2.5,
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      background: '#3576ef',
      color: '#fff',
      boxShadow: 'none',
    },
    mt: 1,
    width: 150,
    borderRadius: 8,
  },
  bigCardBtnGreen: {
    background: '#22c55e',
    color: '#fff',
    fontWeight: 600,
    px: 2.5,
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      background: '#1db954',
      color: '#fff',
      boxShadow: 'none',
    },
    mt: 1,
    width: 150,
    borderRadius: 8,
  },
  bigCardBtnPurple: {
    background: '#a259e6',
    color: '#fff',
    fontWeight: 600,
    px: 2.5,
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      background: '#7c3aed',
      color: '#fff',
      boxShadow: 'none',
    },
    mt: 1,
    width: 180,
    borderRadius: 8,
  },
  card: {
    p: 2,
    mb: 2,
    width: 350,
    borderRadius: 3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 120,
    border: '2px solid #e6f7ee',
    background: '#fff',
    transition: 'box-shadow 0.2s, border-color 0.2s',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(56,142,60,0.08)',
      borderColor: '#388e3c',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
  headerText: {
    fontWeight: 700,
    fontSize: 15,
    color: '#388e3c',
  },
  dateText: {
    color: '#888',
    fontWeight: 500,
    fontSize: 13,
  },
  titleText: {
    fontWeight: 600,
    fontSize: 16,
    color: '#1976d2',
    mb: 0.5,
  },
  descText: {
    fontSize: 14,
    color: '#333',
  },
};

const modalStyles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#fff',
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },
  modalTitle: {
    color: '#388e3c',
    fontWeight: 700,
    mb: 1.5,
    fontSize: 20,
    textAlign: 'center',
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
  sendBtn: {
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