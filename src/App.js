import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminDashboard from './screens/Dashboard/AdminDashboard';
import UserManagement from './screens/UserManagement/UserManagement';
import Farmers from './screens/UserManagement/Farmers';
import Customers from './screens/UserManagement/Customers';
import Farmer_KYC from './screens/UserManagement/Farmer_KYC';
import FarmerRequest from './screens/UserManagement/FarmerRequest';
import FruitListing from './screens/FruitListing/fruitlisting';
import OrderMonitoring from './screens/OrderMonitoring/OrderMonitoring';
import FeedbackComplain from './screens/Feedback_complains/feedback_complain';
import NotificationManager from './screens/Notification_manager/notification_manager';
import SuperAdmin from './screens/super_admin/super_admin.jsx';
import AdminLogin from './screens/admin_login/AdminLogin.jsx';
import ForgotPassword from './screens/admin_login/ForgotPass.jsx'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
// ...existing code...;
function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const adminData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Admin',
        };
        localStorage.setItem('adminUser', JSON.stringify(adminData));
      } else {
        // User is signed out
        localStorage.removeItem('adminUser');
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Dashboard" element={<AdminDashboard />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/Farmers" element={<Farmers />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Farmer_KYC" element={<Farmer_KYC />} />
        <Route path="/FarmerRequest" element={<FarmerRequest />} />
        <Route path="/FruitListing" element={<FruitListing />} />
        <Route path="/OrderMonitoring" element={<OrderMonitoring />} />
        <Route path="/Feedback_Complaints" element={<FeedbackComplain />} />
        <Route path="/NotificationManager" element={<NotificationManager />} />
        <Route path="/SuperAdmin" element={<SuperAdmin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;