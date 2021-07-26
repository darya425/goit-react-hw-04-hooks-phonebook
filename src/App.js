import { useState, useEffect } from "react";
import styles from "./App.module.css";
import shortId from "shortid";

import Layout from "./Components/Layout";
import Form from "./Components/Form";
import ContactsList from "./Components/ContactsList";
import Filter from "./Components/Filter";

// import contacts from "./contacts.json";

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem("contacts")) ?? [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      { id: "id-5", name: "Davoria Paori", number: "123-56-89" },
      { id: "id-6", name: "Salvador Dali", number: "856-48-24" },
    ]
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  contacts.map((contact) => console.log(contact.name));

  // componentDidMount() {
  //   const contacts = localStorage.getItem("contacts");
  //   const parsetContacts = JSON.parse(contacts);

  //   if (parsetContacts) {
  //     this.setState({ contacts: parsetContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const nextContact = this.state.contacts;
  //   const prevContact = prevState.contacts;

  //   if (nextContact !== prevContact) {
  //     localStorage.setItem("contacts", JSON.stringify(nextContact));
  //   }
  // }

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: shortId.generate(),
      name,
      number,
    };

    const newContact = contact.name.toLowerCase();

    const savedContacts = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact
    );

    if (savedContacts) {
      alert(contact.name + " is already in contacts.");
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const deleteTodo = (contactId) => {
    setContacts((contacts) =>
      contacts.filter((contact) => contact.id !== contactId)
    );
  };

  const normalizeFilter = filter.toLowerCase();
  const visibileContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
  console.log(visibileContacts);

  return (
    <Layout>
      <div className={styles.box}>
        <h1 className={styles.title}>Phonebook</h1>
        <Form onSubmit={formSubmitHandler} />

        <h2 className={styles.contact}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contactData={visibileContacts}
          onDeleteContact={deleteTodo}
        />
      </div>
    </Layout>
  );
};

export default App;
