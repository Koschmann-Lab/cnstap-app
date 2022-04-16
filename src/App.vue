<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'CNS-TAP',
    titleTemplate: '%s | Formalized decision-making algorithm for neuro-oncologists',
    htmlAttrs: {
     lang: 'en-US'
   },
   meta: [
     { charset: 'utf-8' },
     { name: 'description', content: 'The Central Nervous System Targeted Agent Prediction (CNS TAP) tool is a formalized decision-making algorithm to assist clinicians with selecting the optimal targeted therapy for neuro-oncology patients based on drug properties, clinical and pre-clinical data, and patient-specific sequencing data.' },
     { name: 'author', content: 'Karthik Ravi @ University of Michigan: 2019' }
   ]
  },
  data: function () {
    return { authenticated: false }
  },
  created() { this.isAuthenticated() },
  watch: {
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated(){
      this.authenticated = await this.$auth.isAuthenticated()
    },
    login () {
      this.$auth.signInWithRedirect()
    },
    signUp () {
      this.$router.push('signUp')
    },
    async logout () {
      await this.$auth.signOut()
    }
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
