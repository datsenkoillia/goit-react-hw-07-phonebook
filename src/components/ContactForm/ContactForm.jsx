import { useState } from 'react';
import { InputLabel, InputField, SubmitButton, Form } from './styled';


import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/contactsSlice';
import { addContact } from 'redux/contactsOperations';

export function ContactForm() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  const createContact = (name, phone) => {
    const newContact = {
      // id: nanoid(),
      name,
      phone,
    };

    const isExistContact = contacts.some(contact => contact.name === name);

    if (isExistContact) {
      alert(`${name} is already in contacts`);
    } else {
      resetForm();
      dispatch(addContact(newContact));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createContact(name, phone);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputLabel>
        Name
        <InputField
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputLabel>
      <InputLabel>
        Phone
        <InputField
          type="tel"
          name="number"
          value={phone}
          onChange={handlePhoneChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputLabel>
      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
}
