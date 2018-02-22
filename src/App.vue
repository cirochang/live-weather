<template>
  <div id="v-app">
    <router-view></router-view>
  </div>
</template>

<script>
import WeatherWeek from './components/WeatherWeek.vue'

export default {
  components: {
    'v-weather-week': WeatherWeek
  }
}
</script>
