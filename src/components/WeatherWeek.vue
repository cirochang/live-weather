<template>
<div id="v-weather-week">
  <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
    <iframe v-if="this.liveVideos" frameborder="0" height="100%" width="100%" v-bind:src="'//youtube.com/embed/' + videoId + '?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1'">
  </iframe>
  </div>

  <div class="icon-bar" v-if="this.currentWeather">
    <i class="wi wi-time-4"> {{this.timeNow}}</i>
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
import cityTimezones from 'city-timezones';


export default {
  components: {
    'v-day-card': DayCard
  },
  data: () => {
    return {
      timeNow: null,
      currentWeather: null,
      weatherDays: null,
      liveVideos: null
    }
  },
  computed: {
    timezoneOffsetMinutes() {
      if(!this.currentWeather) {
        return null;
      }
      return this.currentWeather.timezone / 60;
    },
    cityName() {
      return this.$route.params.cityName;
    },
    videoId() {
      if(!this.liveVideos || !this.liveVideos.items) {
        return null
      }
      if(this.liveVideos.items.length < 1) {
        return null
      }
      return this.liveVideos.items[0].id.videoId;
    }
  },
  methods: {
    updateTime() {
      if(!this.timezoneOffsetMinutes) {
        return null;
      }
      this.timeNow = moment().utcOffset(this.timezoneOffsetMinutes).format("h:mm:ss a");
    },
    updateLiveVideos() {
      this.$store.dispatch("updateLiveVideos", this.cityName).then(() => {
        this.liveVideos = this.$store.getters.liveVideos;
      }).catch((error) => {
        console.log(error);
      });
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
    window.addEventListener('popstate', this.updateLiveVideos);

    this.updateTime();
    this.updateCurrentWeather();
    this.updateForecast();
    this.updateLiveVideos();
    this.intervalTime = setInterval(() => {this.updateTime();}, 1000);
    this.intervalWeathers = setInterval(() => {
      this.updateCurrentWeather();
      this.updateForecast();
    }, 10000);
  },
  beforeDestroy: function(){
    window.removeEventListener('popstate', this.updateLiveVideos);
    clearInterval(this.intervalTime);
    clearInterval(this.intervalWeathers);
  }
}
</script>
