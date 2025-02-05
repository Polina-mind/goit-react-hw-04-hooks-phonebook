import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';

function Filter({ onFilterChange }) {
  const [filter, setFilter] = useState('');

  const handleChange = event => {
    const filterText = event.target.value;

    setFilter(filterText);
    onFilterChange(filterText);
  };

  return (
    <Box className="Form" component="form" pb={0}>
      <TextField
        size="small"
        className="InputFilter"
        label="Find by name"
        value={filter}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
