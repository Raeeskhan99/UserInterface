// src/DataTable.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { removeUser } from './store/userSlice'; // Import removeUser
import { Link } from 'react-router-dom'; // Import Link for navigation
import './DataTable.css';

const DataTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users); // Get users from Redux store

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // States for global filter with debouncing
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handle sorting when a column header is clicked
  const handleSort = (columnKey) => {
    let direction = 'ascending';
    if (
      sortConfig.key === columnKey &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key: columnKey, direction });
  };

  // Apply global filter using debouncedQuery
  const filteredData = users.filter((user) => {
    const query = debouncedQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phoneNumber.toLowerCase().includes(query) ||
      user.address.toLowerCase().includes(query)
      // Removed role from search
    );
  });

  // Apply sorting to the filtered data
  let sortedData = [...filteredData];
  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  // Calculate total pages based on sorted data
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  // Get current page data from sorted data
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle page change
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Utility function to highlight search terms
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.toString().split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
    );
  };

  // Function to handle downloading Excel
  const handleDownload = () => {
    const filteredDataToExport = debouncedQuery ? filteredData : users; // Use filtered or full data
    const worksheet = XLSX.utils.json_to_sheet(filteredDataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Create a binary string and initiate the download
    XLSX.writeFile(workbook, 'users_data.xlsx');
  };

  // Function to handle removing a user
  const handleRemoveUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(removeUser(id));
    }
  };

  return (
    <div className="datatable-container">
      <h2>Users Table</h2>

      {/* Add New User Button with Link */}
      <Link to="/add-user">
        <button className="add-user-button">Add New User</button>
      </Link>

      {/* Search and Download Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by first name, last name, email, phone, or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="clear-button"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
        <button onClick={handleDownload} className="download-button">
          Download Excel
        </button>
      </div>

      {/* Users Data Table */}
      <table className="datatable">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('id')}
              aria-sort={sortConfig.key === 'id' ? sortConfig.direction : 'none'}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSort('id');
              }}
            >
              ID
              {sortConfig.key === 'id' ? (
                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
              ) : (
                <FaSort />
              )}
            </th>
            <th
              onClick={() => handleSort('firstName')}
              aria-sort={sortConfig.key === 'firstName' ? sortConfig.direction : 'none'}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSort('firstName');
              }}
            >
              First Name
              {sortConfig.key === 'firstName' ? (
                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
              ) : (
                <FaSort />
              )}
            </th>
            <th
              onClick={() => handleSort('lastName')}
              aria-sort={sortConfig.key === 'lastName' ? sortConfig.direction : 'none'}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSort('lastName');
              }}
            >
              Last Name
              {sortConfig.key === 'lastName' ? (
                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
              ) : (
                <FaSort />
              )}
            </th>
            <th
              onClick={() => handleSort('email')}
              aria-sort={sortConfig.key === 'email' ? sortConfig.direction : 'none'}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSort('email');
              }}
            >
              Email
              {sortConfig.key === 'email' ? (
                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
              ) : (
                <FaSort />
              )}
            </th>
            <th
              onClick={() => handleSort('phoneNumber')}
              aria-sort={sortConfig.key === 'phoneNumber' ? sortConfig.direction : 'none'}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSort('phoneNumber');
              }}
            >
              Phone Number
              {sortConfig.key === 'phoneNumber' ? (
                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
              ) : (
                <FaSort />
              )}
            </th>
            <th
              onClick={() => handleSort('address')}
              aria-sort={sortConfig.key === 'address' ? sortConfig.direction : 'none'}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSort('address');
              }}
            >
              Address
              {sortConfig.key === 'address' ? (
                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
              ) : (
                <FaSort />
              )}
            </th>
            {/* Removed Date of Birth and Role columns */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.length > 0 ? (
            currentEntries.map((user) => (
              <tr key={user.id}>
                <td data-label="ID">{highlightText(user.id, debouncedQuery)}</td>
                <td data-label="First Name">{highlightText(user.firstName, debouncedQuery)}</td>
                <td data-label="Last Name">{highlightText(user.lastName, debouncedQuery)}</td>
                <td data-label="Email">{highlightText(user.email, debouncedQuery)}</td>
                <td data-label="Phone Number">{highlightText(user.phoneNumber, debouncedQuery)}</td>
                <td data-label="Address">{highlightText(user.address, debouncedQuery)}</td>
                {/* Removed Date of Birth and Role data cells */}
                <td data-label="Actions">
                  <Link to={`/edit-user/${user.id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <button 
                    className="delete-button" 
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No matching records found.</td> {/* Adjusted colspan */}
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className="pagination">
        <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
