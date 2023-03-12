import React, { Component } from "react";
import { nanoid } from 'nanoid';
import style from './app.module.scss';

import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";


export class App extends Component {
  state = {
    contacts: [
      // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem("contacts"));
    if (contactsFromLocalStorage) {
      this.setState({contacts: contactsFromLocalStorage});
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.contacts !== prevState) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts) )
    }
  }

  handleSubmit = (state) => {
    const foundName = this.state.contacts.find(contact => contact.name === state.name);
    
    if (foundName) {
      alert(`${state.name} is already in contacts`)
      return;
    }
    this.setState(prevState => ({ contacts: [...prevState.contacts, {id: nanoid(4), name: state.name, number: state.number}]}));
  }

  handleChange = (evt) => {
    const { name, value } = evt.currentTarget;

    this.setState({[name]: value});
  }

  deleteContact = (evt) => {
    const id = evt.currentTarget.id;
    this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== id)}));
  }

  handleFilter = () => {
    const filter = this.state.filter;
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  render() {
    return (
      <div className={style.container}>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit}/>
  
        <h2 className={style.title}>Contacts</h2>
        <Filter handleChange={this.handleChange} filter={this.state.filter}/>
        <ContactList onDelete={this.deleteContact} contacts={this.state.filter === '' ? this.state.contacts : this.handleFilter()}/>
      </div>
    );
  }
}
