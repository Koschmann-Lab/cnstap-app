
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
                                <v-switch v-model="switch1" @change="getdatetime()" inset :label="`Note Space`"></v-switch>
                          </div>
                    </td>
                    <!-- Switches for Notes - End -->
                    <!-- Switches for Graph - Start -->
                    <td width="300px" class="lightblueleft">
                          <div v-intro="'Switch to view graphs that show CNS-Tap baseline and patient specific scores for drugs in selected pathways. Please select at least one pathway to enable this feature.'" v-intro-step="3">
                                <!-- <v-switch :disabled="this.pathwayselection.length === 0" v-model="switch2" inset :label="`Pathway Graphs`"></v-switch> -->
                                <v-switch v-model="switch2" inset :label="`Pathway Graphs`"></v-switch>
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
                                 <v-switch v-model="switch3" inset :label="`Patient Data Columns`"></v-switch>
                           </div>
                     </td>
                     <!-- Switch for Patient Data - End -->
                     <!-- Switch for Patient type - Start -->
                     <td class="lightblueleft">
                         <div v-intro="'Switch to select the patient age group.'" v-intro-step="8">
                                 <span style="font-size:15px;font-weight:bold">
                                       <v-chip-group
                                         v-model="switch5"
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
       <div v-if="switch1" id="divNotes">
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
      <v-col cols="2" >
<!-- Pathways multi selection - Start -->
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
<!-- Pathways multi selection - End -->
      </v-col>

      <v-col cols="10" >

<!-- Warning message if PathwayGraph switch is selected without select at least one patheay - Start -->
    <div id="pathwayGraphMsg" v-if="switch2">
      <div v-if="GraphDataset.length==0">
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
<!-- Warning message if PathwayGraph switch is selected without select at least one patheay - End -->


<!-- Main Drug Table - Start -->
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


    <template v-slot:body.prepend="{headers}" v-if="switch3">
        <tr>
          <td v-for="(header,i) in headers" :key="i">
                <div class="darkcenter" v-if="header.value == 'icln'">INPUT</div>
                <div class="darkcenter" v-if="header.value == 'itier'">PATIENT</div>
                <div class="darkcenter" v-if="header.value == 'itrl'">DATA</div>
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

                  <template v-if="switch3">
                        <template v-if="!switch5">
                              <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.subt }}</p></div>
                        </template>
                        <template v-else>
                              <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ Number(props.item.subt) - Number(props.item.safety) }}</p></div>
                        </template>
                  </template>
                  <template v-else>
                        <template v-if="!switch5">
                              <div><p>{{ props.item.subt }}</p></div>
                        </template>
                        <template v-else>
                              <div><p>{{ Number(props.item.subt) - Number(props.item.safety) }}</p></div>
                        </template>
                  </template>

        <!-- <template v-slot:item.subt="props">
          <template v-if="props.item.editable != 2">
                      <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.subt }}</p></div>
          </template>
          <template v-else>
                      <div><p>{{ props.item.subt }}</p></div>
          </template> -->

      </template>


<!-- Main Drug Table - Configure SubT column - End -->

<!-- Main Drug Table - Configure Total column - Start -->

      <template v-slot:item.total="props">

        <template v-if="switch3" >
              <template v-if="!switch5">
                    <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.total }}</p></div>
              </template>
              <template v-else>
                    <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ Number(props.item.total) - Number(props.item.safety) }}</p></div>
              </template>
        </template>
        <template v-else>
              <template v-if="!switch5">
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
<!-- ***************************** -->
<!-- Pathway Graph display - Start -->
<!-- ***************************** -->

<br><br>

    <div id="pathwayGraph" v-if="switch2">

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
                <LineGraphContainerLarge :rawpathway=GraphDatasetAll[0].pathway :rawdata=GraphDatasetAll[0].drugagents :rawbaseline=GraphDatasetAll[0].baseline :rawptspecific=GraphDatasetAll[0].ptspecific :rawradius=GraphDatasetAll[0].radius >
                </LineGraphContainerLarge>
              </v-col>
            </v-row>


      </div>
      <!-- LineCharts End -->

       </div>

<!-- ***************************** -->
<!-- Pathway Graph display - End -->
<!-- ***************************** -->
<!-- ***************************** -->

    </v-col>
</v-row>

<!-- Page Footer - Start -->
     <Footer></Footer>
<!-- Page Footer - End -->

</v-container>
</template>

<script>

// import PathwaysGraph from '../components/PathwaysGraph.vue'
// import LineGraphContainer from '../components/LineGraphContainer.vue'
import LineGraphContainerLarge from '../components/LineGraphContainerLarge.vue'
import AlgorithmTable from '../components/Algorithm.vue'
import Footer from '../components/Footer.vue'


import pptxgen from "pptxgenjs";
import domtoimage from 'dom-to-image';

  export default {

    name: 'UserView',

    components: {
  //    PathwaysGraph,
  //    LineGraphContainer,
      LineGraphContainerLarge,
      AlgorithmTable,
      Footer
    },

    created() {

    },

    mounted() {
      this.startIntro();
      this.drugs = JSON.parse(this.$route.params.drugslist)
      this.drugweights = JSON.parse(this.$route.params.drugweights)
      console.log(this.drugs.length)  // You can use this.druglist to replace the hard-coded drugs array
    },


    data: () => (  {

      drugslist : [],
      dialog: false,
      pgTitle: 'CNS-TAP',

      ttVitrorow: '(0, 1, or 2) x 2',
      ttVivorow: '(0, 1, or 2) x 3',
      ttSafetyrow: '(0, 1, or 2) x 3',
      ttCNSrow: '(-2, -1, 0, 1, or 2) x 5',
      ttBBBrow: '(0, 1, or 2) x 5',
      ttFDArow: '(0 or 1) x 10',
      ttCLNrow: '(0, 1, or 2) x 5',
      ttTIERrow: '(0, 1, or 2) x 3',
      ttTRLrow: '(0 or 1) x 20',

      switch1: false,
      switch2: false,
      switch3: false,
      switch4: true,
      switch5: true,

      customNotes: "",
      pathwayselection: [],
      // hiddenColumns: ['SubT','iCLN','CLN','TIER','TRL','iTIER','iTRL'],


      allColumns: ['Pathways','Drug Agents','Vitro','Vivo','CNS','BBB','FDA','Total'],
      patientColumns: ['Pathways','Drug Agents','Vitro','Vivo','CNS','BBB','FDA','SubT','iCLN','iTIER','iTRL','CLN','TIER','TRL','Total'],
      allColumnsPed: ['Pathways','Drug Agents','Vitro','Vivo','Safety','CNS','BBB','FDA','Total'],
      patientColumnsPed: ['Pathways','Drug Agents','Vitro','Vivo','Safety','CNS','BBB','FDA','SubT','iCLN','iTIER','iTRL','CLN','TIER','TRL','Total'],


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


      drugs: [],
      drugweights: {},

    iCLNitems: [{id: 0, name: '0 - no data or less dominant'},{id: 1, name: '1 - dominant'},{id: 2, name: '2 - fusion'}],
    iTIERitems: [{id: 0, name: '0 - Tier IV'},{id: 1, name: '1 - Tier III'},{id: 2, name: '2 - Tier I or Tier II'}],
    iTRLitems: [{id: 0, name: '0 - none'},{id: 1, name: '1 - yes'}],

    GraphDataset: [{ pathway: "", drugagents:[]},],

//    GraphDatasetLarge: [{ pathway: "", drugagents:[], baseline: [], ptspecific: []},],

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
//       this.filterPathwaysGraphData();


        return this.drugs.filter((i) => {


            // load all rows, if no Pathway is selected
        if (!this.pathwayselection || this.pathwayselection.length == 0) {
  // Ignore the first dummy row for adding data to graph, if switch3 is not selected
            if ((i.editable!= 2) || (this.switch3)){
                this.GraphDataset.splice(0);
    //            this.GraphDatasetLarge.splice(0);
                this.GraphDatasetAll.splice(0);

                return true;
            }

        } else {
  // load only rows for the Pathways selected
            for (p = 0; p < this.pathwayselection.length; p++) {
  // if pathway is the drug table matches the pathway selected
                if (i.pathways.trim() === "" || this.pathways[this.pathwayselection[p]].pathway.trim() == i.pathways.trim()) {
// Do not show the first dummy row, if switch3 is not selected
                  if ((i.editable!= 2) || (this.switch3)){
                      return true;
                  }
                }
              }
          }
        })

      },

      computedHeaders () {

          if (this.switch3) {
              if(!this.switch5) {
                  return this.headers.filter(header => this.patientColumnsPed.includes(header.text));
              }else {
                  return this.headers.filter(header => this.patientColumns.includes(header.text));
              }
          } else {
              if(!this.switch5) {
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

    watch: {

    },

    methods:{

         switch1_click:function(){this.$router.push("/UserView")  },
         switch2_click:function(){this.$router.push("/UserView")  },
         switch3_click:function(){this.$router.push("/UserView")  },
         switch4_click:function(){this.$router.push("/UserView")  },

         max25chars: v => v.length <= 25 || 'Input too long!',

         startIntro() {
          if(confirm("Do you want an introduction to the CNS-Tap website?")){
            const introJS = require("intro.js");
            introJS.introJs().start();
            this.$vuetify.goTo(0);
           }
         },

         getdatetime(){
           var dt = new Date().toLocaleString();
           var dateTime = 'Current date and time: '+dt;
           this.customNotes=dateTime;
       },

         filterGraphData() {
                      this.GraphDataset.splice(0);
                  //    this.GraphDatasetLarge.splice(0);
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
                                  if (!this.switch5) {
                                      tDrugagents.push({agent:this.drugs[d].drugagents, values:{baseline:this.drugs[d].subt, ptspecific:this.drugs[d].total}});
                                      tDrugagentsLarge.push(this.drugs[d].drugagents + ';' + this.drugs[d].pathways.trim());
                                      tBaselineLarge.push(this.drugs[d].subt);
                                      tPtspecificLarge.push(this.drugs[d].total);
                                      tPathwayLarge.push(this.drugs[d].pathways.trim());
                                  } else {
                                      tDrugagents.push({agent:this.drugs[d].drugagents, values:{baseline:(Number(this.drugs[d].subt) - Number(this.drugs[d].safety)) , ptspecific:(Number(this.drugs[d].total) - Number(this.drugs[d].safety))}});
                                      tDrugagentsLarge.push(this.drugs[d].drugagents + ';' + this.drugs[d].pathways.trim());
                              //        tDrugagentsLarge.push(this.drugs[d].drugagents);
                                      tBaselineLarge.push((Number(this.drugs[d].subt) - Number(this.drugs[d].safety)));
                                      tPtspecificLarge.push((Number(this.drugs[d].total) - Number(this.drugs[d].safety)));
                                      tPathwayLarge.push(this.drugs[d].pathways.trim());
                                }
                              }
                            }

                              this.GraphDataset.push({pathway:this.pathways[this.pathwayselection[p]].pathway.trim(), drugagents:tDrugagents});
                    //          this.GraphDatasetLarge.push({pathway:this.pathways[this.pathwayselection[p]].pathway.trim(), drugagents:tDrugagentsLarge, baseline:tBaselineLarge, ptspecific:tPtspecificLarge});
                    //         alert(JSON.stringify(this.GraphDatasetLarge));
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

// PPT print using pptxgen()
      async  printPPT () {

          if (!this.switch2) {
                alert("There are no Pathway Graphs to print. Please select at least one Pathway and toggle on the 'Pathways Graph' switch.");
                return;
           }

          // 1. Create a new Presentation
           let pres = new pptxgen();
           pres.author = 'Karthik Ravi';
           pres.company = 'Koschman Labs';
           pres.revision = '1';
           pres.subject = 'CNS-Tap report';
           pres.title = 'CNS-Tap Drugtable and Graphs Presentation';
           pres.layout = 'LAYOUT_WIDE';

           // Adding slide for banner
           let slideBanner = pres.addSlide();
           let textboxText = "CNS-TAP";
           let textboxOpts = { x: 1, y: 2, color: "363636", fill: "f1f1f1", align: pres.AlignH.center };
           slideBanner.addText(textboxText, textboxOpts);

           // Adding slide for Notes
           let slideNotes = pres.addSlide();
           let textboxText1 = "Notes";
           let textboxOpts1 = { x: 1, y: 1, color: "363636", fill: "f1f1f1", align: pres.AlignH.center };
           slideNotes.addText(textboxText1, textboxOpts1);
           slideNotes.addText("Notes: " + this.customNotes,{ x: 1, y: 2, align: pres.AlignH.left, color: "363636", fontSize: 12 });

           // Adding slide for table
           pres.tableToSlides("drugTable");

           // var style = {
           //   transform: 'scale(.5)',
           //   top: 0,
           //   left: 0,
           //   margin: 0,
           //   width: '500px',
           //   height: '500px',
           // };

           var scale = 1;
           let node = document.getElementById("largeGraph");
           //   Adding graph as image in a slide
           let dataUrl = await domtoimage.toPng(node,
            {
              width: node.clientWidth*scale,
              height: node.clientHeight*scale,
              style: "transform-origin:top left; transform:scale("+scale+");"
            }

         );
           await pres.addSlide().addImage({path: dataUrl, x:'1', y:'1', w: '100%', h: '100%'});


          await pres.writeFile("CNSTAP.pptx");
        },

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
  padding:10px;
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
