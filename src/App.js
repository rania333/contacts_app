import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Create from './create';
import Listcontact from './listContacts';
import * as ContactsAPI from './utils/ContactsAPI';
class APP extends Component {
  state = { 
    contacts: [],
    screen: 'list'
  }
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
    }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
    ContactsAPI.remove(contact)
  }
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }
  render() { 
    return ( 
      <div>
        <Route exact path="/" render={() => (
          <Listcontact contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <Create
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    );
  }
}


export default APP;