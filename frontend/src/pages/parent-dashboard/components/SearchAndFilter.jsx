import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    if (onFilterChange) {
      onFilterChange({ status: e.target.value, date: dateFilter });
    }
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    if (onFilterChange) {
      onFilterChange({ status: statusFilter, date: e.target.value });
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
      <h3 className="h5 text-headings mb-3">Filter Applications</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control border-borders-cards"
            placeholder="Search by child name or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select border-borders-cards"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control border-borders-cards"
            value={dateFilter}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
