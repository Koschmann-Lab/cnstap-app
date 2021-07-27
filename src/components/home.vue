<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-3 font-weight-bold mb-3 grey--text text--darken-2">
          {{ pgTitle }}
        </h1>

        <div class="headline font-weight-regular grey--text text--darken-2">
          {{ pgSubTitle }}
        </div>
        </v-col>

    </v-row>

    <v-row justify="center" class="text-left">
        <v-col
          class="mb-5"
          cols="10">

                <p>
                  <template>
                  <v-card>
                    <v-card-text class="bluebg">
                      <div class="mb-4 bluebg" >
The Central Nervous System Targeted Agent Prediction (CNS TAP) tool is a formalized decision-making algorithm to assist clinicians with selecting the optimal targeted therapy for neuro-oncology patients based on drug properties, clinical and pre-clinical data, and patient-specific sequencing data. The main article describing the underlying methodologies and evaluated criteria can be found here: <a href="https://pubmed.ncbi.nlm.nih.gov/29235051/" target="_blank">Development of the CNS TAP tool for the selection of precision medicine therapies in neuro-oncology. J Neurooncol. 2018;137(1):155-169.</a>

                      </div>
                    </v-card-text>
                  </v-card>
                </template>
              </p>

                <template>
                          <!-- v-card
                          v-scroll.self="onScroll"
                          class="overflow-y-auto blue-grey lighten-3"
                            max-height="220" -->

                            <v-card
                            v-scroll.self="onScroll"
                            class="overflow-y-auto blue-grey lighten-3"
                              max-height="220">

                          <v-card-text>
                          <div class="mb-4">
                            <b><u>DISCLAIMER:</u></b>&nbsp;By using the CNS-TAP site, you signify your assent to the following terms and conditions. These terms and conditions may be amended or updated at any time by the creators and it is the prevailing terms and conditions from time to time that are agreed to apply.

  <br><br>The software designer and provider, including any collaborating institution(s), including the University Of Michigan, shall have no liability to any patient or any other person. no such person or entity assumes any legal liability or responsibility for the accuracy, completeness, suitability or usefulness of CNS-TAP or related information. any and all liability arising directly or indirectly from the use of this application is hereby disclaimed. the information herein is provided "as is" and without any warranty expressed or implied, including the warranties of merchantability and fitness for a particular purpose.

  <br><br>Unless otherwise indicated, the content of this CNS-TAP site (including all images, information, graphics and material, referred to as "Content") is owned or licensed by the creators of CNS-TAP and is protected by copyright, trademark, and common law rights. The Content cannot be used, copied, licensed or sub-licensed without the creators' express consent.

  <br><br>The "Content" of the CNS-TAP site is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the CNS-TAP site.

  <br><br>The creators of CNS-TAP make NO warranties or representations about the Content and accepts no liability or responsibility for any damage or loss arising in any way, directly or indirectly, from use of this site or use of or reliance on the Content, including as a result of the creators' negligence or default.

  <br><br>By accessing this site you hereby agree to indemnify and forever hold harmless the creators from all or any loss, costs, claims, liability or responsibility which may arise in any way by you or any third party as a result of your use of the CNS-TAP site or Content.

                          </div>
                          </v-card-text>
                          </v-card>
                          </template>
        </v-col>
  </v-row>

  <v-row class="text-center">


      <v-col cols="4" class="font-weight-bold grey--text text--darken-2 text-right">
            <template>
                  <div class="text-right">
                        <v-btn
                          icon
                          @click="showUserManual()">
                                <v-icon large color="grey darken-2">mdi-book-open-variant</v-icon>
                        </v-btn>
                  </div>
                  <div>User Manual</div>
            </template>

      </v-col>


      <v-col class="mb-4" cols="4">
       <v-btn @click="begin_click" large class="darken-4 grey white--text">
        <h1 class="display-1 text-capitalize">Begin</h1>
       <v-icon large right>mdi-login</v-icon>
       </v-btn>
      </v-col>

      <v-col cols="4" class="font-weight-bold grey--text text--darken-2 text-left">
            <template>
                  <div class="text-left">
                        <v-btn
                          icon
                          @click="showUserVideo()">
                                <v-icon large color="grey darken-2">mdi-video</v-icon>
                        </v-btn>
                  </div>
                  <div>Instructional Video</div>
            </template>

      </v-col>



   </v-row>

   <Footer></Footer>

  </v-container>
</template>

<script>


import Footer from '../components/Footer.vue'

  export default {
    name: 'home',

    components: {
      Footer
    },

    data: () => ({
      DRUGSLIST: [],
      DRUGWEIGHTS: "",
      scrollInvoked: 0,

    pgTitle: 'CNS-TAP',
    pgSubTitle: 'Central Nervous System Targeted Agent Prediction Tool',

    }),

    created:function(){
      if (window.location.protocol === 'http:' && !window.location.href.includes("localhost")) {
      window.location.href = window.location.href.replace("http","https");

    }
    },

    methods:{
      begin_click:function(){
        this.$router.push({name:"userview",params:{drugslist:this.drugslist, drugweights:this.drugweights}})
      },

      showUserManual:function(){
        var pdf = './CNSTAP_User_Manual.pdf';
        window.open(pdf);
      },

      showUserVideo:function(){
        var mp4 = 'https://www.youtube.com/watch?v=558jVNYlTSk';
        window.open(mp4);
      },

      onScroll () {
          this.scrollInvoked++
      }
  }
}


</script>

<style>

.bluebg {
      background-color: #E4ECFF;
},

.disbg {
      background-color: #B0BEC5;
      color: #E4ECFF;
    }

</style>
