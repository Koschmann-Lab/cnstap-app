<template>
  <v-container>



    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-3 font-weight-bold mb-3 grey--text text--darken-2">
          {{ pgTitle }}
        </h1>

        <p class="headline font-weight-regular grey--text text--darken-2">
          {{ pgSubTitle }}
        </p>
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
                        CNS - Tap is an <a href="http://www.clinicaltrials.gov" target="_blank">application</a> used for providing guidance while prescribing drugs to patient specific conditions. The audience for this application are the doctors ..... Unless otherwise indicated, the content of this CNS-TAP site (including all images, information, graphics and material, referred to as "Content") is owned or licensed by the creators of CNS-TAP and is protected by copyright, trademark, and common law rights. The Content cannot be used, copied, licensed or sub-licensed without the creators express consent.


                      </div>
                    </v-card-text>
                  </v-card>
                </template>
              </p>

                <template>
                          <v-card
                          v-scroll.self="onScroll"
                          class="overflow-y-auto blue-grey lighten-3"
                          max-height="180"
                          >


                          <v-card-text>
                          <div class="mb-4">
                            <b><u>DISCLAIMER:</u></b>&nbsp;By using the CNS-TAP site, you signify your assent to the following terms and conditions. These terms and conditions may be amended or updated at any time by the creators and it is the prevailing terms and conditions from time to time that are agreed to apply.

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
      <v-col class="mb-4">
       <v-btn @click="begin_click" large class="darken-4 grey white--text">
        <h1 class="display-1 text-capitalize">Begin</h1>
       <v-icon large right>mdi-login</v-icon>
       </v-btn>
      </v-col>
   </v-row>

   <template>
     <v-footer padless>
       <v-col
         class="text-center bluebg"
         cols="12"
       >
            <table align="center" width="100%">
            <tr>
            <td align="left">
              <img src="../assets/Signature-Marketing.png" style="width:400px;">
            </td>
            <td align="right">
              <img src="../assets/Rogel-Vertical.png" style="height:80px;">
            </td>
            </tr>
            </table>

       </v-col>
     </v-footer>
   </template>

  </v-container>
</template>

<script>
  export default {
    name: 'home',

    data: () => ({

      scrollInvoked: 0,

    pgTitle: 'CNS-TAP',
    pgSubTitle: 'Central Nervous System Targeted Agent Prediction Tool',
    Disclaimer: 'By using the CNS-TAP site, you signify your assent to the following terms and conditions. These terms and conditions may be amended or updated at any time by the creators and it is the prevailing terms and conditions from time to time that are agreed to apply. Unless otherwise indicated, the content of this CNS-TAP site (including all images, information, graphics and material, referred to as Content) is owned or licensed by the creators of CNS-TAP and is protected by copyright, trademark, and common law rights. The Content cannot be used, copied, licensed or sub-licensed without the creators express consent. The Content of the CNS-TAP site is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the CNS-TAP site. The creators of CNS-TAP make NO warranties or representations about the Content and accepts no liability or responsibility for any damage or loss arising in any way, directly or indirectly, from use of this site or use of or reliance on the Content, including as a result of the creators negligence or default. By accessing this site you hereby agree to indemnify and forever hold harmless the creators from all or any loss, costs, claims, liability or responsibility which may arise in any way by you or any third party as a result of your use of the CNS-TAP site or Content.',

    }),
    methods:{
    begin_click:function(){this.$router.push("/UserView")}
  },

    onScroll () {
        this.scrollInvoked++
      },
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
