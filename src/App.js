import './App.css';
import React, { Component } from 'react';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';
import ContactForm from './Components/ContactForm/ContactForm';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  submitId = uuidv4();

  formSubmitHandle = data => {
    const contact = {
      id: this.submitId,
      name: data.name,
      number: data.number,
    };

    const result = this.state.contacts.some(
      value => value.name === contact.name,
    );

    if (!result) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else if (result) {
      alert(`${contact.name} is already in contacts`);
    }
  };

  inputSearchChange = e => {
    this.setState({ filter: e.target.value });
  };

  inputContactSearch = e => {
    const { filter, contacts } = this.state;
    const searchValue = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchValue),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contactsLocal = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLocal);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const { inputSearchChange, deleteContact, formSubmitHandle } = this;
    const visibleContacts = this.inputContactSearch();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandle} />
        <h1>Contacts</h1>
        <Filter value={filter} onChange={inputSearchChange} />
        <ContactList contacts={visibleContacts} onDeleteId={deleteContact} />
      </div>
    );
  }
}

export default App;
