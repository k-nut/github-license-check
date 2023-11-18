<template>
  <div id="app">
    <license-check />
  </div>
</template>

<script>
import LicenseCheck from './components/LicenseCheck.vue'

export default {
  name: 'app',
  components: {
    LicenseCheck
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
