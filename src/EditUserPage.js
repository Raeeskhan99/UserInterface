// src/EditUserPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './store/userSlice';
import UserForm from './UserForm'; // Reuse the UserForm component
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and accessing route params

const EditUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the route parameters
  const users = useSelector((state) => state.users.users);
  const userToEdit = users.find(user => user.id === Number(id));

  if (!userToEdit) {
    return <div>User not found.</div>;
  }

  const handleUserFormSubmit = (data) => {
    dispatch(updateUser(data));
    navigate('/'); // Redirect back to the table page
  };

  return (
    <div className="add-edit-page">
      <h2>Edit User</h2>
      <UserForm onSubmit={handleUserFormSubmit} userData={userToEdit} />
    </div>
  );
};

export default EditUserPage;
