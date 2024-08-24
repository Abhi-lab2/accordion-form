import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    Grid,
    Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditForm from './Form'
import DeleteDialog from './DeletePopup'

function AccordionItem({ user, editMode, setEditMode, onSave, onDelete }) {
    const [expanded, setExpanded] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleChange = () => {
        if (!editMode || expanded) {
            setExpanded(prev => !prev)
        }
    };

    const handleEdit = () => {
        if (!editMode) setEditMode(true)
    }

    const handleSave = updatedUser => {
        onSave(user.id, updatedUser)
        setEditMode(false)
        setExpanded(false);
    }

    const handleDelete = () => {
        onDelete(user.id)
        setOpenDeleteDialog(false)
    }

    const handleDeleteClicked = () => {
        setOpenDeleteDialog(true)
    };

    return (
        <>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Avatar src={user.picture} alt={`${user.first} ${user.last}`} />
                    <Typography sx={{ marginLeft: 2 }}>
                        {user.first} {user.last}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {editMode ? (
                        <EditForm user={user} onSave={handleSave} onCancel={() => setEditMode(false)} />
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography><strong>Age:</strong> {user.age} Years</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography><strong>Gender:</strong> {user.gender}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography><strong>Country:</strong> {user.country}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography><strong>Description:</strong> {user.description}</Typography>
                            </Grid>
                            <Grid item xs={12} textAlign="right">
                                <IconButton onClick={handleEdit} disabled={user.age < 18}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleDeleteClicked}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )}
                </AccordionDetails>
            </Accordion>
            <DeleteDialog
                user={user}
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}

export default AccordionItem;
