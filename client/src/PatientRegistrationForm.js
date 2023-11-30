import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const PatientRegistrationForm = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    
    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };
    
    const handleContactNumberChange = (event) => {
        setContactNumber(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit action

        const patientData = {
            patient_name: name,
            patient_age: age,
            patient_weight: weight,
            patient_contact_number: contactNumber
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientData)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                // Additional logic upon successful registration, like redirecting or showing a success message
            } else {
                // Handle server errors (response not OK)
                console.error('Registration failed:', response.status, response.statusText);
                // Show error message to the user, if appropriate
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
            // Show error message to the user, if appropriate
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                value={age}
                onChange={handleAgeChange}
            />
            <TextField
                label="Weight"
                variant="outlined"
                fullWidth
                margin="normal"
                value={weight}
                onChange={handleWeightChange}
            />
            <TextField
                label="ContactNumber"
                variant="outlined"
                fullWidth
                margin="normal"
                value={contactNumber}
                onChange={handleContactNumberChange}
            />
            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
    
};

export default PatientRegistrationForm;
