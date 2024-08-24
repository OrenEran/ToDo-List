import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Container, FormContainer, Input, Button, LogOffButton, Dropdown } from './styles'; 
import TodoList from '../TodoList';
import KeyComponent from '../Key';
import Author from '../Author';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; 
import { FaHourglassHalf, FaFolder, FaHome, FaExclamationTriangle, FaShoppingCart } from 'react-icons/fa';

const Todo = ({ onLogOff }) => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const todoResponse = await axios.get('/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todoResponse.data);

      const categoryResponse = await axios.get('/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categoryResponse.data);
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const addTodo = async (e) => {
    e.preventDefault();

    if (!input || !selectedCategory) {
      setError('Please enter a todo and select a category.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/todos',
        { text: input, completed: false, categoryId: selectedCategory.value, dueDate: dueDate ? new Date(dueDate).toISOString() : null },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInput('');
      setSelectedCategory(null);
      setDueDate(null);
      setError('');
      fetchData();
    } catch (err) {
      console.error('Failed to add todo:', err.message);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);

    const selectedCategoryObject = categories.find(cat => cat._id === selectedOption.value);
    if (selectedCategoryObject && selectedCategoryObject.name === 'Scheduled') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Work':
        return <FaFolder />;
      case 'Personal':
        return <FaHome />;
      case 'Urgent':
        return <FaExclamationTriangle />;
      case 'Shopping':
        return <FaShoppingCart />;
      case 'Scheduled':
        return <FaHourglassHalf />;
      default:
        return null;
    }
  };

  const categoryOptions = categories.map(category => ({
    value: category._id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {getCategoryIcon(category.name)}
        <span style={{ marginLeft: 8 }}>{category.name}</span>
      </div>
    ),
  }));

  return (
    <Container>
      <LogOffButton onClick={onLogOff}>Log Off</LogOffButton>
      <h2>List Of ToDos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormContainer onSubmit={addTodo}>
        <Dropdown
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="Select Category"
        />
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your todo"
        />
        {showDatePicker && (
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select due date and time"
          />
        )}
        <Button type="submit">Add Todo</Button>
      </FormContainer>
      <TodoList todos={todos} categories={categories} fetchData={fetchData} />
      <KeyComponent todos={todos} />
      <Author />
    </Container>
  );
};

export default Todo;
