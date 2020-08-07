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
  font-size: 0.8rem;
  padding: 0;
  border-left:1px solid #dddddd;
}

.v-data-table.customtable th {
  font-size: 0.8rem;
  padding: 1;
  height: 40px;
}

.v-data-table.customable tr {
  height: 30px;
}

</style>
