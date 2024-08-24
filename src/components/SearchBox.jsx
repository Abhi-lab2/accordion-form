import React from 'react';
import { TextField, Box } from '@mui/material';

function SearchBox({ value, onChange }) {
  return (
    <Box mb={3}>
      <TextField
        fullWidth
        label="Search user"
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

export default SearchBox;
