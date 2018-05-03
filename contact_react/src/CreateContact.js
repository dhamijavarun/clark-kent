import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends Component {

    handleSubmit = (e) => {
       
        const values = serializeForm(e.target, {hash: true})
        console.log(values)
        if(this.props.onCreateContact)
            this.props.onCreateContact(values)
    }

    render() {
        return(
            <div>
                <Link className="close-create-contact" to="/" >Close</Link>
                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <ImageInput 
                    className="create-contact-avatar-input"
                    name="avatarURL"
                    maxHeight = {64}/>
                </form>
                <div className="create-contact-details">
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="email" placeholder="Email" />
                    <button>Add Contact</button>
                </div>
            </div>
        )
    }
}

export default CreateContact;