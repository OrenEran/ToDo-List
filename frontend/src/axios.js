import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api' || process.env.REACT_APP_API_BASE_URL ,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
