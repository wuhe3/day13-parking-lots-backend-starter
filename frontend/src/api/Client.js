import axios from 'axios';

const Client = axios.create({
    baseURL: 'http://localhost:8080/api/parking', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Client;