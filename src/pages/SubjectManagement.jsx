import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  BookOpen, 
  Search, 
  FileText, 
  Award, 
  BookMarked 
} from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { subjectsData, subjectsFormSchema } from '../Data/Data';

const SubjectManagement = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar2 />

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* PAGE HEADER */}
          <PageHeader 
            title="Subject Management"
            subtitle="Configure academic subjects, syllabus codes, and credit weightage"
            btnText="Add New Subject"
            onBtnClick={() => setShowModal(true)}
          />

          {/* STATISTICS - Subject Centric */}
          <section className="stats-container">
            <StatCard icon={BookOpen} title="Total Subjects" value="48" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={FileText} title="Theory Based" value="32" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Award} title="Practical/Lab" value="16" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={BookMarked} title="Electives" value="08" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by subject name or code..." />
            </div>
            <select className="filter-select"><option>Select Class</option></select>
            <select className="filter-select"><option>Subject Type</option></select>
          </div>

          {/* DATA TABLE */}
          <DataTable headers={['Subject Name', 'Subject Code', 'Assigned Class', 'Subject Type', 'Total Marks', 'Passing Marks']}>
            {subjectsData.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.name}</strong><br />
                  <small style={{ color: '#6b7280' }}>{row.description}</small>
                </td>
                <td>{row.code}</td>
                <td>{row.assignedClass}</td>
                <td>
                  <span style={{ color: row.typeColor, fontWeight: '600' }}>
                    {row.type}
                  </span>
                </td>
                <td>{row.totalMarks}</td>
                <td>{row.passingMarks}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* SETUP CONSOLE MODAL */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Subject">
        <AddClassForm fields={subjectsFormSchema} buttonText="Save Subject Configuration" />
      </ModalWrapper>
    </div>
  );
};

export default SubjectManagement;