// src/UserForm.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation after submission

const UserForm = ({ onSubmit, userData }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const users = useSelector((state) => state.users.users); // Access users for validation

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: userData || {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      // Removed dateOfBirth and role
    },
  });

  useEffect(() => {
    reset(userData || {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      // Removed dateOfBirth and role
    });
  }, [userData, reset]);

  const handleFormSubmit = (data) => {
    // Check for unique ID if adding a new user
    if (!userData) { // Only when adding a new user
      const existingUser = users.find((user) => user.id === Number(data.id));
      if (existingUser) {
        alert('ID already exists. Please choose a unique ID.');
        return;
      }
    }

    // Call the parent onSubmit handler
    onSubmit(data);
    // Navigation is handled in the parent
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="user-form">
      <div>
        <label>ID</label>
        <input
          type="number"
          {...register('id', { 
            required: 'ID is required', 
            min: { value: 1, message: 'ID must be greater than 0' },
            validate: (value) => {
              if (!userData) { // Only validate uniqueness when adding a new user
                const existingUser = users.find((user) => user.id === Number(value));
                if (existingUser) {
                  return 'ID already exists';
                }
              }
              return true;
            }
          })}
          placeholder="Enter ID"
        />
        {errors.id && <p className="error">{errors.id.message}</p>}
      </div>

      <div>
        <label>First Name</label>
        <input
          type="text"
          {...register('firstName', { 
            required: 'First Name is required', 
            maxLength: { value: 50, message: 'First Name cannot exceed 50 characters' } 
          })}
          placeholder="First Name"
        />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          {...register('lastName', { 
            required: 'Last Name is required', 
            maxLength: { value: 50, message: 'Last Name cannot exceed 50 characters' } 
          })}
          placeholder="Last Name"
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', { 
            required: 'Email is required', 
            pattern: { value: /^\S+@\S+$/, message: 'Email is not valid' }
          })}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          {...register('phoneNumber', { 
            required: 'Phone Number is required', 
            pattern: { value: /^[0-9\-+\s()]*$/, message: 'Phone Number is not valid' }
          })}
          placeholder="Phone Number"
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          {...register('address', { 
            required: 'Address is required', 
            maxLength: { value: 100, message: 'Address cannot exceed 100 characters' } 
          })}
          placeholder="Address"
        />
        {errors.address && <p className="error">{errors.address.message}</p>}
      </div>

      {/* Removed Date of Birth and Role fields */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
