<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import axios from "axios"
export default {
  name: 'App',
  data: () => ({

  }),

  created:function(){
    var data = JSON.stringify({"pathways":"AKT"});
    var config = {
      method: 'post',
      url: 'http://localhost:8080/CNSTAPIDT/intrinsicDrugTable/2.0/intrinsicDrugTable',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });


  }



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

.v-data-table.customtable th {
  font-size: 0.8rem;
  padding: 1;
  height: 40px;
}

.v-data-table.customable tr  {
  height: 30px;
}

</style>
