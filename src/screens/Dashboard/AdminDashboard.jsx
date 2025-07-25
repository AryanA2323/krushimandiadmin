import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import AdminNavbarSlider from '../../components/AdminNavbarSlider';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const dailyLoginsData = {
  labels: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Logins',
      data: [4, 8, 5, 9, 12, 7],
      fill: false,
      borderColor: '#388e3c',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const trendingFruitData = {
  labels: ['Ramagiri', 'Nishik', 'Saiara', 'Dheu','Mumbai'],
  datasets: [
    {
      label: 'Trending Fruit',
      data: [4, 7, 13, 10,9],
      backgroundColor: ['#1b5e20', '#66bb6a', '#43a047', '#388e3c','#1b5e20'],
      borderRadius: 4,
    },
  ],
};

export default function AdminDashboard() {
  return (
    <Box sx={styles.root}>
      <AdminNavbarSlider />
      <Box component="main" sx={styles.main}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Dashboard
        </Typography>
        {/* First row: 3 cards with equal height and full width */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4} sx={styles.gridItem}>
            <Paper sx={styles.card}>
              <Typography variant="subtitle1" fontWeight="bold">Total Users</Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Box>
                  <Typography variant="body2">Farmers</Typography>
                  <Typography variant="h6" fontWeight="bold">700</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Customers</Typography>
                  <Typography variant="h6" fontWeight="bold">500</Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={1}>Total: 1,200</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} sx={styles.gridItem}>
            <Paper sx={styles.card}>
              <Typography variant="subtitle1" fontWeight="bold">Active Listings / Fruits today</Typography>
              <Typography variant="h6" fontWeight="bold" mt={2}>160</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} sx={styles.gridItem}>
            <Paper sx={styles.card}>
              <Typography variant="subtitle1" fontWeight="bold">Region wise Activity</Typography>
              <Typography variant="body2" mt={2}>85 Dec 49</Typography>
              <Typography variant="body2" color="success.main" mt={1}>T Today</Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* Second row: Daily Logins and Trending Fruit with charts */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={styles.gridItem}>
            <Paper sx={styles.cardChart}>
              <Typography variant="subtitle1" fontWeight="bold">Daily Logins</Typography>
              <Box mt={2} sx={{ height: 280 }}>
                <Line
                  data={dailyLoginsData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false,
                    scales: {
                      x: { grid: { display: false }, ticks: { color: '#333' } },
                      y: { grid: { display: false }, ticks: { color: '#333', stepSize: 2 } },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={styles.gridItem}>
            <Paper sx={styles.cardChart}>
              <Typography variant="subtitle1" fontWeight="bold">Trending Fruit (Area wise)</Typography>
              <Box mt={2} sx={{ height: 280 }}>
                <Bar
                  data={trendingFruitData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false,
                    scales: {
                      x: { grid: { display: false }, ticks: { color: '#333' } },
                      y: { grid: { display: false }, ticks: { color: '#333', stepSize: 2 } },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// CSS styles as JS object
const styles = {
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    bgcolor: '#f8fafb',
    p: 3,
    minHeight: '100vh',
    marginLeft: '80px', // Add this line to prevent overlap with navbar
  },
  gridItem: {
    display: 'flex',
  },
  card: {
    p: 2,
    height: 120,
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  cardChart: {
    p: 2,
    height: 400,
    width: 548,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};