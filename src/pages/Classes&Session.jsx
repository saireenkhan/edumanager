import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  Layers, 
  Search, 
  Users, 
  LayoutGrid, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Primitive Global Elements
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { classesSectionData, classesFormSchema } from '../Data/Data';

const ClassesSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* 1. SIDEBAR */}
      <Sidebar2 />

      <div className="main-content">
        {/* 2. HEADER */}
        <Header />

        <div className="page-container">
          {/* 3. PAGE HEADER */}
          <PageHeader 
            title="Admission & Registration"
            subtitle="Monitor ongoing enrollment phases, handle form distributions, and manage registered applicants"
            btnText="New Registration Form"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS */}
          <section className="stats-container">
            <StatCard icon={Layers} title="Total Applicants" value="184" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Forms Issued" value="120" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Seats Booked" value="74%" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={ShieldCheck} title="Pending Review" value="15" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* 5. FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by applicant name, phone, or voucher number..." />
            </div>
            <select className="filter-select"><option>Morning Shift</option><option>Evening Shift</option></select>
            <select className="filter-select"><option>Sort by Grade</option></select>
          </div>

          {/* 6. TABLE */}
          <DataTable headers={['Applicant Details', 'Target Level', 'Verified Documents', 'Fee Structure', 'Processing Shift', 'Status']}>
            {classesSectionData.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.className}</strong><br />
                  <small style={{ color: '#6b7280' }}>{row.description}</small>
                </td>
                <td>{row.numericLevel}</td>
                <td>
                  {row.sections.map((section, idx) => (
                    <span 
                      key={idx}
                      style={{ 
                        background: '#eff6ff', 
                        color: '#1e40af', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        border: '1px solid #dbeafe', 
                        marginRight: idx < row.sections.length - 1 ? '4px' : '0px' 
                      }}
                    >
                      {section}
                    </span>
                  ))}
                </td>
                <td>{row.capacity}</td>
                <td>
                  <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {row.shift}
                </td>
                <td>
                  <span className="status-badge active" style={{ background: row.status === 'VERIFIED' ? '#dcfce7' : '#fee2e2', color: row.status === 'VERIFIED' ? '#16a34a' : '#dc2626', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* 7. MODAL WITH PROPS FORM CONTAINER */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Issue Admission Form">
        <AddClassForm fields={classesFormSchema} buttonText="Generate Registration Record" />
      </ModalWrapper>
    </div>
  );
};

export default ClassesSection;