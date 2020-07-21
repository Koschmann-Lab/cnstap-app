<template>
  <v-app>
    <v-content>

      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

// import home from './components/home';



export default {
  name: 'App',

//  home,



  data: () => ({


  }),
};
</script>

<style>
#app {
    background-color: #E4ECFF;
}
.v-data-table.customtable td {
  font-size: 1rem;
  padding: 0;
}
</style>
