import React, { useEffect, useState, useReducer } from 'react';
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
      return state.filter(contact => contact.id !== action.payload.id);

    default:
      return state;
  }
};

function App() {
  //contacts
  // const [contacts, setContacts] = useState([]);

  //через useReducer
  const [contacts, dispatch] = useReducer(contactsReducer, []);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      // setContacts(parsedContacts);

      //через редьюсер
      dispatch({ type: 'uploadContacts', payload: parsedContacts });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    if (name !== '' && number !== '') {
      const namesArr = contacts.map(({ name }) => name);
      if (namesArr.includes(contact.name)) {
        alert('Contact already exist');
        return;
      }
      // setContacts(prevContacts => [contact, ...prevContacts]);

      //через редьюсер
      dispatch({ type: 'addContact', payload: { contact } });
    }
  };

  const deleteContact = id => {
    // setContacts(prevContacts =>
    //   prevContacts.filter(contact => contact.id !== id),
    // );

    //через редьюсер
    dispatch({ type: 'deleteContact', payload: { id } });
  };

  //filter
  const [filter, setFilter] = useState();

  const onInputFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <>
      <h2 className="Title">Phonebook</h2>
      <Form onSubmit={addContact}></Form>

      <h2 className="Title">Contacts</h2>
      <Filter onInputFilter={onInputFilter}></Filter>

      <Contacts
        contacts={filter ? getVisibleContacts() : contacts}
        onDelete={deleteContact}
      ></Contacts>
    </>
  );
}

export default App;
