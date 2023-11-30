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

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submit action
        console.log({ name, age, weight, contactNumber });
        // Here you will later add the POST request to your server
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
