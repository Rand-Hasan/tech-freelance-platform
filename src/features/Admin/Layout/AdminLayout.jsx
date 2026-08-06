import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import '../styles/AdminLayout.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
    <div className="dashboard-admin-layout">

    <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
    />

    <div className="main-admin-wrapper">

        <AdminHeader
            setSidebarOpen={setSidebarOpen}
        />

        <main className="page-admain-content">
            <Outlet />
        </main>

    </div>

</div>
  );
}