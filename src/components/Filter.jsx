import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';

function Filter({ onInputFilter }) {
  const [filter, setFilter] = useState('');

  const handleChange = event => {
    const filterText = event.target.value;

    setFilter(filterText);
    onInputFilter(filterText);
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
  onInputFilter: PropTypes.func.isRequired,
};

export default Filter;
