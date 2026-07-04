import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  Wallet, 
  Search, 
  CreditCard, 
  RefreshCcw, 
  TrendingUp 
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Primitive Global Layout Elements
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { feeTypeData, feeTypeFormSchema } from '../Data/Data';

const FeeType2 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar3/>

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* PAGE HEADER SECTION */}
          <PageHeader 
            title="Fee Type & Structure"
            subtitle="Configure various fee categories, collection frequencies, and base amounts"
            btnText="Add Fee Type"
            onBtnClick={() => setShowModal(true)}
          />

          {/* FINANCIAL METRICS */}
          <section className="stats-container">
            <StatCard icon={Wallet} title="Active Fee Types" value="08" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={RefreshCcw} title="Recurring Fees" value="05" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={CreditCard} title="One-Time Fees" value="03" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={TrendingUp} title="Late Fine Rules" value="02" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search fee head (e.g. Tuition)..." />
            </div>
            <select className="filter-select"><option>Frequency</option><option>Monthly</option><option>Annually</option></select>
            <select className="filter-select"><option>Tax Applicable</option></select>
          </div>

          {/* FEE STRUCTURE TABLE */}
          <DataTable headers={['Fee Head / Name', 'Frequency', 'Account Code', 'Mandatory', 'Base Amount', 'Status']}>
            {feeTypeData.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.name}</strong><br />
                  <small style={{ color: '#6b7280' }}>{row.description}</small>
                </td>
                <td>
                  <span style={{ color: row.freqColor, fontWeight: '600' }}>
                    {row.frequency}
                  </span>
                </td>
                <td>{row.accountCode}</td>
                <td>{row.mandatory}</td>
                <td><strong>{row.amount}</strong></td>
                <td>
                  <span className="status-badge active" style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* MODAL CONTAINER RIGGING */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Define Fee Type">
        <AddClassForm fields={feeTypeFormSchema} buttonText="Create Fee Head" />
      </ModalWrapper>
    </div>
  );
};

export default FeeType2;