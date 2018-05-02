import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component{
static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

state = {
    query: ''
}

updateQuery = (query) => {
    this.setState({query: query.trim()})
}

clearQuery = () => {
    this.setState({query : ''})
}

    render() {
        const {contacts, onDeleteContact} = this.props
        const {query} = this.state

        let showingContacts
        if(query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingContacts = contacts.filter((conatct) => match.test(conatct.name))
        }
        else{
            showingContacts = contacts            
        }

        showingContacts.sort(sortBy('name'))
        return (

        <div className="list-contacts">
        <div className="list-contacts-top">
        <input 
        className="search-contacts" 
        type="text" 
        value={this.state.query} 
        onChange={event => this.updateQuery(event.target.value)}
        placeholder="Search contacts"
         />
            </div>    
            {showingContacts.length !== contacts.length && (
                <div className="showing-contacts">
                <span>Now Showing {showingContacts.length} of {contacts.length} total</span>
                <button onClick={this.clearQuery}>Show all</button>
                </div>
            )}

            <ol className="contact-list">
            {showingContacts.map((contact) => (
                <li key={contact.id} className="contact-list-item">
                    <div className="contact-avatar" style={{
                        backgroundImage: `url(${contact.avatarURL})`
                    }} />
    
                    <div className="contact-details">
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    </div>
    
                    <button onClick={() => onDeleteContact(contact)} className="contact-remove">
                        Remove
                    </button>
                </li>
            ))}
        </ol>
        </div>
        )
    }
}

export default ListContacts;