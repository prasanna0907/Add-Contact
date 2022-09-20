import React, { useState, useEffect } from 'react';
import './style.css';

import { v4 as uuid } from 'uuid';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
export default function App() {
  const Local_storage_id = 'contacts';
  const [contacts, setContacts] = useState([]);
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    });
    setContacts(newContactList);
  };
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(Local_storage_id));
    if (retrieveContacts) {
      setContacts(retrieveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(Local_storage_id, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Header />

      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}
