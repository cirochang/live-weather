<template>
<div id="v-day-card">
  <section class="card anim-flip">
    <header>
      <h1 class="card-header">{{dayWeek}}</h1>
    </header>
    <p class="card-temp box-highlight">{{temperature}}</p>
    <div class="icon">



      <div class="cloud-group" v-if="status==='Clouds'">
        <span class="icon-cloud cloud-circle shadow-cloud-clip"></span>
        <span class="icon-cloud cloud-base shadow-cloud-clip"></span>
      </div>

      <div class="cloud-group" v-else-if="status==='Rain'">
        <span class="icon-cloud cloud-circle shadow-cloud-clip"></span>
        <span class="icon-cloud cloud-base shadow-cloud-clip"></span>
        <div class="rain-group">
          <span class="icon-cloud rain"></span>
        </div>
      </div>

      <div class="cloud-group" v-else>
        <div class="sun-group">
          <span class="icon-cloud sun"></span>
          <span class="icon-cloud sunshine"></span>
        </div>
        <span class="icon-cloud cloud-circle shadow-cloud-clip"></span>
        <span class="icon-cloud cloud-base shadow-cloud-clip"></span>
      </div>

    </div>


    <p class="card-info">{{description}}</p>
  </section>
</div>
</template>

<script>
export default {
  props: ['dayWeek', 'temperature', 'status', 'description'],
}

</script>
