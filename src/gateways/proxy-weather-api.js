import axios from 'axios';

export var PROXY_WEATHER_API = axios.create({
  baseURL: process.env.PROXY_WEATHER_API_URI
});
