<template>
<div id="v-weather-week">
  <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
    <iframe frameborder="0" height="100%" width="100%" src="//youtube.com/embed/JYBpu1OyP0c?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1">
  </iframe>
  </div>

  <div class="icon-bar" v-if="this.currentWeather">
    <i class="wi wi-time-4"> {{this.tokyoTime}}</i>
    <i class="wi wi-thermometer"> {{kelvinToCelsius(this.currentWeather.main.temp)+'°'}}</i>
    <i class="wi wi-strong-wind"> {{this.currentWeather.wind.speed}}</i>
    <i class="wi wi-barometer"> {{this.currentWeather.main.pressure}}</i>
    <i class="wi wi-humidity"> {{this.currentWeather.main.humidity}}</i>
  </div>

  <main class="container">
    <div class="card-wrapper">
      <div v-for="day in weatherDays">
        <v-day-card :dayWeek='convertToDayOfWeek(day.dt_txt)'
                    :temperature='kelvinToCelsius(day.main.temp)'
                    :status='day.weather[0].main'
                    :description='day.weather[0].description.toUpperCase()'></v-day-card>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import DayCard from './DayCard.vue';
import moment from 'moment-timezone';
import { mapGetters } from 'vuex'


export default {
  components: {
    'v-day-card': DayCard
  },
  data: () => {
    return {
      tokyoTime: null,
      cityName: process.env.CITY_NAME,
      currentWeather: null,
      weatherDays: null
    }
  },
  methods: {
    updateTime() {
      this.tokyoTime = moment().tz("Asia/Tokyo").format("h:mm:ss a");
    },
    updateCurrentWeather() {
      this.$store.dispatch("updateCurrentWeather", this.cityName).then(() => {
        this.currentWeather = this.$store.getters.currentWeather;
      }).catch((error) => {
        console.log(error);
      });
    },
    updateForecast() {
      this.$store.dispatch("updateForecast", this.cityName).then(() => {
        this.weatherDays = this.$store.getters.forecast.list.filter(this.isAHalfDayWeather);
      }).catch((error) => {
        console.log(error);
      });
    },
    isAHalfDayWeather(weather) {
      return weather.dt_txt.endsWith("12:00:00");
    },
    convertToDayOfWeek(strDay) {
      return moment(strDay).format('dddd');
    },
    kelvinToCelsius(kelvinTemp) {
      return parseInt(kelvinTemp) - 273;
    }
  },
  beforeMount() {
    this.updateTime();
    this.updateCurrentWeather();
    this.updateForecast();
    this.intervalTime = setInterval(() => {this.updateTime();}, 1000);
    this.intervalWeathers = setInterval(() => {
      this.updateCurrentWeather();
      this.updateForecast();
    }, 10000);
  },
  beforeDestroy: function(){
    clearInterval(this.intervalTime);
    clearInterval(this.intervalWeathers);
  }
}
</script>
