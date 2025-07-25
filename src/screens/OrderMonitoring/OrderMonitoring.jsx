import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';

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
  },
];

export default function OrderMonitoring() {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);

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
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.farmer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Order Monitoring" />
      <Box sx={styles.main}>
        <Box sx={styles.headerRow}>
          <Typography variant="h6" fontWeight="bold" sx={styles.headerTitle}>
            Order Monitoring
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search Orders"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={styles.searchBox}
          />
        </Box>
        <Grid container spacing={2}>
          {filteredOrders.map((order, idx) => (
            <Grid item xs={12} md={6} key={order.id}>
              <Paper sx={styles.card}>
                <Box sx={styles.cardHeader}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#388e3c', fontSize: 22 }} />
                    <Typography fontWeight="bold" sx={styles.orderId}>
                      Order ID: {order.id}
                    </Typography>
                  </Box>
                  {order.status === 'Completed' && (
                    <Box sx={styles.statusCompleted}>Completed</Box>
                  )}
                  {order.status === 'In Progress' && (
                    <Box sx={styles.statusProgress}>In Progress</Box>
                  )}
                  {order.status === 'Cancelled' && (
                    <Box sx={styles.statusCancelled}>Cancelled</Box>
                  )}
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <b>Customer:</b> {order.customer}
                </Typography>
                <Typography variant="body2">
                  <b>Product:</b> {order.product}
                </Typography>
                <Typography variant="body2">
                  <b>Price:</b> ₹{order.price}
                </Typography>
                <Typography variant="body2">
                  <b>Quantity:</b> {order.quantity}
                </Typography>
                <Typography variant="body2">
                  <b>Date of Purchase:</b> {order.date}
                </Typography>
                <Typography variant="body2">
                  <b>Farmer:</b> {order.farmer}
                </Typography>
                {order.status === 'In Progress' && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    sx={styles.cancelBtn}
                    onClick={() => handleCancel(idx)}
                  >
                    Cancel Order
                  </Button>
                )}
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
    marginLeft: '80px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  headerTitle: {
    color: '#388e3c',
    letterSpacing: 0.5,
  },
  searchBox: {
    mb: 2,
    width: '100%',
    maxWidth: 400,
    background: '#fff',
    mr: 2,
  },
  card: {
    p: 2,
    mb: 2,
    width: 350,
    borderRadius: 3,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 170,
    background: '#fff',
    border: '1.5px solid #e6f7ee',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
  orderId: {
    color: '#009688',
    fontWeight: 700,
    fontSize: '1.05rem',
  },
  statusCompleted: {
    background: '#43a047',
    color: '#fff',
    px: 2,
    py: 0.5,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: 14,
  },
  statusProgress: {
    background: '#ffb300',
    color: '#fff',
    px: 2,
    py: 0.5,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: 14,
  },
  statusCancelled: {
    background: '#e53935',
    color: '#fff',
    px: 2,
    py: 0.5,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: 14,
  },
  cancelBtn: {
    mt: 2,
    fontWeight: 600,
    boxShadow: 'none',
    borderRadius: 2,
    px: 2.5,
    py: 1,
    fontSize: 15,
    '&:hover': {
      background: '#b71c1c',
    },
  },
};