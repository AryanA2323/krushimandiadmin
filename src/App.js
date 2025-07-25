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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/Farmers" element={<Farmers />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Farmer_KYC" element={<Farmer_KYC />} />
        <Route path="/FarmerRequest" element={<FarmerRequest />} />
        <Route path="/FruitListing" element={<FruitListing />} />
        <Route path="/OrderMonitoring" element={<OrderMonitoring />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;