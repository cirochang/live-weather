import Vue from 'vue'
import Vuex from 'vuex'
import {PROXY_WEATHER_API} from '../gateways/proxy-weather-api'

const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";
const SET_FORECAST = "SET_FORECAST";
const SET_LIVE_VIDEOS = "SET_LIVE_VIDEOS";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeather: {},
    forecast: {},
    liveVideos: {}
  },
  mutations: {
    [SET_LIVE_VIDEOS](state, liveVideos) {
      state.liveVideos = liveVideos;
    },
    [SET_FORECAST](state, forecast) {
      state.forecast = forecast;
    },
    [SET_CURRENT_WEATHER](state, currentWeather) {
      state.currentWeather = currentWeather;
    },
  },
  actions: {
    updateLiveVideos({ commit }, cityName) {
      return new Promise( (resolve, reject) => {
        PROXY_WEATHER_API.get(`live-video?cityName=${cityName}`).then(response => {
          commit(SET_LIVE_VIDEOS, response.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
      });
    },
    updateForecast({ commit }, cityName) {
      return new Promise( (resolve, reject) => {
        PROXY_WEATHER_API.get(`forecast?cityName=${cityName}`).then(response => {
          commit(SET_FORECAST, response.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
      });
    },
    updateCurrentWeather({ commit }, cityName) {
      return new Promise( (resolve, reject) => {
        PROXY_WEATHER_API.get(`current_weather?cityName=${cityName}`).then(response => {
          commit(SET_CURRENT_WEATHER, response.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
      });
    },
  },
  getters: {
    currentWeather: state => {
      return state.currentWeather;
    },
    forecast: state => {
      return state.forecast;
    },
    liveVideos: state => {
      return state.liveVideos;
    }
  }
})
