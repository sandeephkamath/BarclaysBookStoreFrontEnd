import axios from 'axios';

export const ApiClient = axios.create({
    baseURL: 'https://barclays-book-store-backend.herokuapp.com/',
    timeout: 50000,
});
