<template>
  <div id="app">
    <Headers/>
    <div class="mainmains">
      <Menu v-show="!test"/>
      <div id="someComponents" :style="{paddingLeft: test ? '0' : '240px'}">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from './views/headers';
import Menu from './views/menu';
export default {
  name: 'App',
  components: {
    Headers, Menu
  },
  data() {
    return {
      test: false
    };
  },
  watch: {
    $route: {
      handler: function(val){
        this.test = val.path.includes('/test');
        document.getElementById('app').scrollTo(0,0);
      },
      deep: true
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
