// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataTable from './DataTable';
import AddUserPage from './AddUserPage'; // Import the AddUserPage
import EditUserPage from './EditUserPage'; // Import the EditUserPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/edit-user/:id" element={<EditUserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
