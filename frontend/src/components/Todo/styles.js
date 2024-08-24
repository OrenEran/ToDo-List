import styled from "styled-components";
import Select from 'react-select';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  background-color: #f7f7f7;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ef7360;
  border-radius: 8px;

  :focus {
    border: 3px solid #ef7360;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #ef7360;
  border-radius: 8px;
  border: none;
  color: white;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background-color: #d9534f;
  }
`;

export const LogOffButton = styled.button`
  background-color: #d9534f;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #c9302c;
  }
`;

export const Dropdown = styled(Select)`
  width: 100%;
  margin-bottom: 10px;

  .react-select__control {
    border: 1px solid #ef7360;
    border-radius: 8px;
    box-shadow: none;

    &:hover {
      border-color: #ef7360;
    }
  }

  .react-select__placeholder {
    color: #999;
  }

  .react-select__single-value {
    color: #333;
  }
`;
