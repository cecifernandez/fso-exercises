import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import Numbers from "./components/Numbers";
import personService from "./services/persons";
import Notification from "./components/Notification";

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setNewSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const filteredPersons = persons.filter(
    (person) =>
      person.name &&
      person.name.toLowerCase().includes((search || "").toLowerCase())
  );

  const handleAddPerson = ({ name, number }) => {
    const nameExists = persons.find((person) => person.name === name);
    // const newNumber = {...persons, number: number}

    if (
      nameExists &&
      window.confirm(
        `${name} is already added, do you want to replace the old number with a new one`
      )
    ) {
      personService
        .update(nameExists.id, { name, number })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== nameExists.id ? person : updatedPerson
            )
          );
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      const personObject = {
        name,
        number,
        id: persons.length + 1,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setSuccessMessage(`${personObject.name} was added successfully`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const deletePersons = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <h2>Search contact</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <h2>Add contact</h2>
      <AddForm onSubmit={handleAddPerson} />
      <Numbers persons={filteredPersons} deletePerson={deletePersons} />
    </div>
  );
};

export default App;
