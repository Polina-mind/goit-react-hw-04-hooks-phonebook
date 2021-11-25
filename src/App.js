import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  //contacts
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
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
      setContacts([contact, ...contacts]);
    }
  };

  const deleteContact = id =>
    setContacts(contacts.filter(contact => contact.id !== id));

  //filter
  const [filter, setFilter] = useState();

  const onInputFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = (contacts, filter) => {
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
        contacts={filter ? getVisibleContacts(contacts, filter) : contacts}
        onSubmit={deleteContact}
      ></Contacts>
    </>
  );
}

export default App;
