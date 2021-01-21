
<!--
    1. Logo insertion on front slide, and table formatting on third slide
    1a. Fix bug where the graph does not load in ppt for the first time
    2. DONE - Date and timestamp on notes page or front slide whichever is easier
    3. DONE - The custom notes that are inputted by the user should show up in the
    ppt slide 2
    4. DONE - New disclaimer added to Footer
-->
<template>
  <v-container>

    <v-row class="justify-center align-center">
       <v-col cols="3">
         <!--  CNSTAP Logo - Start -->
           <h3 class="display-3 font-weight-bold grey--text text--darken-2">
            CNS-TAP
          </h3>
          <!--  CNSTAP Logo - End -->
       </v-col>
       <v-col cols="9" class="font-weight-bold grey--text text--darken-2 text-right">
         <!-- Intro button on the right corner - Start -->
             <template>
                   <div class="text-right">
                         <v-btn
                           icon
                           @click="startIntro()">
                                 <v-icon large color="grey darken-2">mdi-comment-question</v-icon>
                         </v-btn>
                   </div>
             </template>
         <!-- Intro button on the right corner - End -->
       </v-col>
    </v-row>

<!-- Switches for Notes, Graph and PPT print - Start -->
<v-row class="justify-center align-center">
   <v-col cols="2">

   </v-col>
   <v-col cols="10" class="font-weight-bold grey--text text--darken-2 text-right">
     <div class="d-print-none">
        <v-simple-table>
            <tbody>
                <tr>
                  <!-- Switches for Notes - Start -->
                    <td width="300px" class="lightblueleft">
                          <div v-intro="'Switch to enter custom notes, which will be retained in the generated report.'" v-intro-step="2">
                                <v-switch v-model="switchNotes" @change="getdatetime()" inset :label="`Note Space`"></v-switch>
                          </div>
                    </td>
                    <!-- Switches for Notes - End -->
                    <!-- Switches for Graph - Start -->
                    <td width="300px" class="lightblueleft">
                          <div v-intro="'Switch to view graphs that show CNS-Tap baseline and patient specific scores for drugs in selected pathways. Please select at least one pathway to enable this feature.'" v-intro-step="3">
                                <!-- <v-switch :disabled="this.pathwayselection.length === 0" v-model="switchPPTprint" inset :label="`Pathway Graphs`"></v-switch> -->
                                <v-switch v-model="switchPPTprint" inset :label="`Pathway Graphs`"></v-switch>
                          </div>
                    </td>
                    <!-- Switches for Graph - End -->
                    <!-- Print buttons for PPT - Start -->
                    <td class="lightblueleft">
                             <div v-intro="'Click here to generate CNS-TAP report with Data table, Notes, and Graphs.'" v-intro-step="7">
                               <span style="font-size:15px;font-weight:bold">
                                 <v-chip @click="printPPT" :class="'def black--text my-2 caption'">PPT</v-chip>
                               &nbsp; &nbsp;
                              Generate Report
                               </span>
                            </div>
                    </td>
                    <!-- Print buttons for PPT - End -->
                </tr>
            </tbody>
        </v-simple-table>
      </div>
   </v-col>
</v-row>
<!-- Switches for Notes, Graph and PPT print - End -->

<!-- Buttons for Scoring info, Patient Data, Patient type - Start -->
<div class="d-print-none" >
  <v-row>
    <v-col cols="2" >
    </v-col>
    <v-col cols="10" class="font-weight-bold grey--text text--darken-2 text-right" style="border-top:2px solid #111;">
      <div class="d-print-none" >
         <v-simple-table>
             <tbody>
                 <tr >
                   <!-- Button for Scoring info - Start  -->
                     <td width="300px" class="lightblueleft">
                          <template>
                              <div class="text-left" v-intro="'Click here to view how each category is scored and weighted in the algorithm.'" v-intro-step="6">
                                <v-dialog
                                  v-model="dialog"
                                  width="900"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      icon
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                    <v-icon large color="grey darken-2">mdi-information</v-icon>
                                    </v-btn>
                                    <span style="font-size:15px;font-weight:bold">Scoring Criteria</span>

                                  </template>

                                  <v-card outlined>
                                    <v-card-title class="headline grey lighten-2">
                                      Description of Algorithm
                                    </v-card-title>
                                    <v-card-text>
                                      A summary of the distribution of points and the weights that are affixed to individual categories of the CNS TAP tool.
                                    </v-card-text>
                                    <v-card-text>
                                          <AlgorithmTable></AlgorithmTable>
                                    </v-card-text>
                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                      >
                                        CLOSE
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>

                          </template>
                     </td>
                     <!-- Button for Scoring info - End  -->
                     <!-- Switch for Patient Data - Start  -->
                     <td width="300px" class="lightblueleft">
                           <div v-intro="'Switch to input patient specific sequencing data to generate patient specific scores.'" v-intro-step="4">
                                 <v-switch v-model="switchPatientdata" inset :label="`Patient Data Columns`"></v-switch>
                           </div>
                     </td>
                     <!-- Switch for Patient Data - End -->
                     <!-- Switch for Patient type - Start -->
                     <td class="lightblueleft">
                         <div v-intro="'Switch to select the patient age group.'" v-intro-step="8">
                                 <span style="font-size:15px;font-weight:bold">
                                       <v-chip-group
                                         v-model="switchPatienttype"
                                         active-class="white black--text"
                                         mandatory
                                       >
                                           <v-chip :class="'def black--text my-2 caption'" filter>Pediatric</v-chip>
                                          &nbsp;
                                           <v-chip :class="'def black--text my-2 caption'" filter>Adult</v-chip>
                                          &nbsp;
                                          Patient
                                       </v-chip-group>
                                 </span>
                          </div>
                     </td>
                     <!-- Switch for Patient type - End -->
                 </tr>
             </tbody>
         </v-simple-table>
       </div>
    </v-col>
  </v-row>
</div>
<!-- Buttons for Scoring info, Patient Data, Patient type - End -->

<!-- Notes area - Start -->
<div>
  <v-row>
    <v-col cols="2" >
    </v-col>
    <v-col cols="10" >
       <div v-if="switchNotes" id="divNotes">
          <v-textarea
            solo
            name="notes"
            v-model="customNotes"
          ></v-textarea>
       </div>
    </v-col>
  </v-row>
</div>
<!-- Notes area - End -->


   <v-row>
     <!-- Pathways multi selection - Start -->
      <v-col cols="2" >
        <div class="d-print-none" v-intro="'Select your relevant Pathways. If no Pathway is selected, data for all the Pathways will be displayed in the Data table.'" v-intro-step="1">
          <v-card
             class="pa-1 bluebg"
             tile
             flat
          >
            Select your pathways
          </v-card>
          <v-row>
                <v-col>
                  <v-sheet elevation="0" class="pa-4 bluebg">
                    <v-chip-group
                      v-model="pathwayselection"
                      column
                      active-class="white black--text"
                      multiple
                      outlined
                    >
                      <v-chip :class="'def black--text my-2 caption'"  v-for="pathway in pathways" :key="pathway.id"
                        filter
                        >
                        {{pathway.pathway}}
                      </v-chip>
                    </v-chip-group>
                  </v-sheet>
                </v-col>
          </v-row>
        </div>
      </v-col>
      <!-- Pathways multi selection - End -->

      <v-col cols="10" >
<!-- Warning message if PathwayGraph switch is selected without select at least one pathway - Start -->
    <div id="pathwayGraphMsg" v-if="switchPPTprint">
      <div v-if="GraphDatasetAll.length==0">
          <v-alert type="error">
            Please select at least one Pathway from the 'Pathway selection' to display Graphs.
          </v-alert>
      </div>
      <div v-else>
        <v-alert type="info">
          Pathway Graph is displayed below the Drug Agent table.
        </v-alert>
      </div>
    </div>
<!-- Warning message if PathwayGraph switch is selected without select at least one pathway - End -->


<!-- ***************************** -->
<!-- Main Drug Table - Start       -->
<!-- ***************************** -->
  <div v-intro="'This is the data table that displays all the scored attributes for the included drug agents. '" v-intro-step="5">
  <v-data-table
      :headers="computedHeaders"
      :items="filteredItems"
      class="elevation-0 bluebg customtable"
      hide-default-footer
      disable-pagination
      dense
      id="drugTable"
      group-by="pathways"
      :loading=loading
    >
<!-- Main Drug Table - Print headers - Start -->
    <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }" ref = "h.value" >
            <template v-if="header.tt === ''" >
                    <span :key="h.text" >{{header.text}}</span>
            </template>
            <template v-else-if="header.text === 'iTRL'">
                        <v-tooltip top close-delay=2000 :key="h.text" color="amber lighten-4 black--text">
                          <template v-slot:activator="{ on }" >
                                <span v-on="on">{{h.text}}</span>
                          </template>
<span>Relevant Clinical Trial. Go to <a href="http://www.clinicaltrials.gov" target="_blank">www.clinicaltrials.gov</a> to identify applicable trials.</span>
</v-tooltip>
            </template>

            <template v-else-if="header.text === 'iTIER'">
                        <v-tooltip top close-delay=2000 :key="h.text" color="amber lighten-4 black--text">
                          <template v-slot:activator="{ on }" >
                                <span v-on="on">{{h.text}}</span>
                          </template>
<span>Evidence-based variant <a href="https://www.sciencedirect.com/science/article/pii/S1525157816302239?via%3Dihub#fig2" target="_blank">categorization.</a></span>
</v-tooltip>
            </template>

            <template v-else-if="header.text === 'TRL'">
                        <v-tooltip top close-delay=2000 :key="h.text" color="amber lighten-4 black--text">
                          <template v-slot:activator="{ on }" >
                                <span v-on="on">{{h.text}}</span>
                          </template>
                          <span>Relevant Clinical Trial. Go to <a href="http://www.clinicaltrials.gov">www.clinicaltrials.gov</a> to identify applicable trials.</span>
                        </v-tooltip>
            </template>

            <template v-else>
                            <v-tooltip top :key="h.text" color="amber lighten-4 black--text">
                              <template v-slot:activator="{ on }" >
                                <span v-on="on">{{h.text}}</span>
                              </template>
                              <span>
                                {{ header.tt }}
                              </span>
                            </v-tooltip>
            </template>
    </template>
<!-- Main Drug Table - Print headers - End -->


    <template v-slot:body.prepend="{headers}" v-if="switchPatientdata">
        <tr class='inputinforow'>
          <td v-for="(header,i) in headers" :key="i">
                <div class="darkcenter" v-if="header.value == 'icln'">INPUT</div>
                <div class="darkcenter" v-else-if="header.value == 'itier'">PATIENT</div>
                <div class="darkcenter" v-else-if="header.value == 'itrl'">DATA</div>
                <div v-else class="lightbluecenter"></div>
            </td></tr>
    </template>



<!-- Main Drug Table - Configure Vitro column - Start -->
        <template v-slot:item.vitro="{ item }">
              <v-tooltip top color="amber lighten-4" >
                    <template v-slot:activator="{ on }">
                            <div v-on="on">{{ item.vitro }}</div>
                     </template>
                     <div class="tooltip">
                            <span >{{  ttVitrorow }}</span>
                   </div>
               </v-tooltip>
        </template>
<!-- Main Drug Table - Configure Vitro column - End -->

<!-- Main Drug Table - Configure Vivo column - Start -->
        <template v-slot:item.vivo="{ item }">
              <v-tooltip top color="amber lighten-4" >
                    <template v-slot:activator="{ on }">
                            <div v-on="on">{{ item.vivo }}</div>
                     </template>
                     <div class="tooltip">
                            <span >{{  ttVivorow }}</span>
                   </div>
               </v-tooltip>
        </template>
<!-- Main Drug Table - Configure Vivo column - End -->


<!-- Main Drug Table - Configure Safety column - Start -->
        <template v-slot:item.safety="{ item }">
              <v-tooltip top color="amber lighten-4" >
                    <template v-slot:activator="{ on }">
                            <div v-on="on">{{ item.safety }}</div>
                     </template>
                     <div class="tooltip">
                            <span >{{  ttSafetyrow }}</span>
                   </div>
               </v-tooltip>
        </template>
<!-- Main Drug Table - Configure Safety column - End -->


<!-- Main Drug Table - Configure CNS column - Start -->
    <template v-slot:item.cns="{ item }">
          <v-tooltip top color="amber lighten-4" >
                <template v-slot:activator="{ on }">
                        <div v-on="on">{{ item.cns }}</div>
                 </template>
                 <div class="tooltip">
                        <span >{{  ttCNSrow }}</span>
               </div>
           </v-tooltip>
    </template>
<!-- Main Drug Table - Configure CNS column - End -->

<!-- Main Drug Table - Configure BBB column - Start -->
        <template v-slot:item.bbb="{ item }">
          <v-tooltip top color="amber lighten-4" >
            <template v-slot:activator="{ on }">
              <div v-on="on">{{ item.bbb }}</div>
             </template>
             <div class="tooltip">
             <span >{{  ttBBBrow }}</span>
           </div>
           </v-tooltip>
        </template>
<!-- Main Drug Table - Configure BBB column - End -->

<!-- Main Drug Table - Configure FDA column - Start -->
        <template v-slot:item.fda="{ item }">
          <v-tooltip top color="amber lighten-4" >
            <template v-slot:activator="{ on }">
              <div v-on="on">{{ item.fda }}</div>
             </template>
             <div class="tooltip">
             <span >{{  ttFDArow }}</span>
           </div>
           </v-tooltip>
        </template>
<!-- Main Drug Table - Configure FDA column - End -->

<!-- Main Drug Table - Configure SubT column - Start -->

        <template v-slot:item.subt="props">

                  <template v-if="switchPatientdata">
                        <template v-if="!switchPatienttype">
                              <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.subt }}</p></div>
                        </template>
                        <template v-else>
                              <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ Number(props.item.subt) - Number(props.item.safety) }}</p></div>
                        </template>
                  </template>
                  <template v-else>
                        <template v-if="!switchPatienttype">
                              <div><p>{{ props.item.subt }}</p></div>
                        </template>
                        <template v-else>
                              <div><p>{{ Number(props.item.subt) - Number(props.item.safety) }}</p></div>
                        </template>
                  </template>
      </template>
<!-- Main Drug Table - Configure SubT column - End -->

<!-- Main Drug Table - Configure Total column - Start -->
      <template v-slot:item.total="props">

        <template v-if="switchPatientdata" >
              <template v-if="!switchPatienttype">
                    <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.total }}</p></div>
              </template>
              <template v-else>
                    <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ Number(props.item.total) - Number(props.item.safety) }}</p></div>
              </template>
        </template>
        <template v-else>
              <template v-if="!switchPatienttype">
                    <div><p>{{ props.item.total }}</p></div>
              </template>
              <template v-else>
                    <div><p>{{ Number(props.item.total) - Number(props.item.safety) }}</p></div>
              </template>
        </template>

    </template>
<!-- Main Drug Table - Configure Total column - End -->

<!-- Main Drug Table - Configure iCLN column - Start -->

      <template v-slot:item.icln="props">
        <template v-if="props.item.editable === 0">
          <v-tooltip top color="amber lighten-4" >
          <template v-slot:activator="{ on }">
                <div v-on="on" class="grey darken-1 white--text"><p>{{ props.item.icln }}</p></div>
          </template>
          <div class="tooltip">
             <span>{{ ttCLNrow }}</span>
          </div>
          </v-tooltip>
        </template>
          <template v-if="props.item.editable === 1">
              <div class="white grey--text-darken-4 text--center"><p>
                   <v-select
                     v-model="props.item.icln"
                     dense
                     class="vsel"
                     :items="iCLNitems"
                     item-value='id'
                     item-text='name'
                     @change="updateICLN($event,props.item.pathways)"
                   ></v-select>
                   </p>
               </div>
          </template>
          <template v-if="props.item.editable === 2">
                  <div class="grey darken-3 white--text"><p>{{ props.item.icln }}</p>
                  </div>
          </template>
      </template>
<!-- Main Drug Table - Configure iCLN column - End -->

<!-- Main Drug Table - Configure iTIER column - Start -->
      <template v-slot:item.itier="props">
        <template v-if="props.item.editable === 0">
          <v-tooltip top color="amber lighten-4" >
          <template v-slot:activator="{ on }">
                <div v-on="on" class="grey darken-1 white--text"><p>{{ props.item.itier }}</p></div>
          </template>
          <div class="tooltip">
             <span>{{ ttTIERrow }}</span>
          </div>
          </v-tooltip>
        </template>
          <template v-if="props.item.editable === 1">
              <div class="white grey--text-darken-4 text--center"><p>
                   <v-select
                     v-model="props.item.itier"
                     dense
                     class="vsel"
                     :items="iTIERitems"
                     item-value='id'
                     item-text='name'
                     @change="updateITIER($event,props.item.pathways)"
                   ></v-select>
                 </p>
               </div>
          </template>
          <template v-if="props.item.editable === 2">
                  <div class="grey darken-3 white--text"><p>{{ props.item.itrl }}</p>
                  </div>
          </template>
      </template>
<!-- Main Drug Table - Configure iTIER column - End -->

<!-- Main Drug Table - Configure iTRL column - Start -->
          <template v-slot:item.itrl="props">
              <template v-if="props.item.editable != 2">
                  <div class="white grey--text-darken-4 text--center"><p>
                       <v-select
                        v-model="props.item.itrl"
                         dense
                         class="vsel"
                         :items="iTRLitems"
                         item-value='id'
                         item-text='name'
                         @change="updateITRL($event,props.item.pathways,props.item.drugagents)"
                       ></v-select>
                       </p>
                   </div>
              </template>
              <template v-if="props.item.editable === 2">
                      <div class="grey darken-3 white--text"><p>{{ props.item.itrl }}</p>
                      </div>
              </template>
          </template>
<!-- Main Drug Table - Configure iTRL column - End -->

<!-- Main Drug Table - Configure CLN column - Start -->
            <template v-slot:item.cln="{ item }">
              <v-tooltip top color="amber lighten-4" >
                <template v-slot:activator="{ on }">
                  <div v-on="on">{{ item.cln }}</div>
                 </template>
                 <div class="tooltip">
                 <span >{{  ttCLNrow }}</span>
               </div>
               </v-tooltip>
            </template>
<!-- Main Drug Table - Configure CLN column - End -->

<!-- Main Drug Table - Configure TIER column - Start -->
            <template v-slot:item.tier="{ item }">
              <v-tooltip top color="amber lighten-4" >
                <template v-slot:activator="{ on }">
                  <div v-on="on">{{ item.tier }}</div>
                 </template>
                 <div class="tooltip">
                 <span >{{  ttTIERrow }}</span>
               </div>
               </v-tooltip>
            </template>
<!-- Main Drug Table - Configure TIER column - End -->

<!-- Main Drug Table - Configure TRL column - Start -->
            <template v-slot:item.trl="{ item }">
              <v-tooltip top color="amber lighten-4" >
                <template v-slot:activator="{ on }">
                  <div v-on="on">{{ item.trl }}</div>
                 </template>
                 <div class="tooltip">
                 <span >{{  ttTRLrow }}</span>
               </div>
               </v-tooltip>
            </template>
<!-- Main Drug Table - Configure TRL column - End -->

        </v-data-table>
      </div>
<!-- Main Drug Table - End -->

<!-- ***************************** -->
<!-- Main Drug Table - End -->
<!-- ***************************** -->

<!-- ***************************** -->
<!-- Pathway Graph display - Start -->
<!-- ***************************** -->
<br><br>
    <div id="pathwayGraph" v-if="switchPPTprint">
      <!-- LineCharts Start -->
      <div>
           <v-row class="lightblueleft">
              <v-col cols=6>
                Pathway Graph
              </v-col>
                <v-col cols=3 class="lightblueright"><div style="display:inline-block;"><div style="width:30px;height:10px;border:1px;solid #000;background:black;display:inline-block;"></div>&nbsp;Baseline</div></v-col>
                <v-col cols=3 class="lightblueleft"><div style="display:inline-block;"><div style="width:30px;height:10px;border:1px solid #000;background:white;display:inline-block;"></div>&nbsp;Patient Specific</div></v-col>
            </v-row>
            <v-row>
              <v-col
                id="largeGraph"
                cols="12"
              >
                <!-- introduced a DIV tag to connect the GraphDatasetAll list to the Graph for automatic rendering of the Graph -->
                <div>
                  <!-- Display Graph object -->
                  <LineGraphContainerLarge :rawpathway=GraphDatasetAll[0].pathway :rawdata=GraphDatasetAll[0].drugagents :rawbaseline=GraphDatasetAll[0].baseline :rawptspecific=GraphDatasetAll[0].ptspecific :rawradius=GraphDatasetAll[0].radius >
                  </LineGraphContainerLarge>
               </div>
              </v-col>
            </v-row>
      </div>
      <!-- LineCharts End -->

       </div>
<!-- ***************************** -->
<!-- Pathway Graph display - End -->
<!-- ***************************** -->
    </v-col>
</v-row>

<!-- Page Footer - Start -->
     <Footer></Footer>
<!-- Page Footer - End -->

<template>
  <v-simple-table id="pptTable" style="display:none">
    <template v-slot:default>

      <tbody>
      </tbody>
    </template>
  </v-simple-table>
</template>





</v-container>
</template>

<script>

// View to build the Graph
import LineGraphContainerLarge from '../components/LineGraphContainerLarge.vue'
// View that contains the content for the Scoring info button
import AlgorithmTable from '../components/Algorithm.vue'
// View that contains the content for Footer
import Footer from '../components/Footer.vue'
// Library for generating PPT print-out
import pptxgen from "pptxgenjs";
// Library for DOM to image
import domtoimage from 'dom-to-image';

import axios from "axios";

  export default {
    name: 'UserView',
    components: {
      LineGraphContainerLarge,
      AlgorithmTable,
      Footer
    },

        created:function(){
          var data = JSON.stringify({});
          var self = this
          axios.get('./json/config.json').then(res=>{
            self.activatorUrl=res.data.activator_url
            console.log("=== Activator URL :"+self.activatorUrl)
            var config = {
              method: 'post',
              url: self.activatorUrl + '/CNSTAPIDT/intrinsicDrugTable/2.0/intrinsicDrugTable',
              headers: {
                'Content-Type': 'application/json'
              },
              data : data
            };
          axios(config)
          .then(function (response) {
            // self.drugslist =  response.data.result
            self.drugs = JSON.parse(response.data.result)
        config.url = self.activatorUrl +'/CNSTAPTPC/tumorPatientCalculator/2.0/cnstap' ,
          axios(config)
            .then(function (response) {
              self.drugweights =  JSON.parse(response.data.result)
              self.loading=false
            })
            .catch(function (error) {
              console.log(error);
            });

          })
          .catch(function (error) {
            console.log(error);
          });
        })


        },
    mounted() {
      // Prompt for the Intro routine when the page is loaded
      this.startIntro();
      // Loading the drugs array from kgrid when page is loaded
      // this.drugs = JSON.parse(this.$route.params.drugslist)
      // // Loading the drug weightage from kgrd when page is loaded
      // this.drugweights = JSON.parse(this.$route.params.drugweights)
      console.log(this.drugs.length)  // You can use this.druglist to replace the hard-coded drugs array
      this.getdatetime();
    },

    data: () => (  {
      activatorUrl:"",
      loading: true,
      // Variable for Notes
      customNotes: "",
      // List that holds the selected Pathways
      pathwayselection: [],
      // List of drugs from Kgrid object
      drugslist : [],
      dialog: false,
      // main List with drugs for drug table
      drugs: [],
      // main object with drug weights
      drugweights: {},


      // Tooltip texts
      ttVitrorow: '(0, 1, or 2) x 2',
      ttVivorow: '(0, 1, or 2) x 3',
      ttSafetyrow: '(0, 1, or 2) x 3',
      ttCNSrow: '(-2, -1, 0, 1, or 2) x 5',
      ttBBBrow: '(0, 1, or 2) x 5',
      ttFDArow: '(0 or 1) x 10',
      ttCLNrow: '(0, 1, or 2) x 5',
      ttTIERrow: '(0, 1, or 2) x 3',
      ttTRLrow: '(0 or 1) x 20',

      switchNotes: false,
      switchPPTprint: false,
      switchPatientdata: false,
      switchPatienttype: true,



      // List of Columns for Patient type - Adult + No Patient data
      allColumns: ['Pathways','Drug Agents','Vitro','Vivo','CNS','BBB','FDA','Total'],
      // List of Columns for Patient type - Pediatric + No Patient data
      allColumnsPed: ['Pathways','Drug Agents','Vitro','Vivo','Safety','CNS','BBB','FDA','Total'],
      // List of Columns for Patient type - Adult + Patient data
      patientColumns: ['Pathways','Drug Agents','Vitro','Vivo','CNS','BBB','FDA','SubT','iCLN','iTIER','iTRL','CLN','TIER','TRL','Total'],
      // List of Columns for Patient type - Pediatric + Patient data
      patientColumnsPed: ['Pathways','Drug Agents','Vitro','Vivo','Safety','CNS','BBB','FDA','SubT','iCLN','iTIER','iTRL','CLN','TIER','TRL','Total'],

      // List of Pathways for the Pathway selection part of the screen
      pathways: [
      { id:1, pathway: "AKT", checked: false },
      { id:2, pathway: "ALK", checked: false },
      { id:3, pathway: "BRAF", checked: false },
      { id:4, pathway: "CDK", checked: false },
      { id:5, pathway: "CNS Generic", checked: false },
      { id:6, pathway: "EGFR", checked: false },
      { id:7, pathway: "FGFR", checked: false },
      { id:8, pathway: "EGFR/HER2/HER4/cMET", checked: false },
      { id:9, pathway: "HDAC", checked: false },
      { id:10, pathway: "INI1", checked: false },
      { id:11, pathway: "MEK", checked: false },
      { id:12, pathway: "PDGFR", checked: false },
      { id:13, pathway: "PI3K/mTOR", checked: false },
      { id:14, pathway: "MET", checked: false },
      { id:15, pathway: "MET/VEGF2", checked: false },
      { id:16, pathway: "Chk1", checked: false },
      { id:17, pathway: "GENERIC CYTOTOXIC", checked: false },
      { id:18, pathway: "RET", checked: false } ],

// List with headers for the drugs table
    headers: [
      {   text: 'Pathways', align: 'center', sortable: true, value: 'pathways', class: 'grey darken-3 white--text', tt: '' },
      {   width: '150px', text: 'Drug Agents', align: 'center', sortable: true, value: 'drugagents', class: 'grey darken-3 white--text', tt: '', groupable: false },
      {   text: 'Vitro', align: 'center', sortable: true, value: 'vitro', class: 'grey darken-3 white--text', tt: 'In vitro Pre-Clinical Data (0 to 4 points)', groupable: false   },
      {   text: 'Vivo', align: 'center', sortable: true, value: 'vivo', class: 'grey darken-3 white--text', tt: 'In vivo Pre-Clinical Data (0 to 6 points)', groupable: false  },
      {   text: 'Safety', align: 'center', sortable: true, value: 'safety', class: 'grey darken-3 white--text', tt: 'Phase 1 Safety Data (0 to 6 points)', groupable: false  },
      {   text: 'CNS', align: 'center', sortable: true, value: 'cns', class: 'grey darken-3 white--text', tt: 'CNS Data with Response (-10 to 10 points)', groupable: false  },
      {   text: 'BBB', align: 'center', sortable: true, value: 'bbb', class: 'grey darken-3 white--text', tt: 'Brain penetration (0 to 10 points)', groupable: false  },
      {   text: 'FDA', align: 'center', sortable: true, value: 'fda', class: 'grey darken-3 white--text', tt: 'FDA approval (0 to 10 points)', groupable: false  },
      {   text: 'SubT', align: 'center', sortable: true, value: 'subt', class: 'grey darken-1 white--text', tt: '', groupable: false  },
      {   text: 'iCLN', align: 'center', sortable: true, value: 'icln', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'Clonality/variant allele fraction - % of tumor with relevant pathway (0 to 5 points)', groupable: false  },
      {   text: 'iTIER', align: 'center', sortable: true, value: 'itier', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'Variant tier score (0 to 6 points)', groupable: false  },
      {   text: 'iTRL', align: 'center', sortable: false, value: 'itrl', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'Relevant Clinical Trial (0 to 20)', groupable: false  },
      {   text: 'CLN', align: 'center', sortable: true, value: 'cln', class: 'grey darken-3 white--text', tt: 'Clonality/variant allele fraction - % of tumor with relevant pathway', groupable: false  },
      {   text: 'TIER', align: 'center', sortable: true, value: 'tier', class: 'grey darken-3 white--text', tt: 'Variant tier score', groupable: false  },
      {   text: 'TRL', align: 'center', sortable: true, value: 'trl', class: 'grey darken-3 white--text', tt: 'Relevant Clinical Trial', groupable: false  },
      {   text: 'Total', align: 'center', sortable: true, value: 'total', class: 'grey darken-1 white--text', tt: '', groupable: false  }, ],

    // List for dropdown box in iCLN column
    iCLNitems: [{id: 0, name: '0 - no data or less dominant'},{id: 1, name: '1 - dominant'},{id: 2, name: '2 - fusion'}],
    // List for dropdown box in iTIER column
    iTIERitems: [{id: 0, name: '0 - Tier IV'},{id: 1, name: '1 - Tier III'},{id: 2, name: '2 - Tier I or Tier II'}],
    // List for dropdown box in iTRL column
    iTRLitems: [{id: 0, name: '0 - none'},{id: 1, name: '1 - yes'}],

    // List for storing Graph data
    GraphDatasetAll: [{ pathway:[], drugagents:[], baseline: [], ptspecific: [], radius: ""},],


  }),

    computed: {

        getElemId(s1,s2) {
          return s1 + s2;
        },

// method for loading the drugs in the drug table
      filteredItems() {
        var p;
        this.filterGraphData();
        return this.drugs.filter((i) => {
        // load all rows, if no Pathway is selected
        if (!this.pathwayselection || this.pathwayselection.length == 0) {
            // Ignore the first dummy row for adding data to graph, if switchPatientdata is not selected
            if ((i.editable!= 2) || (this.switchPatientdata)){
                this.GraphDatasetAll.splice(0);
                return true;
            }
        } else {
        // load only rows for the Pathways selected
            for (p = 0; p < this.pathwayselection.length; p++) {
                // if pathway is the drug table matches the pathway selected
                if (i.pathways.trim() === "" || this.pathways[this.pathwayselection[p]].pathway.trim() == i.pathways.trim()) {
                  // Do not show the first dummy row, if switchPatientdata is not selected
                  if ((i.editable!= 2) || (this.switchPatientdata)){
                      return true;
                  }
                }
              }
          }
        })
      },

      computedHeaders () {
          if (this.switchPatientdata) {
              if(!this.switchPatienttype) {
                  return this.headers.filter(header => this.patientColumnsPed.includes(header.text));
              }else {
                  return this.headers.filter(header => this.patientColumns.includes(header.text));
              }
          } else {
              if(!this.switchPatienttype) {
                  return this.headers.filter(header => this.allColumnsPed.includes(header.text));
              }else {
                  return this.headers.filter(header => this.allColumns.includes(header.text));
              }
          }
      },

      clnleft () {
        return this.$refs.cln.getBoundingClientRect().left
      }

    },

    methods:{
         switchNotes_click:function(){this.$router.push("/UserView")  },
         switchPPTprint_click:function(){this.$router.push("/UserView")  },
         switchPatientdata_click:function(){this.$router.push("/UserView")  },

         max25chars: v => v.length <= 25 || 'Input too long!',

         // Initiate the Prompt for the Intro routine
         startIntro() {
          if(confirm("Do you want an introduction to the CNS-Tap website?")){
            const introJS = require("intro.js");
            introJS.introJs().start();
            this.$vuetify.goTo(0);
           }
         },

         // set DateTime for Notes while initializing
         getdatetime(){
           var dt = new Date().toLocaleString();
           var dateTime = dt+'\n';
           this.customNotes=dateTime;
         },

         // Load the lists for GraphData when the main Drugs table is refreshed
         filterGraphData() {
                      this.GraphDatasetAll.splice(0);

                      var tDrugagentsLarge = [];
                      var tBaselineLarge = [];
                      var tPtspecificLarge = [];
                      var tPathwayLarge = [];
                      var tRadius = 10;

                      tDrugagentsLarge.splice(0);
                      tBaselineLarge.splice(0);
                      tPtspecificLarge.splice(0);
                      tPathwayLarge.splice(0);

                      tDrugagentsLarge.push(null);
                      tBaselineLarge.push(null);
                      tPtspecificLarge.push(null);
                      tPathwayLarge.push(null);

                      for (var p = 0; p < this.pathwayselection.length; p++){
                            var tDrugagents = [{ agent: "", values:{baseline:0, ptspecific:0}},];
                            tDrugagents.splice(0);
                            for (var d = 0; d < this.drugs.length; d++){
                              if(this.pathways[this.pathwayselection[p]].pathway.trim() == this.drugs[d].pathways.trim()){
                                  if (!this.switchPatienttype) {
                                      tDrugagents.push({agent:this.drugs[d].drugagents, values:{baseline:this.drugs[d].subt, ptspecific:this.drugs[d].total}});
                                      tDrugagentsLarge.push(this.drugs[d].drugagents + ';' + this.drugs[d].pathways.trim());
                                      tBaselineLarge.push(this.drugs[d].subt);
                                      tPtspecificLarge.push(this.drugs[d].total);
                                      tPathwayLarge.push(this.drugs[d].pathways.trim());
                                  } else {
                                      tDrugagents.push({agent:this.drugs[d].drugagents, values:{baseline:(Number(this.drugs[d].subt) - Number(this.drugs[d].safety)) , ptspecific:(Number(this.drugs[d].total) - Number(this.drugs[d].safety))}});
                                      tDrugagentsLarge.push(this.drugs[d].drugagents + ';' + this.drugs[d].pathways.trim());
                                      tBaselineLarge.push((Number(this.drugs[d].subt) - Number(this.drugs[d].safety)));
                                      tPtspecificLarge.push((Number(this.drugs[d].total) - Number(this.drugs[d].safety)));
                                      tPathwayLarge.push(this.drugs[d].pathways.trim());
                                }
                              }
                            }
                        }
                        tDrugagentsLarge.push(null);
                        tBaselineLarge.push(null);
                        tPtspecificLarge.push(null);
                        tPathwayLarge.push(null);

                        if (this.pathwayselection.length > 5 && this.pathwayselection.length < 7) {
                          tRadius = 9;
                        } else if (this.pathwayselection.length > 6 && this.pathwayselection.length < 9) {
                          tRadius = 8;
                        } else if (this.pathwayselection.length > 8 && this.pathwayselection.length < 10) {
                          tRadius = 7;
                        } else if (this.pathwayselection.length > 9 && this.pathwayselection.length < 12) {
                          tRadius = 6;
                        } else if (this.pathwayselection.length > 11) {
                          tRadius = 5;
                        } else {
                          tRadius = 10;
                        }
                        this.GraphDatasetAll.push({pathway:tPathwayLarge, drugagents:tDrugagentsLarge, baseline:tBaselineLarge, ptspecific:tPtspecificLarge, radius:tRadius});
              },


              FILLpptTable() {
              var table = document.getElementById("pptTable");
              table.innerHTML = "";

              var tableHead = document.createElement('THEAD');
              table.appendChild(tableHead);
             // var trh = document.createElement('TR');
             // tableHead.appendChild(trh);
             // var thh = document.createElement('TH');
             // thh.colspan="12";
             // thh.width="100%";
             // thh.style.textAlign='center';
             // thh.appendChild(document.createTextNode("DRUGS TABLE"));
             // trh.appendChild(thh);

             var trh2 = document.createElement('TR');
             // head - "Blue ribbon" or "#306EFF"
             trh2.className = "blue ribbon";
             tableHead.appendChild(trh2);
             var thh2 = document.createElement('TH');
             thh2.width="120";
             thh2.style.textAlign='left';
             thh2.appendChild(document.createTextNode("Drug Names"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="120";
             thh2.style.textAlign='left';
             thh2.appendChild(document.createTextNode("Pathway"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Tumor line/preclinical data(In vitro)"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Tumor line/preclinical data(In vivo)"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Phase I safety data"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("CNS Data with response"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Brain penetration"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("FDA approval"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Clonality/variant allele fraction(%)"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Variant tier score"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Relevant clinical trial"));
             trh2.appendChild(thh2);
             thh2 = document.createElement('TH');
             thh2.width="50";
             thh2.style.textAlign='center';
             thh2.appendChild(document.createTextNode("Total Points"));
             trh2.appendChild(thh2);



                var tableBody = document.createElement('TBODY');
                table.appendChild(tableBody);

                    for (var p = 0; p < this.pathwayselection.length; p++){

                    for (var d = 0; d < this.drugs.length; d++){
                      if(this.pathways[this.pathwayselection[p]].pathway.trim() == this.drugs[d].pathways.trim()){
                            var tr = document.createElement('TR');
                            trh2.className = "sea blue";
                            // body - "Sea blue" or "#C2DFFF"
                            tableBody.appendChild(tr);
                                var td = document.createElement('TD');
                                td.width='120';
                                td.style.textAlign='left';
                                td.appendChild(document.createTextNode(this.drugs[d].drugagents));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='120';
                                td.style.textAlign='left';
                                td.appendChild(document.createTextNode(this.drugs[d].pathways));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].vitro));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].vivo));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].safety));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].cns));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].bbb));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].fda));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].cln));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].tier));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].trl));
                                tr.appendChild(td);
                                td = document.createElement('TD');
                                td.width='50';
                                td.style.textAlign='center';
                                td.appendChild(document.createTextNode(this.drugs[d].total));
                                tr.appendChild(td);
                        }
                    }

          }




              },



      // Asynchronour PPT print routine using pptxgen()
      async  printPPT () {

          if (!this.switchPPTprint) {
                alert("There are no Pathway Graphs to print. Please select at least one Pathway and toggle on the 'Pathways Graph' switch.");
                return;
           }

          // 1. Create a new Presentation
           let pres = new pptxgen();
           pres.author = 'Karthik Ravi';
           pres.company = 'Koschmann Labs';
           pres.revision = '1';
           pres.subject = 'CNS-Tap report';
           pres.title = 'CNS-Tap Drugtable and Graphs Presentation';
           pres.layout = 'LAYOUT_WIDE';

           // Adding slide for banner
           let slideBanner = pres.addSlide();

          //  let textboxOpts = { x: 1, y: 2, color: "363636", fill: "f1f1f1", align: pres.AlignH.center };
          //  let textboxOpts = { x:0.0, y:0.25, w:'100%', h:1.5, align:'center', fontSize:24, color:'0088CC', fill:{ color:'F1F1F1' } };

           let textboxOptsTool = { x:0, y:2, w:'100%', align:'center', fontSize:60, fontFace: "Arial", color:'000000' };
           slideBanner.addText("CNS TAP Tool", textboxOptsTool);
           let textboxOptsRep = { x:0, y:3, w:'100%', align:'center', fontSize:30, fontFace: "Arial", color:'000000' };
           slideBanner.addText("Report", textboxOptsRep);

          // let dUrl = "@/assets/Rogel-Vertical.png";
          // slideBanner.addImage({ path: "Rogel-Vertical.png" });
           // slideBanner.addimage({ path: "../assets/Rogel-Vertical.png" });
          // slideBanner.addImage({ path: "../assets/Rogel-Vertical.png", x:6.25, y:4 });

          let imgURL = "data:image/png;base64,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";

          await slideBanner.addImage({ x:5.75, y:4, w:2, path: imgURL  });

           let DisclaimerText = "Information obtained from the CNS TAP Tool is intended to systematically organize published research or ongoing clinical trials on brain tumor precision medicine therapies from clinicians and researchers. Drug selections and scores made by the CNS TAP Tool are not intended to guide clinical care outside of a research basis. Additional questions or information about this tool can be obtained by contacting Dr. Carl Koschmann. (ckoschmann@med.umich.edu).";
           slideBanner.addText(DisclaimerText, {
               x: 0.5,
               y: 6.0,
               w: "90%",
               align: "center",
               margin: 0.5,
               fontFace: "Arial",
               fontSize: 15,
               color: "000000",
               bold: false,
               underline: false,
               isTextBox: true,
           });


           // Adding slide for Notes
           let slideNotes = pres.addSlide();
        //   let textboxText1 = "Notes";

           await slideNotes.addImage({ x:11, y:0.5, w:2, path: imgURL  });

           let textboxOpts1 = { x: 1, y: 1, color: "363636", fontSize: 30, fontFace: "Arial", fill: "f1f1f1", align: pres.AlignH.center };
           slideNotes.addText("Notes", textboxOpts1);
           slideNotes.addText(this.customNotes,{ x: 1, y: 2, align: pres.AlignH.left, color: "363636", fontSize: 15, fontFace: "Arial" });

           // Adding slide for table
           this.FILLpptTable();
           pres.tableToSlides("pptTable",{
             y:0.5,
             master: "MASTER_SLIDE",
          //   fill:'F7F7F7',
          // fill: "sea blue",
          //   font_size:18,
          //   color:'6f9fc9',
             addHeaderToEach: "true",
             addText: { text: "\nDRUGS TABLE\n\n", options: { color: "363636", fontSize:25, fontFace: "Arial", align: pres.AlignH.center } },

           });


           // SLIDE: GRAPHS
           let slideGraph = pres.addSlide();
           let node = document.getElementById("largeGraph");
           //   Adding graph as image in a slide
           let dataUrl = await domtoimage.toPng(node,
            {
              quality: 0.95,
              width: 990,
              height: 750,
            }
         );

           let textboxGra = { x: 1, y: 0.5, color: "363636", fontSize: 30, fontFace: "Arial", fill: "f1f1f1", align: pres.AlignH.center };
           slideGraph.addText("Graph", textboxGra);
           await slideGraph.addImage({ x:11, y:0.5, w:2, path: imgURL  });
           await slideGraph.addImage({path: dataUrl, x:1, y:1, w: '60%', h: '72%'});

           await pres.writeFile("CNSTAP.pptx");
        },

        // update iCLN value in all rows for the Pathway being edited
        updateICLN: function(value,pPathway){
            for (var d = 0; d < this.drugs.length; d++){
                if(this.drugs[d].pathways.trim() === pPathway.trim()){
                      if (this.drugs[d].editable === 0) {
                          this.drugs[d].icln = value;
                      }
                      this.drugs[d].cln = Number(value)*this.drugweights.clonalityweight;
                      this.drugs[d].total = Number(this.drugs[d].subt) + Number(this.drugs[d].cln) + Number(this.drugs[d].tier) + Number(this.drugs[d].trl);
                }
            }
        },

        // update iTIER value in all rows for the Pathway being edited
        updateITIER: function(value,pPathway){
            for (var d = 0; d < this.drugs.length; d++){
                if(this.drugs[d].pathways.trim() === pPathway.trim()){
                      if (this.drugs[d].editable === 0) {
                          this.drugs[d].itier = value;
                      }
                      this.drugs[d].tier = Number(value)*this.drugweights.tierscoreweight;
                      this.drugs[d].total = Number(this.drugs[d].subt) + Number(this.drugs[d].cln) + Number(this.drugs[d].tier) + Number(this.drugs[d].trl);
                }
            }
        },

        // update iTRL value in all rows for the Pathway being edited
        updateITRL: function(value,pPathway,pDRUGAGENTS){
            for (var d = 0; d < this.drugs.length; d++){
                if((this.drugs[d].pathways.trim() === pPathway.trim()) && (this.drugs[d].drugagents == pDRUGAGENTS)){
                      this.drugs[d].itrl = value;
                      this.drugs[d].trl = Number(value)*this.drugweights.trialweight;
                      this.drugs[d].total = Number(this.drugs[d].subt) + Number(this.drugs[d].cln) + Number(this.drugs[d].tier) + Number(this.drugs[d].trl);
                }
            }
        },
    },
}
</script>

<style scoped>

.cellhighlight {
  background-color: grey;
  color: black;
  text-align: center;
}

.bluebg {
      background-color: #E4ECFF;
}

.darkcenter {
  background-color: #393B40;
  color: #E4ECFF;
  text-align: center;
}

.darkleft {
  background-color: #393B40;
  color: #E4ECFF;
  text-align: left;
}

.lightbluecenter {
    background-color: #E4ECFF;
    color: #393B40;
    text-align: center;
}

.lightblueleft {
    background-color: #E4ECFF;
    color: #393B40;
    text-align: left;
}

.lightblueright {
    background-color: #E4ECFF;
    color: #393B40;
    text-align: right;
}

.whitecenter {
    background-color: white;
    color: #393B40;
    text-align: center;
}

.chipdefault {
  background-color: red;
  color:red;
  text-color: black;
}

.chipactive {
  background-color: white;
  color:black;
  text-color: black;
}

.ttfontcolor{
  color: black;
  text-align: center;
}

.v-chip.act{
  background: white;
}

.v-chip.def{
  background: #717680;
}

.tooltip2 {
  position: relative;
  width: 30px;
  height: 30px;
}


.tooltip2 span {
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  line-height: 30px;
  bottom: 40px;
  border-radius: 5px;
  padding: 0 5px;
}


.tooltip2 span:after {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(0, 0, 0, 0);
  border-top-color: rgba(0, 0, 0, 0.6);
  border-width: 6px;
  margin-left: -6px;
}

.tooltip2:hover span {
  opacity: 1;
  pointer-events: inherit;
}

.tooltip {
  width: 50;
  display: inline-block;
  position: top;
  background: #FFECB3;
  color: #000000;
  white-space: nowrap;
  word-wrap: normal;

}

.tooltip span {
  position: top;
  top: 100%;
  background: #FFECB3;
  color: #000000;
  white-space: nowrap;
  word-wrap: normal;
}

.tooltip:hover span {
  display: block;
  position: top;
  background: #FFECB3;
  color: #000000;
  white-space: nowrap;
  word-wrap: normal;
  pointer-events: inherit;
}

.tooltip-arrow {
      margin-bottom: 5px;
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
      z-index: 1;
    }

td p {
  margin: 0;
  padding:5px;
  height:30px;
}

.v-text-area {
  justify-content: center;
  text-align: center;
}

.vsel, option {
  font-size: 0.8rem;
  line-height: 18px;
  margin: 0;
  align-items: center;
  text-align: center;
  justify: center;
  width: 80px;
  border: none;
}

.vsel {
  padding: 5px 0px;
  height: 30px;
}
option {
    align-content: center;
    align-items: center;
    text-align: center;
    justify: center;
}

.v-select-list {
  text-align: left;
}
.v-list-item {
  text-align: left;

}
.v-tooltip__content {
  pointer-events: initial;
}

</style>
