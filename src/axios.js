import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hoang-burger-builder.firebaseio.com/',
});

export default instance;
