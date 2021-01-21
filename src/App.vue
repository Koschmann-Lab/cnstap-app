<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({

  })

};
</script>

<style>
#app {
    background-color: #E4ECFF;
}


.v-select {
  font-size: 0.8rem;
  padding: 0;
  border-left:1px solid #dddddd;
  height: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
}


.v-data-table.customtable td {
  font-size: 0.8rem;
  padding: 0;
  border-left:1px solid #dddddd;
}

.v-data-table.customtable > .v-data-table__wrapper > table > tbody > tr.inputinforow > td {
  padding: 0px;
  height: 20px;
  border: none;
}

.v-data-table.customtable > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0px;
  height: 30px;
}
.v-data-table.customtable th {
  font-size: 0.8rem;
  padding: 1;
  height: 40px;
}

.v-data-table.customtable  tr  td {
  padding: 0;
}
</style>
