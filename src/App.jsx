import React, { useEffect, useState, useReducer } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'uploadContacts':
      return [...action.payload];

    case 'addContact':
      return [action.payload.contact, ...state];

    case 'deleteContact':
      return state.filter(({ id }) => id !== action.payload.id);

    default:
      return state;
  }
};

function App() {
  const [contacts, dispatch] = useReducer(contactsReducer, []);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts)
      dispatch({ type: 'uploadContacts', payload: parsedContacts });
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newName, newNumber) => {
    const contact = {
      id: uuidv4(),
      name: newName,
      number: newNumber,
    };

    dispatch({ type: 'addContact', payload: { contact } });
  };

  const deleteContact = id => {
    dispatch({ type: 'deleteContact', payload: { id } });
  };

  const handleFilterChange = filter => setFilter(filter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const checkContact = (newName, newNumber) => {
    for (const { name, number } of contacts) {
      if (name === newName && number === newNumber) {
        alert('Contact already exists');
        return false;
      }
      if (number === newNumber) {
        alert('Contact with the same number already exists');
        return false;
      }
    }
    return true;
  };

  return (
    <Container maxWidth="sm" sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Phonebook
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Form onCheckContact={checkContact} onSubmit={addContact} />
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        {contacts.length > 0 && <Filter onFilterChange={handleFilterChange} />}

        <Contacts
          contacts={filter ? getVisibleContacts() : contacts}
          onDelete={deleteContact}
        />
      </Paper>
    </Container>
  );
}

export default App;
