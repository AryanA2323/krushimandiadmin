import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, IconButton, Avatar, Modal, InputBase, Fade } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

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
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleCancel = idx => {
    if (window.confirm('Do you want to cancel this order?')) {
      setOrders(orders =>
        orders.map((order, i) =>
          i === idx ? { ...order, status: 'Cancelled' } : order
        )
      );
      setModalOpen(false);
    }
  };

  const filteredOrders = orders.filter(
    order =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.farmer.toLowerCase().includes(search.toLowerCase())
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
        {/* Header Section */}
        <Box sx={styles.headerRow}>
          <Typography variant="h6" fontWeight="bold" sx={styles.headerTitle}>
            Order Monitoring
          </Typography>
          <Box sx={styles.headerRight}>
            <Fade in={!showSearch}>
              <IconButton
                sx={styles.searchIconBtn}
                onClick={() => setShowSearch(true)}
                style={{ display: showSearch ? 'none' : 'inline-flex' }}
              >
                <SearchIcon />
              </IconButton>
            </Fade>
            <Fade in={showSearch}>
              <Box sx={styles.searchBarBox} style={{ display: showSearch ? 'flex' : 'none' }}>
                <InputBase
                  placeholder="Search Orders"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={styles.inputBase}
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </Box>
            </Fade>
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
        <Grid container spacing={2}>
          {filteredOrders.map((order, idx) => (
            <Grid item xs={12} md={4} key={order.id}>
              <Paper
                sx={kycCardStyles.card}
                onClick={() => {
                  setSelectedOrder({ ...order, idx });
                  setModalOpen(true);
                }}
              >
                <Box sx={kycCardStyles.cardHeader}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#388e3c', fontSize: 22 }} />
                    <Typography fontWeight="bold" sx={kycCardStyles.orderId}>
                      {order.id}
                    </Typography>
                  </Box>
                  {getStatusBox(order.status)}
                </Box>
                <Box sx={kycCardStyles.details}>
                  <Typography variant="body2" sx={kycCardStyles.label}>
                    <b>Product:</b> <span style={kycCardStyles.value}>{order.product}</span>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Modal for order details */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={modalStyles.modalBox}>
            {selectedOrder && (
              <>
                <Typography variant="h6" fontWeight="bold" sx={modalStyles.modalTitle}>
                  Order Details
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Order ID:</b> {selectedOrder.id}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Product:</b> {selectedOrder.product}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Customer:</b> {selectedOrder.customer}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Farmer:</b> {selectedOrder.farmer}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Price:</b> ₹{selectedOrder.price}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Quantity:</b> {selectedOrder.quantity}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Date:</b> {selectedOrder.date}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <b>Status:</b> {getStatusBox(selectedOrder.status)}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <b>Payment:</b> {getPaymentBox(selectedOrder.payment)}
                </Box>
                {selectedOrder.status === 'In Progress' && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    sx={modalStyles.cancelBtn}
                    onClick={() => handleCancel(selectedOrder.idx)}
                  >
                    Cancel Order
                  </Button>
                )}
                <Box sx={modalStyles.buttonRow}>
                  <Button
                    variant="contained"
                    sx={modalStyles.closeBtn}
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
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
    marginLeft: '10px',
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
    minHeight: 120,
    width: 390,
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #f8faf8 0%, #ffffff 100%)',
    border: '1px solid rgba(56,142,60,0.12)',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
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
  orderId: {
    color: '#388e3c',
    fontWeight: 700,
    fontSize: '1.08rem',
    letterSpacing: 0.2,
  },
  details: {
    px: 2.5,
    pt: 1.2,
    pb: 1.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.7,
    background: 'transparent',
  },
  label: {
    color: '#64748b',
    fontWeight: 500,
    fontSize: 14,
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
  statusCompleted: {
    background: '#43a047',
    color: '#fff',
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 13,
    minWidth: 90,
    width: 'fit-content',

    textAlign: 'center',
  },
  statusProgress: {
    background: '#ffb300',
    color: '#fff',
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 13,
    minWidth: 90,
    width: 'fit-content',

    textAlign: 'center',
  },
  statusCancelled: {
    background: '#e53935',
    color: '#fff',
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 13,
    minWidth: 90,
    width: 'fit-content',
    textAlign: 'center',
  },
  paymentPaid: {
    background: '#43a047',
    color: '#fff',
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 13,
    width: 'fit-content',

    ml: 1,
  },
  paymentDue: {
    background: '#ffb300',
    color: '#fff',
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 13,
    width: 'fit-content',

    ml: 1,
  },
  paymentCOD: {
    background: '#1976d2',
    color: '#fff',
    px: 1.5,
    py: 0.5,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 13,
    width: 'fit-content',

    ml: 1,
  },
};

const modalStyles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
  detailRow: {
    fontSize: 15,
    mb: 0.5,
    color: '#222',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    mt: 2,
  },
  closeBtn: {
    background: '#388e3c',
    color: '#fff',
    fontWeight: 600,
    px: 4,
    '&:hover': {
      background: '#256029',
      color: '#fff',
    },
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