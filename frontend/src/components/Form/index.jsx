import React from 'react';

const Form = ({ input, setInput, addTodo }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
