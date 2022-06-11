// Global Variables

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import WeatherWeek from './components/WeatherWeek.vue'

import store from './store';

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

require('./assets/css/main.css');
require('./assets/css/weather-icons.min.css');
require('./assets/css/weather-icons-wind.min.css');

Vue.use(VueRouter);

// Register routes
const routes = [
  {
    path: '/:cityName',
    component: WeatherWeek,
    name: 'Home',
  }
];

const router = new VueRouter({routes});


// Instantiate application to the DOM
const app = new Vue({
    router,
    el: '#app',
    store,
    data(){
        return {
            order_details: {}
        }
    },
    render: h => h(App)
});
