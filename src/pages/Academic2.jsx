import React, { useState } from 'react';
import '../css/Campus.css'; 
import { Layers, LayoutGrid, Users, Search } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';

// Dynamic Core Form and Data Configurations
import AddClassForm from '../components/AddClassForm';
import { classFormSchema } from '../Data/Data';
import { academicClassesData } from '../Data/Data';

const Academic2 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      <Sidebar3 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader 
            title="Academic"
            subtitle="Manage grade levels and assign sections to specific academic streams"
            btnText="Define New Class"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Total Classes" value="12" dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Total Sections" value="34" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Avg. Strength" value="28" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by class name..." />
            </div>
            <select className="filter-select"><option>Filter by Wing</option></select>
            <select className="filter-select"><option>Section Capacity</option></select>
          </div>

          <DataTable headers={['Class / Grade', 'Sections', 'Department', 'Monthly Fee', 'Capacity', 'Status']}>
            {academicClassesData.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>
                  {item.sections.map((sec, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        background: '#f3f4f6', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        marginRight: idx === 0 ? '4px' : '0px' 
                      }}
                    >
                      {sec}
                    </span>
                  ))}
                </td>
                <td>{item.department}</td>
                <td>{item.fee}</td>
                <td>{item.capacity}</td>
                <td>
                  <span className="status-badge active" style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Class">
        <AddClassForm fields={classFormSchema} buttonText="Create Class Structure" />
      </ModalWrapper>
    </div>
  );
};

export default Academic2;