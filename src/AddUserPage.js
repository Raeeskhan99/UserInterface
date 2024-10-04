// src/AddUserPage.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './store/userSlice';
import UserForm from './UserForm'; // Import the UserForm component
import { useNavigate } from 'react-router-dom'; // For navigation after submission

const AddUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserFormSubmit = (data) => {
    // Dispatch the action to add the user
    dispatch(addUser(data));

    // Redirect back to the table page
    navigate('/'); // Adjust this path if necessary
  };

  return (
    <div className="add-edit-page">
      <h2>Add New User</h2>
      <UserForm onSubmit={handleUserFormSubmit} />
    </div>
  );
};

export default AddUserPage;
