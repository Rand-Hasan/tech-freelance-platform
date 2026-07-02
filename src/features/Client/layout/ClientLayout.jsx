import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from '../components/ClientSidebar';
import ClientHeader from '../components/ClientHeader';
import '../styles/ClientLayout.css';

export default function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
    <div className="dashboard-layout">

    <ClientSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
    />

    <div className="main-wrapper">

        <ClientHeader
            setSidebarOpen={setSidebarOpen}
        />

        <main className="page-content">
            <Outlet />
        </main>

    </div>

</div>
  );
}