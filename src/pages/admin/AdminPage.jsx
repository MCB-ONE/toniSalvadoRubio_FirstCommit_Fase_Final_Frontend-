import React from 'react';
/** Redux imports */
/** Layout import components */
import AdminSidebar from '../../components/layout/Admin/AdminSidebar';
import AdminHeader from '../../components/layout/Admin/AdminHeader';
/** Import styles */
import './adminPage.scss';
import ProtectedRoutes from '../../routes/ProtectedRoutes';
/* import { fetchAllClientes } from '../../store/slices/clientes'; */

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <main className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          <ProtectedRoutes />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
