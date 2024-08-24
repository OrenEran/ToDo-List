import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { ListContainer, Row, TextColumn, CategoryColumn, Text, Icon, DeleteIcon, CompleteIcon, EditInput, CompleteButton, DueDate } from './styles';
import { format } from 'date-fns';

const TodoList = ({ todos, categories, fetchData }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedText, setEditedText] = useState('');

  const toggleTodoCompletion = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/todos/${id}`, { completed: !completed }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Failed to update todo:', err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/todos/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Failed to delete todo:', err.message);
    }
  };

  const handleEdit = (id, text) => {
    setIsEditing(id);
    setEditedText(text);
  };

  const handleUpdate = async (id) => {
    if (!editedText.trim()) {
      console.error('Text cannot be empty.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/todos/${id}`, { text: editedText }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIsEditing(null);
      fetchData();
    } catch (err) {
      console.error('Failed to update todo:', err.message);
    }
  };

  const getCategoryIcon = (categoryId) => {
    const categoryID = typeof categoryId === 'object' ? categoryId._id : categoryId;
    const category = categories.find(cat => cat._id === categoryID);

    if (!category) {
      return null;
    }

    return <span>{category.icon}</span>;
  };

  return (
    <div>
      <ListContainer>
        {todos?.map((todo) => (
          <Row key={todo._id}>
            <CategoryColumn>
              <Icon>{getCategoryIcon(todo.categoryId)}</Icon>
            </CategoryColumn>
            <TextColumn>
              {isEditing === todo._id ? (
                <EditInput
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <Text onClick={() => handleEdit(todo._id, todo.text)} $isCompleted={todo.completed}>
                  {todo.text}
                </Text>
              )}
              {todo.categoryId.name === 'Scheduled' && todo.dueDate && (
                <DueDate>Due to: {format(new Date(todo.dueDate), 'Pp')}</DueDate>
              )}
            </TextColumn>
            {isEditing === todo._id ? (
              <CompleteButton onClick={() => handleUpdate(todo._id)}>Save</CompleteButton>
            ) : (
              <>
                <CompleteIcon onClick={() => toggleTodoCompletion(todo._id, todo.completed)}>C</CompleteIcon>
                <DeleteIcon onClick={() => deleteTodo(todo._id)}>X</DeleteIcon>
              </>
            )}
          </Row>
        ))}
      </ListContainer>
    </div>
  );
};

export default TodoList;
