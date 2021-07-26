import { useState } from "react";
import styles from "./Form.module.css";
import shortId from "shortid";

const Form = ({ onSubmit }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameImputId = shortId.generate();
  const numberImputId = shortId.generate();

  const handleInputName = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ id, name, number });
    reset();
  };

  const reset = () => {
    setId("");
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor={nameImputId} className={styles.name}>
        Name
      </label>
      <input
        id={nameImputId}
        className={styles.name_input}
        type="text"
        autoComplete="off"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        onChange={handleInputName}
        required
      />

      <label htmlFor={numberImputId} className={styles.name}>
        Phone number
      </label>
      <input
        id={numberImputId}
        className={styles.name_input}
        type="tel"
        autoComplete="off"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        onChange={handleInputName}
        required
      />

      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
