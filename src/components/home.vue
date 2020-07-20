<template>
  <v-container>

<br><br><br><br><br><br>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-3 font-weight-bold mb-3 grey--text text--darken-2">
          {{ pgTitle }}
        </h1>

        <p class="headline font-weight-regular grey-text text--darken-2">
          {{ pgSubTitle }}

       <br><br>

        </p>

        </v-col>
    </v-row>

    <v-row justify="center" class="text-left">
        <v-col
          class="mb-5"
          cols="10">
        <p class="title font-weight-regular grey white--text">
             {{ Disclaimer }}

         <br><br><br><br><br>

        </p>
        </v-col>
  </v-row>

  <v-row class="text-center">
      <v-col class="mb-4">
       <v-btn @click="begin_click" large class="darken-4 grey white--text">
        <h1 class="display-1 text-capitalize">Begin</h1>
       <v-icon large right>mdi-login</v-icon>
       </v-btn>
      </v-col>
   </v-row>

  </v-container>
</template>

<script>
  export default {
    name: 'home',

    data: () => ({

    pgTitle: 'CNS-TAP',
    pgSubTitle: 'Central Nervous System Targeted Agent Prediction Tool',
    Disclaimer: 'This is where we will display the Disclaimer',

    }),
    methods:{
    begin_click:function(){this.$router.push("/UserView")}
    }
  }


</script>
