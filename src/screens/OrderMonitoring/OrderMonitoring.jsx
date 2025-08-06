import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Grid, TextField, Button, Avatar } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';



const initialOrders = [
  {
    id: 'ORD001',
    customer: 'Ravi Kumar',
    product: 'Alphonso Mango',
    price: 1200,
    quantity: '10 kg',
    date: '2025-07-21',
    farmer: 'Amit Sharma',
    status: 'Completed',
    payment: 'Paid',
  },
  {
    id: 'ORD002',
    customer: 'Priya Singh',
    product: 'Banana',
    price: 450,
    quantity: '15 kg',
    date: '2025-07-20',
    farmer: 'Rahul Singh',
    status: 'In Progress',
    payment: 'Payment Due',
  },
  {
    id: 'ORD003',
    customer: 'Meena Gupta',
    product: 'Apple',
    price: 900,
    quantity: '8 kg',
    date: '2025-07-19',
    farmer: 'Amit Sharma',
    status: 'Cancelled',
    payment: 'COD',
  },
  {
    id: 'ORD004',
    customer: 'Meena Gupta',
    product: 'Apple',
    price: 900,
    quantity: '8 kg',
    date: '2025-07-19',
    farmer: 'Amit Sharma',
    status: 'In Progress',
    payment: 'Paid',
  },
  {
    id: 'ORD005',
    customer: 'Meena Gupta',
    product: 'Apple',
    price: 900,
    quantity: '8 kg',
    date: '2025-07-19',
    farmer: 'Amit Sharma',
    status: 'Completed',
    payment: 'COD',
  },
  {
    id: 'ORD006',
    customer: 'Meena Gupta',
    product: 'Apple',
    price: 900,
    quantity: '8 kg',
    date: '2025-07-19',
    farmer: 'Amit Sharma',
    status: 'In Progress',
    payment: 'Payment Due',
  },
];

export default function OrderMonitoring() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);


  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    } else {
      // Redirect to login if no admin user found
      navigate('/AdminLogin');
    }
  }, [navigate]);
  const handleCancel = idx => {
    if (window.confirm('Do you want to cancel this order?')) {
      setOrders(orders =>
        orders.map((order, i) =>
          i === idx ? { ...order, status: 'Cancelled' } : order
        )
      );
    }
  };

  const filteredOrders = orders.filter(
    order =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBox = status => {
    if (status === 'Completed')
      return <Box sx={kycCardStyles.statusCompleted}>Completed</Box>;
    if (status === 'In Progress')
      return <Box sx={kycCardStyles.statusProgress}>In Progress</Box>;
    return <Box sx={kycCardStyles.statusCancelled}>Cancelled</Box>;
  };

  const getPaymentBox = payment => {
    if (payment === 'Paid')
      return <Box sx={kycCardStyles.paymentPaid}>Paid</Box>;
    if (payment === 'Payment Due')
      return <Box sx={kycCardStyles.paymentDue}>Payment Due</Box>;
    return <Box sx={kycCardStyles.paymentCOD}>COD</Box>;
  };

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Order Monitoring" />
      <Box sx={styles.main}>
        <PageHeader title="Order Monitoring" />

        <Grid container spacing={2}>
          {filteredOrders.map((order, idx) => (
            <Grid item xs={12} md={4} key={order.id}>
              <Paper sx={kycCardStyles.card}>
                <Box sx={kycCardStyles.cardHeader}>
                  <Box sx={kycCardStyles.userInfo}>
                    <CheckCircleIcon sx={{ color: '#388e3c', fontSize: 28 }} />
                    <Typography sx={kycCardStyles.name}>Order {order.id}</Typography>
                  </Box>
                  {getStatusBox(order.status)}
                </Box>

                <Box sx={kycCardStyles.details}>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <ShoppingBasketIcon sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} /> Product:
                    <span style={kycCardStyles.value}>{order.product}</span>
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <PersonIcon sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} /> Customer:
                    <span style={kycCardStyles.value}>{order.customer}</span>
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <PersonIcon sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} /> Farmer:
                    <span style={kycCardStyles.value}>{order.farmer}</span>
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <AccountBalanceWalletIcon sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} /> Price:
                      <span style={kycCardStyles.value}>₹{order.price}</span>
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    <span style={kycCardStyles.label}>
                      <ShoppingBasketIcon sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} /> Quantity:
                    <span style={kycCardStyles.value}>{order.quantity}</span>
                    </span>
                  </Typography>
                  <Typography sx={kycCardStyles.date}>
                    <CalendarMonthIcon sx={{ mr: 1,fontSize: 16, color: '#64748b' }} />
                    {order.date}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <span style={kycCardStyles.label}>Payment Status:</span>
                    {getPaymentBox(order.payment)}
                  </Box>
                </Box>

                <Box sx={kycCardStyles.buttonRow}>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    sx={kycCardStyles.visitBtn}
                  >
                    View Details
                  </Button>
                  {order.status === 'In Progress' && (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      sx={kycCardStyles.rejectBtn}
                      onClick={() => handleCancel(idx)}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
    backgroundColor: '#F8F9FA',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
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
    minHeight: 210,
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
  docBtn: {
    color: '#1976d2',
    fontWeight: 500,
    background: 'rgba(25,118,210,0.08)',
    borderRadius: 20,
    textTransform: 'none',
    boxShadow: 'none',
    fontSize: 13,
    px: 2,
    py: 0.5,
    '&:hover': {
      background: 'rgba(25,118,210,0.12)',
      color: '#1976d2',
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
  },
  label: {
    color: '#64748b',
    fontWeight: 500,
    fontSize: 13,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
  },
  value: {
    color: '#334155',
    fontWeight: 500,
    fontSize: 14,
    ml: 0.5,
  },
  date: {
    color: '#64748b',
    fontSize: 12.5,
    mt: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  buttonRow: {
    display: 'flex',
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
  acceptBtn: {
    background: 'rgba(67,160,71,0.9)',
    color: '#fff',
    fontWeight: 500,
    boxShadow: 'none',
    fontSize: 13,
    textTransform: 'none',
    borderRadius: 20,
    px: 2,
    '&:hover': {
      background: 'rgba(67,160,71,1)',
    },
  },
  rejectBtn: {
    background: 'rgba(229,57,53,0.9)',
    color: '#fff',
    fontWeight: 500,
    boxShadow: 'none',
    fontSize: 13,
    textTransform: 'none',
    borderRadius: 20,
    px: 2,
    '&:hover': {
      background: 'rgba(229,57,53,1)',
    },
  },
};