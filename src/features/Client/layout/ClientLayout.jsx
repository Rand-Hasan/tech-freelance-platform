import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from '../components/ClientSidebar';
import ClientHeader from '../components/ClientHeader';
import '../styles/ClientLayout.css';

export default function ClientLayout() {
  return (
    <div className="dashboard-layout">

      <ClientSidebar />

      <div className="main-wrapper">

        <ClientHeader />
        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}