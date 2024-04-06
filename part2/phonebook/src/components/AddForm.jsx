import { useState } from "react";

const AddForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddForm;
