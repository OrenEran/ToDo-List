import styled from "styled-components";

export const ListContainer = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CategoryColumn = styled.div`
  flex-basis: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextColumn = styled.div`
  flex-basis: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.span`
  font-size: 1rem;
  color: ${(props) => (props.$isCompleted ? 'red' : '#333')};
  text-decoration: ${(props) => (props.$isCompleted ? 'line-through' : 'none')};
  cursor: pointer;
`;

export const DateColumn = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

export const DueDate = styled.span`
  margin-left: 10px;
  font-size: 0.9rem;
  color: #666;
`;

export const EditInput = styled.input`
  font-size: 1rem;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Icon = styled.span`
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const CompleteButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 0.8rem;

  &:hover {
    background-color: #45a049;
  }
`;

export const DeleteIcon = styled.button`
  background-color: #f44336; /* צבע רקע אדום */
  color: white; /* פונט לבן */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 0.8rem;

  &:hover {
    background-color: #d32f2f; /* צבע רקע אדום כהה יותר בזמן ריחוף */
  }
`;

export const CompleteIcon = styled(CompleteButton)`
  background-color: #4CAF50;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
