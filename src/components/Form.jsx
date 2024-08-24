import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const genders = ['male', 'female', 'transgender', 'rather not say', 'other']

function EditForm({ user, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        first: user.first,
        last: user.last,
        age: user.age || '',
        gender: user.gender,
        country: user.country,
        description: user.description,
    })
    // console.log('formData: ', formData);

    const [errors, setErrors] = useState({
        first: false,
        last: false,
        age: false,
        gender: false,
        country: false,
        description: false,
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'age') {
            if (!/^\d*$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors, age: true,
                }));
                return
            }
        } else if (name === 'country') {
            if (/\d/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors, country: true,
                }));
                return
            }
        }

        setFormData({
            ...formData,
            [name]: value
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === '',
        }))
    };

    const isFormValid = () => {
        return (
            formData.first.trim() &&
            formData.last.trim() &&
            formData.age.toString().trim() &&
            genders.includes(formData.gender) &&
            formData.country.trim() &&
            formData.description.trim() &&
            (formData.first !== user.first ||
                formData.last !== user.last ||
                formData.age !== user.age ||
                formData.gender !== user.gender ||
                formData.country !== user.country ||
                formData.description !== user.description)
        )
    };

    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="First Name"
                        name="first"
                        value={formData.first}
                        onChange={handleChange}
                        error={errors.first}
                        helperText={errors.first && "First name is required"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name"
                        name="last"
                        value={formData.last}
                        onChange={handleChange}
                        error={errors.last}
                        helperText={errors.last && "Last name is required"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        error={errors.age}
                        helperText={errors.age && "Please enter a valid age"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Gender"
                        name="gender"
                        select
                        value={formData.gender}
                        onChange={handleChange}
                        fullWidth
                    >
                        {genders?.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        error={errors.country}
                        helperText={errors.country && "Country cannot contain numbers"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        error={errors.description}
                        helperText={errors.description && "Description is required"}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12} textAlign="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSave({ ...user, ...formData })}
                        disabled={!isFormValid()}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onCancel}
                        style={{ marginLeft: '8px' }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EditForm
