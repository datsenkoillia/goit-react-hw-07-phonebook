import { ContactElement } from 'components/ContactElement';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/contactsOperations';
import { selectContacts, selectFilter } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const delContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const contactList = filteredContacts();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {contactList.map(({ id, name, phone }) => (
        <ContactElement
          key={id}
          id={id}
          name={name}
          number={phone}
          deleteContact={delContact}
        />
      ))}
    </ul>
  );
};
