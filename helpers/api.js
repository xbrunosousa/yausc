import axios from 'axios';

let baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:25900/yausc'
    : 'https://api.brunosousa.dev/yausc';

export default axios.create({
  baseURL: baseURL
});
