import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBox from '../components/SearchBox';
import AccordionItem from '../components/AccordionItem';
import data from '../db.json';

function MainIndex() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditable, setIsEditable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const updatedUSers = data?.map(user => {
            const age = calculateUserAge(new Date(user.dob))
            return { ...user, age }
        });
        setIsLoading(true)
        setUsers(updatedUSers)
    }, [])

    const calculateUserAge = (dob) => {
        const now = new Date();
        let age = now.getFullYear() - dob.getFullYear();
        let month = now.getMonth() - dob.getMonth();
        if (month < 0 || (month === 0 && now.getDate() < dob.getDate())) {
            age--
        }
        // console.log('age: ', age);
        return age
    }

    const handleSearchTermChangre = (event) => {
        const value = event.target.value;
        setSearchTerm(value.toLowerCase())
    };

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.first} ${user.last}`.toLowerCase();
        return fullName.includes(searchTerm)
    });

    // save/update users
    const handleUpdateThUser = (id, updatedUser) => {
        // setIsEditable(true)
        const updatedUsers = users?.map(user => (user.id === id ? updatedUser : user))
        setUsers(updatedUsers)
    }

    // to delete the users
    const handleDeleteUser = (id) => {
        const updatedUsers = users?.filter(user => user.id !== id)
        setUsers(updatedUsers)
    }

    return (
        isLoading && <Container>
            <Box my={4}>
                <Typography variant="h4"  align="center" component="h1" gutterBottom style={{ backgroundColor: '#e5e5e5' }}>
                    Users Details
                </Typography> <br />
                <SearchBox value={searchTerm} onChange={handleSearchTermChangre} />
                {filteredUsers?.map(user => (
                    <AccordionItem
                        key={user.id}
                        user={user}
                        editMode={isEditable}
                        setEditMode={setIsEditable}
                        onSave={handleUpdateThUser}
                        onDelete={handleDeleteUser}
                    />
                ))}
            </Box>
        </Container>
    )
}

export default MainIndex