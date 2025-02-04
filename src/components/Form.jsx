import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, FormControl } from '@mui/material';

function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = event => {
    const value = event.target.value;
    const namePattern = /^[a-zA-Zа-яА-ЯіІєЄїЇґҐ0-9.]*$/;
    if (namePattern.test(value)) {
      setName(value);
    }
  };

  const handleChangeNumber = event => {
    const value = event.target.value;
    const numberPattern = /^[\d+()\-\s.]*$/;
    if (numberPattern.test(value)) {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  const isButtonDisabled = !name || !number;

  return (
    <Box component="form" onSubmit={handleSubmit} className="Form">
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Name"
          value={name}
          onChange={handleChangeName}
          type="text"
          name="name"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <TextField
          size="small"
          label="Phone number"
          value={number}
          onChange={handleChangeNumber}
          type="tel"
          name="number"
          required
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="Button"
        disabled={isButtonDisabled}
      >
        Add contact
      </Button>
    </Box>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
