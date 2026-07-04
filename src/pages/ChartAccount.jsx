import React, { useState } from 'react';
import '../css/Campus.css';
import { Search, PieChart, ArrowUpRight, ArrowDownLeft, Banknote } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Interface Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { accountsLedgerData, accountFormSchema } from '../Data/Data';

const ChartAccount = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar2 />

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* HEADER SECTION */}
          <PageHeader 
            title="Chart of Accounts"
            subtitle="Manage your general ledger accounts, financial categories, and opening balances"
            btnText="Add New Account"
            onBtnClick={() => setShowModal(true)}
          />

          {/* FINANCIAL OVERVIEW STATS */}
          <section className="stats-container">
            <StatCard icon={PieChart} title="Total Accounts" value="124" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={ArrowUpRight} title="Revenue Heads" value="12" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={ArrowDownLeft} title="Expense Heads" value="45" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Banknote} title="Bank/Cash" value="04" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search accounts by name or code..." />
            </div>
            <select className="filter-select">
              <option>Account Type</option>
              <option>Asset</option>
              <option>Liability</option>
              <option>Equity</option>
            </select>
            <select className="filter-select"><option>Financial Year</option></select>
          </div>

          {/* LEDGER TABLE */}
          <DataTable headers={['Account Code', 'Account Name', 'Category', 'Sub-Category', 'Balance Type', 'Status']}>
            {accountsLedgerData.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.code}</strong></td>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.subCategory}</td>
                <td>{row.balanceType}</td>
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

      {/* MODAL CONTAINER */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Chart Of Account">
        < AddClassForm  fields={accountFormSchema} buttonText="Register Account" />
      </ModalWrapper>
    </div>
  );
};

export default ChartAccount;