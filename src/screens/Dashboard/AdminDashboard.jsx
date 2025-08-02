import React from 'react';
import { Box, Typography, Grid, Paper, IconButton, Avatar, Chip } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const dailyLoginsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Farmer Logins',
      data: [65, 75, 70, 85, 75, 80, 85],
      borderColor: '#4CAF50',
      backgroundColor: '#4CAF50',
      tension: 0.4,
      fill: false,
    },
    {
      label: 'Buyer Logins',
      data: [45, 55, 65, 60, 70, 65, 60],
      borderColor: '#2196F3',
      backgroundColor: '#2196F3',
      tension: 0.4,
      fill: false,
    }
  ]
};

const tradingFruitsData = {
  labels: ['Mango', 'Apple', 'Orange', 'Grapes'],
  datasets: [{
    data: [35, 25, 20, 20],
    backgroundColor: ['#FFC107', '#F44336', '#FF9800', '#9C27B0'],
  }],
};

const regionData = [
  { region: 'Ratnagiri', farmers: 156, buyers: 89, activity: 85, status: 'High' },
  { region: 'Nashik', farmers: 134, buyers: 67, activity: 72, status: 'High' },
  { region: 'Satara', farmers: 98, buyers: 45, activity: 58, status: 'Medium' },
  { region: 'Kolhapur', farmers: 87, buyers: 34, activity: 45, status: 'Low' },
  { region: 'Pune', farmers: 145, buyers: 78, activity: 68, status: 'Medium' },
];

const priceData = [
  { name: 'Alphonso', price: '₹500', change: '+12%', trend: 'up' },
  { name: 'Apple', price: '₹120', change: '-5%', trend: 'down' },
  { name: 'Orange', price: '₹80', change: '+8%', trend: 'up' },
  { name: 'Grapes', price: '₹200', change: '-3%', trend: 'down' },
];

export default function AdminDashboard() {
  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider />
      <Box component="main" sx={styles.main}>
        {/* Header Section */}
        <Box sx={styles.header}>
          <Box>
            <Typography variant="h5" sx={styles.title}>
              Dashboard Overview
            </Typography>
          </Box>
          <Box sx={styles.headerRight}>
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

        {/* Metrics Cards */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Total Farmers Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={styles.metricCard}>
              <Box sx={styles.metricContent}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Farmers
                  </Typography>
                  <Typography variant="h4" fontWeight="600" sx={{ my: 1 }}>
                    856
                  </Typography>
                  <Box sx={styles.trendIndicator}>
                    <ArrowUpwardIcon sx={{ color: '#4CAF50', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                      +12% from last month
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Active farmers
                  </Typography>
                </Box>
                <Avatar sx={{ ...styles.metricIcon, bgcolor: '#E8F5E9' }}>
                  <GroupIcon sx={{ color: '#4CAF50' }} />
                </Avatar>
              </Box>
            </Paper>
          </Grid>

          {/* Total Buyers Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={styles.metricCard}>
              <Box sx={styles.metricContent}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Buyers
                  </Typography>
                  <Typography variant="h4" fontWeight="600" sx={{ my: 1 }}>
                    344
                  </Typography>
                  <Box sx={styles.trendIndicator}>
                    <ArrowUpwardIcon sx={{ color: '#2196F3', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: '#2196F3' }}>
                      +8% from last month
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Registered buyers
                  </Typography>
                </Box>
                <Avatar sx={{ ...styles.metricIcon, bgcolor: '#E3F2FD' }}>
                  <PeopleIcon sx={{ color: '#2196F3' }} />
                </Avatar>
              </Box>
            </Paper>
          </Grid>

          {/* Active Listings Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={styles.metricCard}>
              <Box sx={styles.metricContent}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Listings Today
                  </Typography>
                  <Typography variant="h4" fontWeight="600" sx={{ my: 1 }}>
                    160
                  </Typography>
                  <Box sx={styles.trendIndicator}>
                    <ArrowUpwardIcon sx={{ color: '#FF9800', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: '#FF9800' }}>
                      +23% from last month
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Fresh fruits listed
                  </Typography>
                </Box>
                <Avatar sx={{ ...styles.metricIcon, bgcolor: '#FFF3E0' }}>
                  <ShoppingBasketIcon sx={{ color: '#FF9800' }} />
                </Avatar>
              </Box>
            </Paper>
          </Grid>

          {/* Total Revenue Card */}
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={styles.metricCard}>
              <Box sx={styles.metricContent}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight="600" sx={{ my: 1 }}>
                    ₹12.4L
                  </Typography>
                  <Box sx={styles.trendIndicator}>
                    <ArrowUpwardIcon sx={{ color: '#9C27B0', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: '#9C27B0' }}>
                      +15% from last month
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    This month
                  </Typography>
                </Box>
                <Avatar sx={{ ...styles.metricIcon, bgcolor: '#F3E5F5' }}>
                  <CurrencyRupeeIcon sx={{ color: '#9C27B0' }} />
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Daily Logins Chart */}
          <Grid item xs={12} md={8}>
            <Paper sx={styles.chartCard}>
              <Typography variant="h6" fontWeight="600">Daily Logins</Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Line data={dailyLoginsData} options={styles.chartOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* Trading Fruits Chart */}
          <Grid item xs={12} md={4}>
            <Paper sx={styles.chartCard}>
              <Typography variant="h6" fontWeight="600">Trading Fruits</Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Doughnut data={tradingFruitsData} options={styles.doughnutOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Price Trends Section */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{
              p: 2.5,
              borderRadius: 2,
              boxShadow: '0px 2px 4px rgba(0,0,0,0.03)',
              width: 1160,
              mt: 6,
              bgcolor: '#fff'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <TrendingUpIcon sx={{ color: '#9C27B0', mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={700}>
                  Price Trends
                </Typography>
              </Box>
              {priceData.map((item, idx) => (
                <Box
                  key={item.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: '#f8f9fa',
                    borderRadius: 1,
                    px: 2,
                    py: 2,
                    mb: idx !== priceData.length - 1 ? 1.5 : 0
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#4CAF50' }} />
                    <Typography fontWeight={500}>{item.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography fontWeight={600}>{item.price}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {item.trend === 'up' ? (
                        <ArrowUpwardIcon sx={{ color: '#4CAF50', fontSize: 18 }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ color: '#F44336', fontSize: 18 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ color: item.trend === 'up' ? '#4CAF50' : '#F44336', fontWeight: 600 }}
                      >
                        {item.change}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* Region-wise Activity Section - Redesigned */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{
              p: 2.5,
              borderRadius: 2,
              boxShadow: '0px 2px 4px rgba(0,0,0,0.03)',
              width: 1160,
              bgcolor: '#fff'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={700}>
                  Region wise Activity
                </Typography>
              </Box>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '2.5fr 1fr 1fr 2fr 1fr',
                px: 2,
                py: 1,
                borderBottom: '1px solid #eee',
                fontWeight: 600,
                color: '#222',
                bgcolor: 'transparent'
              }}>
                <Typography fontWeight={600}>Region</Typography>
                <Typography fontWeight={600}>Farmers</Typography>
                <Typography fontWeight={600}>Buyers</Typography>
                <Typography fontWeight={600}>Activity Score</Typography>
                <Typography fontWeight={600}>Status</Typography>
              </Box>
              {regionData.map((row, idx) => (
                <Box
                  key={row.region}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2.5fr 1fr 1fr 2fr 1fr',
                    alignItems: 'center',
                    px: 2,
                    py: 2,
                    borderBottom: idx !== regionData.length - 1 ? '1px solid #f0f0f0' : 'none',
                    bgcolor: 'transparent'
                  }}
                >
                  <Typography>{row.region}</Typography>
                  <Typography>{row.farmers}</Typography>
                  <Typography>{row.buyers}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      width: 100,
                      height: 8,
                      bgcolor: '#e0e0e0',
                      borderRadius: 4,
                      mr: 1,
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <Box sx={{
                        width: `${row.activity}%`,
                        height: '100%',
                        bgcolor: '#22c55e',
                        borderRadius: 4,
                        position: 'absolute',
                        left: 0,
                        top: 0
                      }} />
                    </Box>
                    <Typography fontWeight={500} sx={{ color: '#22c55e' }}>{row.activity}%</Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor:
                          row.status === 'High'
                            ? '#d1fae5'
                            : row.status === 'Medium'
                            ? '#fef9c3'
                            : '#fee2e2',
                        color:
                          row.status === 'High'
                            ? '#22c55e'
                            : row.status === 'Medium'
                            ? '#eab308'
                            : '#ef4444',
                        fontWeight: 600,
                        fontSize: 13,
                        px: 1.5,
                        borderRadius: 1.5,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
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
    p: 3,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },
  title: {
    fontWeight: 600,
    color: '#2C3E50',
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
  metricCard: {
    p: 3,
    height: 130,
    width: 540,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
    borderRadius: 2,
  },
  metricContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  trendIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    mb: 0.5,
  },
  metricIcon: {
    width: 48,
    height: 48,
  },
  chartCard: {
    p: 3,
    height: '100%',
    width: 540,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
    borderRadius: 2,
  },
  trendCard: {
    p: 3,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
    height: '100%',
    width: 1150,
    borderRadius: 2,
  },
  tableCard: {
    p: 3,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
    borderRadius: 2,
    width: 1150,
  },
  tableHeader: {
    py: 1.5,
    px: 2,
    bgcolor: '#f8f9fa',
    borderRadius: 1,
  },
  tableRow: {
    py: 1.5,
    px: 2,
    borderBottom: '1px solid #eee',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  progressBar: {
    width: '100%',
    height: 8,
    bgcolor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#f0f0f0',
        },
      },
    },
  },
  doughnutOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  },
};