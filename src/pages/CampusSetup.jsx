import React, { useState } from 'react';
import '../css/Campus.css';
import { Building2, MapPin, Search } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { campusBranchesData, campusFormSchema } from '../Data/Data';

const CampusSetup = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* 1. SIDEBAR */}
      <Sidebar2 />

      <div className="main-content">
        {/* 2. HEADER */}
        <Header />

        <div className="page-container">
          {/* 3. PAGE HEADER & ACTIONS */}
          <PageHeader 
            title="Campus Setup"
            subtitle="Configure and manage your institutional branches and physical locations"
            btnText="Add New Campus"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS */}
          <section className="stats-container">
            <StatCard icon={Building2} title="Total Branches" value="04" dotColor="#555" />
            <StatCard icon={Building2} title="Active Campus" value="03" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={MapPin} title="Maintenance" value="01" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Building2} title="Main Headquarter" value="01" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          {/* 5. FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by class name..." />
            </div>
            <select className="filter-select"><option>All Regions</option></select>
            <select className="filter-select"><option>Campus Type</option></select>
            <select className="filter-select"><option>Status</option></select>
          </div>

          {/* 6. TABLE */}
          <DataTable headers={['Campus Name', 'Campus Code', 'Location / Address', 'Contact Info', 'Principal / Head', 'Status']}>
            {campusBranchesData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <small style={{ color: '#555' }}>{item.subtitle}</small>
                </td>
                <td>{item.code}</td>
                <td>{item.address}</td>
                <td>{item.contact}</td>
                <td>{item.head}</td>
                <td>
                  <span className="status-badge active">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* 7. REUSABLE MODAL WITH PROPS FORM */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Campus Branch">
        <AddClassForm fields={campusFormSchema} buttonText="Initialize Campus Setup" />
      </ModalWrapper>
    </div>
  );
};

export default CampusSetup;