import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Modal, Button, IconButton, Avatar } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

const feedbacks = [
  {
    id: 'COMP001',
    name: 'Ramesh Kumar',
    type: 'Customer',
    date: '2024-07-26 10:30',
    subject: 'Payment Issue',
    description: 'Payment gateway not working for mango order',
    priority: 'high',
    status: 'open',
    assigned: '',
  },
  {
    id: 'COMP002',
    name: 'Priya Sharma',
    type: 'Farmer',
    date: '2024-07-25 14:20',
    subject: 'Quality Issue',
    description: 'Buyer rejected apples citing quality issues',
    priority: 'medium',
    status: 'in-progress',
    assigned: 'Support Team A',
  },
  {
    id: 'COMP003',
    name: 'Kishor Patil',
    type: 'Customer',
    date: '2024-07-24 09:15',
    subject: 'App Bug',
    description: 'Unable to upload new fruit listings',
    priority: 'high',
    status: 'resolved',
    assigned: 'Tech Team',
  },
  {
    id: 'COMP004',
    name: 'Kishor Patil',
    type: 'Customer',
    date: '2024-07-24 09:15',
    subject: 'App Bug',
    description: 'Unable to upload new fruit listings',
    priority: 'high',
    status: 'resolved',
    assigned: 'Tech Team',
  },
  {
    id: 'COMP005',
    name: 'Kishor Patil',
    type: 'Customer',
    date: '2024-07-24 09:15',
    subject: 'App Bug',
    description: 'Unable to upload new fruit listings',
    priority: 'high',
    status: 'resolved',
    assigned: 'Tech Team',
  },
  {
    id: 'COMP006',
    name: 'Kishor Patil',
    type: 'Customer',
    date: '2024-07-24 09:15',
    subject: 'App Bug',
    description: 'Unable to upload new fruit listings',
    priority: 'high',
    status: 'resolved',
    assigned: 'Tech Team',
  },
];

const stats = [
  {
    icon: <ErrorOutlineIcon sx={{ color: '#ef4444', fontSize: 28, mr: 1 }} />,
    label: 'Open Issues',
    value: 1,
    sub: 'Needs attention',
    subColor: '#ef4444',
  },
  {
    icon: <AccessTimeIcon sx={{ color: '#f59e42', fontSize: 28, mr: 1 }} />,
    label: 'In Progress',
    value: 1,
    sub: 'Being resolved',
    subColor: '#f59e42',
  },
  {
    icon: <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 28, mr: 1 }} />,
    label: 'Resolved Today',
    value: 1,
    sub: 'Avg: 2.3 hours',
    subColor: '#22c55e',
  },
  {
    icon: <StarBorderIcon sx={{ color: '#1976d2', fontSize: 28, mr: 1 }} />,
    label: 'Satisfaction',
    value: '4.8/5',
    sub: 'Based on 156 reviews',
    subColor: '#1976d2',
  },
];





export default function FeedbackComplain() {
  const [feedbackList, setFeedbackList] = useState(feedbacks);
const [assignModalOpen, setAssignModalOpen] = useState(false);
const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);

  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  );
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);


    useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const admins = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAdminUsers(admins);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };

    fetchAdminUsers();
  }, []);





  const handleOpen = feedback => {
    setSelected(feedback);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleMarkResolved = (complaintId) => {
  setFeedbackList(prevList => 
    prevList.map(item => 
      item.id === complaintId 
        ? { ...item, status: 'resolved' }
        : item
    )
  );
};

const handleAssignModalOpen = (complaint) => {
  setSelectedComplaint(complaint);
  setAssignModalOpen(true);
};

const handleAssignModalClose = () => {
  setAssignModalOpen(false);
  setSelectedComplaint(null);
};

const handleAssignAdmin = (adminName) => {
  setFeedbackList(prevList => 
    prevList.map(item => 
      item.id === selectedComplaint.id 
        ? { ...item, assigned: adminName }
        : item
    )
  );
  handleAssignModalClose();
};

  // Badge helpers
  const getPriorityBadge = priority => {
    if (priority === 'high')
      return <span style={badgeStyles.high}>high priority</span>;
    if (priority === 'medium')
      return <span style={badgeStyles.medium}>medium priority</span>;
    return <span style={badgeStyles.low}>low priority</span>;
  };
  const getStatusBadge = status => {
    if (status === 'open')
      return <span style={badgeStyles.open}>open</span>;
    if (status === 'in-progress')
      return <span style={badgeStyles.inprogress}>in-progress</span>;
    return <span style={badgeStyles.resolved}>resolved</span>;
  };

  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider selected="Feedback and Complaints section" />
      <Box sx={styles.main}>
        {/* Header */}
        <PageHeader title="Feedback & Complaints" />

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} md={3} key={idx}>
              <Paper sx={styles.statCard}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {stat.icon}
                  <Typography sx={styles.statLabel}>{stat.label}</Typography>
                </Box>
                <Typography sx={styles.statValue}>{stat.value}</Typography>
                <Typography sx={{ fontSize: 14, color: stat.subColor, mt: 0.5 }}>
                  {stat.sub}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* List Heading */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 2, color: '#388e3c' }}>
          All Complains
        </Typography>

        {/* Complaints List */}
        <Grid container spacing={2}>

{feedbackList.map((f, idx) => (
  <Grid item xs={12} key={f.id}>
    <Paper sx={styles.complainCard}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box>
          <Typography sx={styles.complainTitle}>
            {f.subject}
            {getPriorityBadge(f.priority)}
          </Typography>
          <Typography sx={styles.complainUser}>
            By: {f.name} ({f.type})
          </Typography>
        </Box>
        <Box>{getStatusBadge(f.status)}</Box>
      </Box>

      <Typography sx={styles.complainDesc}>
        {f.description}
      </Typography>

      <Box sx={styles.complainMeta}>
        <Typography sx={styles.complainMetaText}>
          <b>ID:</b> {f.id}
        </Typography>
        <Typography sx={styles.complainMetaText}>
          <b>Date:</b> {f.date}
        </Typography>
      </Box>
        <Typography sx={styles.complainAssigned}>
          <b>Assigned To:</b> {f.assigned || 'No admin assigned'}
        </Typography>

      <Box sx={styles.complainActions}>
        {f.status === 'open' && (
          <Button 
            sx={styles.actionBtnBlue}
            onClick={() => handleAssignModalOpen(f)}
          >
            Assign to Team
          </Button>
        )}
        {f.status === 'in-progress' && (
          <Button 
            sx={styles.actionBtnGreen}
            onClick={() => handleMarkResolved(f.id)}
          >
            Mark Resolved
          </Button>
        )}
        <Button sx={styles.actionBtn} onClick={() => handleOpen(f)}>
          View Details
        </Button>
        <Button sx={styles.actionBtnOutline}>Contact User</Button>
      </Box>
    </Paper>
  </Grid>
))}
        </Grid>
{/* Add the Admin Assignment Modal */}
<Modal open={assignModalOpen} onClose={handleAssignModalClose}>
  <Box sx={modalStyles.modalBox}>
    <Typography variant="h6" fontWeight="bold" sx={modalStyles.modalTitle}>
      Assign Complaint
    </Typography>
    <Box sx={modalStyles.adminList}>
      {adminUsers.map((admin) => (
        <Box key={admin.email} sx={modalStyles.adminRow}>
          <Typography>{admin.name}</Typography>
          <Button 
            variant="contained"
            size="small"
            onClick={() => handleAssignAdmin(admin.name)}
            sx={modalStyles.assignBtn}
          >
            Assign
          </Button>
        </Box>
      ))}
    </Box>
    <Button 
      variant="outlined" 
      onClick={handleAssignModalClose}
      sx={modalStyles.cancelBtn}
    >
      Cancel
    </Button>
  </Box>
</Modal>

        {/* Modal for details */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyles.modalBox}>
            <Typography variant="h6" fontWeight="bold" sx={modalStyles.modalTitle}>
              Feedback Details
            </Typography>
            {selected && (
              <>
                <Typography sx={modalStyles.detailRow}>
                  <b>Ticket ID:</b> {selected.id}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Name:</b> {selected.name}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Type:</b>{' '}
                  <span
                    style={{
                      color: selected.type === 'Farmer' ? '#388e3c' : '#1976d2',
                      fontWeight: 600,
                    }}
                  >
                    {selected.type}
                  </span>
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Date:</b> {selected.date}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Subject:</b> {selected.subject}
                </Typography>
                <Typography sx={modalStyles.detailRow}>
                  <b>Description:</b>
                  <br />
                  <span style={{ fontWeight: 400 }}>{selected.description}</span>
                </Typography>
                <Box sx={modalStyles.buttonRow}>
                  <Button variant="contained" sx={modalStyles.closeBtn} onClick={handleClose}>
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
    backgroundColor: '#F8F9FA',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 3,
  },
  headerTitle: {
    color: '#388e3c',
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
  statCard: {
    borderRadius: 3,
    p: 2.5,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    minHeight: 90,
    display: 'flex',
    flexDirection: 'column',
    width: 550,
    justifyContent: 'center',
  },
  statLabel: {
    fontWeight: 600,
    fontSize: 16,
    color: '#222',
  },
  statValue: {
    fontWeight: 700,
    fontSize: 28,
    color: '#222',
    mt: 0.5,
  },
  complainCard: {
    borderRadius: 2,
    p: 2.5,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    mb: 2,
    width: 550,
    border: '1px solid #eee',
    // minHeight: 120,
    height: 200,
    transition: 'box-shadow 0.2s, border-color 0.2s',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(56,142,60,0.08)',
      borderColor: '#388e3c',
    },
  },
  complainAssigned: {
    fontSize: 14,
    color: '#666',
    mt: 1,
    mb: 1,
  },
  complainTitle: {
    fontWeight: 600,
    fontSize: 17,
    color: '#222',
    mr: 1,
  },
  complainUser: {
    fontWeight: 500,
    fontSize: 15,
    color: '#444',
    mt: 0.5,
  },
  complainDesc: {
    fontSize: 15,
    color: '#333',
    mt: 0.5,
    mb: 1,
  },
  complainMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    fontSize: 13,
    color: '#888',
    mb: 1,
    flexWrap: 'wrap',
  },
  complainMetaText: {
    fontSize: 13,
    color: '#888',
    mr: 2,
  },
  complainActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
  },
  actionBtn: {
    background: '#f8fafc',
    color: '#1976d2',
    fontWeight: 600,
    px: 2,
    py: 0.5,
    borderRadius: 2,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    border: '1px solid #e3e3e3',
    '&:hover': {
      background: '#e3f2fd',
      color: '#1976d2',
      boxShadow: 'none',
    },
  },
  actionBtnBlue: {
    background: '#2563eb',
    color: '#fff',
    fontWeight: 600,
    px: 2,
    py: 0.5,
    borderRadius: 2,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    '&:hover': {
      background: '#1e40af',
      color: '#fff',
      boxShadow: 'none',
    },
  },
  actionBtnGreen: {
    background: '#22c55e',
    color: '#fff',
    fontWeight: 600,
    px: 2,
    py: 0.5,
    borderRadius: 2,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    '&:hover': {
      background: '#15803d',
      color: '#fff',
      boxShadow: 'none',
    },
  },
  actionBtnOutline: {
    background: '#f8fafc',
    color: '#2563eb',
    fontWeight: 600,
    px: 2,
    py: 0.5,
    borderRadius: 2,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    border: '1px solid #e3e3e3',
    '&:hover': {
      background: '#e3f2fd',
      color: '#2563eb',
      boxShadow: 'none',
    },
  },
};

const badgeStyles = {
  high: {
    background: '#ef4444',
    color: '#fff',
    fontWeight: 600,
    fontSize: 13,
    px: 1.5,
    py: 0.2,
    borderRadius: 2,
    marginLeft: 8,
    marginRight: 4,
    display: 'inline-block',
    padding: '2px 10px',
  },
  medium: {
    background: '#f59e42',
    color: '#fff',
    fontWeight: 600,
    fontSize: 13,
    px: 1.5,
    py: 0.2,
    borderRadius: 2,
    marginLeft: 8,
    marginRight: 4,
    display: 'inline-block',
    padding: '2px 10px',
  },
  low: {
    background: '#22c55e',
    color: '#fff',
    fontWeight: 600,
    fontSize: 13,
    px: 1.5,
    py: 0.2,
    borderRadius: 2,
    marginLeft: 8,
    marginRight: 4,
    display: 'inline-block',
    padding: '2px 10px',
  },
  open: {
    background: '#fca5a5',
    color: '#ef4444',
    fontWeight: 600,
    fontSize: 13,
    px: 1.5,
    py: 0.2,
    borderRadius: 2,
    marginRight: 4,
    display: 'inline-block',
    padding: '2px 10px',
  },
  inprogress: {
    background: '#fef08a',
    color: '#f59e42',
    fontWeight: 600,
    fontSize: 13,
    px: 1.5,
    py: 0.2,
    borderRadius: 2,
    marginRight: 4,
    display: 'inline-block',
    padding: '2px 10px',
  },
  resolved: {
    background: '#bbf7d0',
    color: '#22c55e',
    fontWeight: 600,
    fontSize: 13,
    px: 1.5,
    py: 0.2,
    borderRadius: 2,
    marginRight: 4,
    display: 'inline-block',
    padding: '2px 10px',
  },
};

const modalStyles = {
  adminList: {
    mt: 2,
    mb: 3,
    maxHeight: 300,
    overflowY: 'auto',
  },
  adminRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 1.5,
    px: 1,
    borderBottom: '1px solid #eee',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  assignBtn: {
    backgroundColor: '#388e3c',
    color: '#fff',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#2e7d32',
    },
  },
  cancelBtn: {
    mt: 2,
    color: '#666',
    borderColor: '#666',
    textTransform: 'none',
  },

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
};