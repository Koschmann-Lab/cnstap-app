
<template>
  <v-container>

    <!--

    1. CLOSED Populate grey cells when pathway is already selected
    2. CLOSED V-intro number 5 goes next to 7 and skips 6
    3. CLOSED PI3K/mTOR pathway has a spelling error probably
    4. CLOSED Real time graph update
    5. Add clinicaltrials.gov link to table
    6. CLOSED only show the number instead of the whole legend for iCLN, iTIER, itrl
    7. CLOSED do not disable the "switch2" but provide a message


    3. In order to fit multiple pathways onto the same row for the graph,
    we need to add another loop in the code around line 470 - may need to
    adjust the array for this loop to work by pathway

    Bugs

    -->


    <v-row class="justify-center align-center">
       <v-col cols="3">
           <h3 class="display-3 font-weight-bold grey--text text--darken-2">
            CNS-TAP
          </h3>
       </v-col>
       <v-col cols="9" class="font-weight-bold grey--text text--darken-2 text-right">
         <!-- Introduction button - Start -->
             <template>
                   <div class="text-right">
                         <v-btn
                           icon
                           @click="startIntro()">
                                 <v-icon large color="grey darken-2">mdi-comment-question</v-icon>
                         </v-btn>
                   </div>
             </template>
         <!-- Introduction button - End -->
       </v-col>
    </v-row>

<!-- Switches for Notes, Graph and Patient Data - Start -->
<v-row class="justify-center align-center">
   <v-col cols="3">

   </v-col>
   <v-col cols="9" class="font-weight-bold grey--text text--darken-2 text-right">
     <div class="d-print-none">
        <v-simple-table>
            <tbody>
                <tr>
                  <!-- Switches for Notes -->
                    <td width="300px" class="lightbluecenter">
                          <div v-intro="'Switch to enter custom notes, which will be retained in the generated report.'" v-intro-step="2">
                                <v-switch v-model="switch1" @change="getdatetime()" inset :label="`Note Space`"></v-switch>
                          </div>
                    </td>
                    <!-- Switches for Graph -->
                    <td width="300px" class="lightbluecenter">
                          <div v-intro="'Switch to view graphs that show CNS-Tap baseline and patient specific scores for drugs in selected pathways. Please select at least one pathway to enable this feature.'" v-intro-step="3">
                                <!-- <v-switch :disabled="this.pathwayselection.length === 0" v-model="switch2" inset :label="`Pathway Graphs`"></v-switch> -->
                                <v-switch v-model="switch2" inset :label="`Pathway Graphs`"></v-switch>
                          </div>
                    </td>
                    <!-- Switches for Patient Data -->
                    <td class="lightbluecenter">
                          <div v-intro="'Switch to input patient specific sequencing data to generate patient specific scores.'" v-intro-step="4">
                                <v-switch v-model="switch3" inset :label="`Patient Data Columns`"></v-switch>
                          </div>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
      </div>
   </v-col>
</v-row>
<!-- Switches for Notes, Graph and Patient Data - End -->

<div class="d-print-none">
  <v-row>
    <v-col cols="3" >
    </v-col>
    <v-col cols="9" class="font-weight-bold grey--text text--darken-2 text-right">

      <div class="d-print-none">
         <v-simple-table>
             <tbody>
                 <tr>
                   <!-- Switches for Group by  -->
                     <td width="300px" class="lightbluecenter">
                       <!-- <div v-intro="'Group or Ungroup Agents by Pathway'" v-intro-step="6">
                             <v-switch  v-model="switch4" inset :label="`Group by Pathway`"></v-switch>
                       </div> -->
                     </td>
                     <td width="300px" class="lightblueleft">
                       <!-- Print buttons for PDF and PPT - Start -->
                               <div v-intro="'Click here to generate CNS-TAP report with Data table, Notes, and Graphs.'" v-intro-step="6">
                                 <span style="font-size:15px;font-weight:bold">
                                 <v-btn small rounded class="grey darken-3 white--text" @click="printPDF4()"  dark>PDF</v-btn>
                                 &nbsp; &nbsp;
                                 <v-btn small rounded class="grey darken-3 white--text" @click="printPPT()"  dark>PPT</v-btn>

                                Generate Report
                                 </span>
                              </div>
                       <!-- Print buttons for PDF and PPT - Start -->
                     </td>
                     <td class="lightbluecenter">

                       <!-- Information button - Start -->

                      <template>

                          <div class="text-left" v-intro="'Click here to view how each category is scored and weighted in the algorithm.'" v-intro-step="7">
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

                              <v-card>
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

                       <!-- Information button - End -->
                     </td>
                 </tr>
             </tbody>
         </v-simple-table>
       </div>
    </v-col>
  </v-row>
</div>

<!-- Print buttons for PDF and PPT - End -->

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
    <div id="pathwayGraph" v-if="switch2">
      <div v-if="GraphDataset.length==0">
          <v-alert type="error">
            Please select at least one Pathway from the 'Pathway selection' to display Graphs.
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
    <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }" ref = "h.value">
            <template v-if="header.tt === ''" >
                    <span :key="h.text" >{{header.text}}</span>
            </template>
            <template v-else-if="header.text === 'iTRL' || header.text === 'TRL'">
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
          <template v-if="props.item.editable != 2">
                      <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.subt }}</p></div>
          </template>
          <template v-else>
                      <div><p>{{ props.item.subt }}</p></div>
          </template>
      </template>
<!-- Main Drug Table - Configure SubT column - End -->

<!-- Main Drug Table - Configure Total column - Start -->
      <template v-slot:item.total="props">
        <template v-if="props.item.editable != 2">
                    <div class="blue-grey lighten-4 grey--text-darken-4"><p>{{ props.item.total }}</p></div>
        </template>
        <template v-else>
                    <div><p>{{ props.item.total }}</p></div>
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
        <div v-for="testsetObj in GraphDataset"
                :key="testsetObj.pathway" v-bind:id="testsetObj.pathway">
                <v-simple-table > <tbody>
                <tr>
                        <v-simple-table > <tbody><tr>
                        <td class="lightblueleft">
                        {{ testsetObj.pathway }}
                        </td>
                        <td class="lightblueright"><div style="display:inline-block;"><div style="width:30px;height:10px;border:1px;solid #000;background:black;display:inline-block;"></div>&nbsp;Baseline</div></td>
                        <td class="lightblueleft"><div style="display:inline-block;"><div style="width:30px;height:10px;border:1px solid #000;background:white;display:inline-block;"></div>&nbsp;Patient Specific</div></td>
                       </tr></tbody></v-simple-table>
                </tr>
                <tr>
                <td class="lightbluecenter">
                        <v-row>
                          <v-col
                            v-for="drugagent in testsetObj.drugagents"
                            :key="drugagent.values.ptspecific"
                            cols="3"
                            sm="3"
                            class='brd-b-3'
                          >
                                <LineGraphContainer :rawdata=drugagent>

                                </LineGraphContainer>
                          </v-col>
                        </v-row>
                </td></tr>
                </tbody></v-simple-table>
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

import LineGraphContainer from '../components/LineGraphContainer.vue'
import AlgorithmTable from '../components/Algorithm.vue'
import Footer from '../components/Footer.vue'


import pptxgen from "pptxgenjs";
import printJS from 'print-js';
import domtoimage from 'dom-to-image';

  export default {

    name: 'UserView',

    components: {
      LineGraphContainer,
      AlgorithmTable,
      Footer
    },

    mounted() {
      this.startIntro();
     },


    data: () => (  {

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

      customNotes: "",
      pathwayselection: [],
      hiddenColumns: ['SubT','iCLN','CLN','TIER','TRL','iTIER','iTRL'],

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
      {   text: 'iTIER', align: 'center', sortable: true, value: 'itier', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'Variant tier score - Parsons Score (0 to 6 points)', groupable: false  },
      {   text: 'iTRL', align: 'center', sortable: true, value: 'itrl', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'Relevant Clinical Trial (0 to 20)', groupable: false  },
      {   text: 'CLN', align: 'center', sortable: true, value: 'cln', class: 'grey darken-3 white--text', tt: 'Clonality/variant allele fraction - % of tumor with relevant pathway', groupable: false  },
      {   text: 'TIER', align: 'center', sortable: true, value: 'tier', class: 'grey darken-3 white--text', tt: 'Variant tier score - Parsons Score', groupable: false  },
      {   text: 'TRL', align: 'center', sortable: true, value: 'trl', class: 'grey darken-3 white--text', tt: 'Relevant Clinical Trial', groupable: false  },
      {   text: 'Total', align: 'center', sortable: true, value: 'total', class: 'grey darken-1 white--text', tt: '', groupable: false  }, ],

      drugs: [
      { pathways: "AKT", drugagents: "MK2206", vitro: 4, vivo: 6, safety: 6, cns: 0, bbb: 0, fda: 0, subt:16, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 16, editable: 1, },
      { pathways: "AKT", drugagents: "Perfinosine", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 0, fda: 0, subt:8, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 8, editable: 0, },
      { pathways: "ALK", drugagents: "Ceritinib", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 10, fda: 10, subt:28, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 28, editable: 1, },
      { pathways: "ALK", drugagents: "Alectinib", vitro: 2, vivo: 6, safety: 3, cns: 5, bbb: 10, fda: 0, subt:26, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 26, editable: 0, },
      { pathways: "ALK", drugagents: "Entrectinib", vitro: 4, vivo: 0, safety: 3, cns: 10, bbb: 10, fda: 0, subt:27, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 27, editable: 0, },
      { pathways: "BRAF", drugagents: "Dabrafenib", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 5, fda: 10, subt:41,  icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0,total: 41, editable: 1, },
      { pathways: "BRAF", drugagents: "Vemurafenib", vitro: 2, vivo: 0, safety: 0, cns: 10, bbb: 5, fda: 10, subt: 27, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 27, editable: 0, },
      { pathways: "CDK", drugagents: "Abemaciclib", vitro: 2, vivo: 6, safety: 0, cns: 10, bbb: 5, fda: 10, subt: 33, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 33, editable: 1, },
      { pathways: "CDK", drugagents: "Palbociclib", vitro: 4, vivo: 6, safety: 3, cns: 0, bbb: 0, fda: 10, subt: 23, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 23, editable: 0, },
      { pathways: "CDK", drugagents: "Ribociclib", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 10, fda: 10, subt: 28, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 28, editable: 0, },
      { pathways: "CNS Generic", drugagents: "Lenalidomide", vitro: 2, vivo: 0, safety: 6, cns: 10, bbb: 10, fda: 10, subt: 38, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 38, editable: 1, },
      { pathways: "CNS Generic", drugagents: "Olaparib", vitro: 4, vivo: 6, safety: 0, cns: 5, bbb: 0, fda: 10, subt: 25, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 25, editable: 0, },
      { pathways: "CNS Generic", drugagents: "Gemcitabine", vitro: 4, vivo: 6, safety: 0, cns: 5, bbb: 10, fda: 10, subt: 35, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 35, editable: 0, },
      { pathways: "EGFR", drugagents: "Erlotinib", vitro: 4, vivo: 0, safety: 6, cns: -10, bbb: 10, fda: 10, subt: 20, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 20, editable: 1, },
      { pathways: "EGFR", drugagents: "Osimertinib Mesylate (AZD9291; Tagrisso)", vitro: 2, vivo: 6, safety: 0, cns: 5, bbb: 10, fda: 10, subt: 33, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 33, editable: 0, },
      { pathways: "FGFR", drugagents: "Pazopanib (FGFR)", vitro: 4, vivo: 6, safety: 6, cns: 5, bbb: 5, fda: 10, subt: 36, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 1, },
      { pathways: "FGFR", drugagents: "Ponatinib (FGFR)", vitro: 4, vivo: 6, safety: 0, cns: 5, bbb: 10, fda: 10, subt: 35, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 35, editable: 0, },
      { pathways: "FGFR", drugagents: "Erdafitinib (FGFR)", vitro: 4, vivo: 6, safety: 0, cns: 5, bbb: 0, fda: 0, subt: 15, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 15, editable: 0, },
      { pathways: "FGFR", drugagents: "Debio 1347 (FGFR)", vitro: 2, vivo: 1, safety: 0, cns: 0, bbb: 0, fda: 0, subt: 3, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 3, editable: 0, },
      { pathways: "EGFR/HER2/HER4/cMET", drugagents: "Afatinib", vitro: 4, vivo: 6, safety: 3, cns: -10, bbb: 0, fda: 10, subt: 13, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 13, editable: 1, },
      { pathways: "HDAC", drugagents: "Panobinostat (LBH589)", vitro: 2, vivo: 6, safety: 6, cns: 10, bbb: 0, fda: 10, subt: 34, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 34, editable: 1, },
      { pathways: "HDAC", drugagents: "Vorinostat (SAHA)", vitro: 2, vivo: 6, safety: 6, cns: -10, bbb: 10, fda: 10, subt: 24, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 24, editable: 0, },
      { pathways: "HDAC", drugagents: "Entinostat", vitro: 4, vivo: 6, safety: 3, cns: 0, bbb: 5, fda: 0, subt: 18, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 18, editable: 0, },
      { pathways: "HDAC", drugagents: "Onc201", vitro: 4, vivo: 6, safety: 3, cns: 10, bbb: 10, fda: 0, subt: 33, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 33, editable: 0, },
      { pathways: "HDAC", drugagents: "Valproic Acid", vitro: 4, vivo: 3, safety: 6, cns: 0, bbb: 10, fda: 10, subt: 33, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 33, editable: 0, },
      { pathways: "INI1", drugagents: "Alisertib (MLN8237)", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 10, fda: 0, subt: 36, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 1, },
      { pathways: "INI1", drugagents: "Tamoxifen", vitro: 2, vivo: 0, safety: 0, cns: 0, bbb: 10, fda: 10, subt: 22, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 22, editable: 0, },
      { pathways: "INI1", drugagents: "Tazemetostat (EPZ-6438)", vitro: 2, vivo: 0, safety: 3, cns: 0, bbb: 5, fda: 0, subt: 10, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 10, editable: 0, },
      { pathways: "MEK", drugagents: "Trametinib", vitro: 2, vivo: 3, safety: 3, cns: 5, bbb: 10, fda: 10, subt: 33, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total:33 , editable: 1, },
      { pathways: "MEK", drugagents: "Selumetinib", vitro: 4, vivo: 0, safety: 0, cns: 0, bbb: 0, fda: 10, subt: 14, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 14, editable: 0, },
      { pathways: "MEK", drugagents: "Cobimetinib", vitro: 4, vivo: 0, safety: 0, cns: 0, bbb: 5, fda: 0, subt: 19, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 19, editable: 0, },
      { pathways: "MEK", drugagents: "Binimetinib", vitro: 4, vivo: 0, safety: 0, cns: 5, bbb: 0, fda: 10, subt: 19, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 19, editable: 0, },
      { pathways: "PDGFR", drugagents: "Crenolanib", vitro: 2, vivo: 0, safety: 3, cns: 0, bbb: 0, fda: 0, subt: 5, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 5, editable: 1, },
      { pathways: "PDGFR", drugagents: "Dasatinib", vitro: 4, vivo: 6, safety: 6, cns: 5, bbb: 10, fda: 10, subt: 41, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 41, editable: 0, },
      { pathways: "PDGFR", drugagents: "Pazopanib", vitro: 4, vivo: 6, safety: 6, cns: 5, bbb: 5, fda: 10, subt: 36, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 0, },
      { pathways: "PDGFR", drugagents: "Ponatinib (PDGFR)", vitro: 4, vivo: 6, safety: 0, cns: 5, bbb: 10, fda: 10, subt: 35, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 35, editable: 0, },
      { pathways: "PDGFR", drugagents: "Sorafenib", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 0, fda: 10, subt: 18, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 18, editable: 0, },
      { pathways: "PDGFR", drugagents: "Sunitinib", vitro: 2, vivo: 6, safety: 6, cns: 5, bbb: 0, fda: 10, subt: 29, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 29, editable: 0, },
      { pathways: "PI3K/mTOR", drugagents: "BKM120 (Buparlisib)", vitro: 4, vivo: 6, safety: 0, cns: 0, bbb: 5, fda: 0, subt: 15, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 15, editable: 1, },
      { pathways: "PI3K/mTOR", drugagents: "GDC-0084 (PI3K Inhibitor)", vitro: 4, vivo: 0, safety: 0, cns: 10, bbb: 10, fda: 0, subt: 24, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 24, editable: 0, },
      { pathways: "PI3K/mTOR", drugagents: "Everolimus (PI3K)", vitro: 2, vivo: 0, safety: 6, cns: 10, bbb: 5, fda: 10, subt: 33, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 33, editable: 0, },
      { pathways: "PI3K/mTOR", drugagents: "Temsirolimus", vitro: 4, vivo: 6, safety: 6, cns: -5, bbb: 5, fda: 10, subt: 26, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 26, editable: 0, },
      { pathways: "PI3K/mTOR", drugagents: "LY3023414", vitro: 4, vivo: 3, safety: 0, cns: 5, bbb: 5, fda: 0, subt: 17, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 17, editable: 0, },
      { pathways: "MET", drugagents: "Crizotinib", vitro: 4, vivo: 6, safety: 6, cns: 5, bbb: 0, fda: 10, subt: 31, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 31, editable: 1, },
      { pathways: "MET/VEGF2", drugagents: "Cabozantinib", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 10, fda: 10, subt: 46, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 46, editable: 1, },
      { pathways: "Chk1", drugagents: "Prexasertib", vitro: 2, vivo: 6, safety: 0, cns: 0, bbb: 0, fda: 0, subt: 8, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 8, editable: 1, },
      { pathways: "GENERIC CYTOTOXIC", drugagents: "Etoposide", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 0, fda: 10, subt: 36, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 1, },
      { pathways: "GENERIC CYTOTOXIC", drugagents: "Carboplatin", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 0, fda: 10, subt: 36, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 0, },
      { pathways: "GENERIC CYTOTOXIC", drugagents: "Irinotecan", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 0, fda: 10, subt: 36, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 0, },
      { pathways: "GENERIC CYTOTOXIC", drugagents: "CCNU (lomustine)", vitro: 4, vivo: 3, safety: 6, cns: 10, bbb: 0, fda: 10, subt: 33, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 33, editable: 0, },
      { pathways: "GENERIC CYTOTOXIC", drugagents: "Temozolomide", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 0, fda: 10, subt: 36, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 36, editable: 0, },
      { pathways: "RET", drugagents: "Ponatinib (RET)", vitro: 4, vivo: 6, safety: 0, cns: 5, bbb: 10, fda: 10, subt: 35, icln: 0, itier:0, itrl:0, cln: 0, tier: 0, trl: 0, total: 35, editable: 1, },
      { pathways: "RET", drugagents: "Cabozantinib", vitro: 4, vivo: 6, safety: 6, cns: 10, bbb: 10, fda: 10, subt: 46, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 46, editable: 0, },
      { pathways: "RET", drugagents: "Alectinib (RET)", vitro: 2, vivo: 0, safety: 0, cns: 5, bbb: 10, fda: 10, subt: 27, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 27, editable: 0, },
      { pathways: "RET", drugagents: "Loxo-292", vitro: 2, vivo: 6, safety: 3, cns: 5, bbb: 10, fda: 0, subt: 26, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 26, editable: 0, },
      { pathways: "RET", drugagents: "BLU-667", vitro: 2, vivo: 3, safety: 0, cns: 5, bbb: 0, fda: 0, subt: 10, icln: 0, itier: 0, itrl:0, cln: 0, tier: 0, trl: 0, total: 10, editable: 0, } ],



    iCLNitems: [{id: 0, name: '0 - no data or less dominant'},{id: 1, name: '1 - dominant'},{id: 2, name: '2 - fusion'}],
    iTIERitems: [{id: 0, name: '0 - not scored'},{id: 1, name: '1 - Parsons 3 or 4'},{id: 2, name: '2 - Parsons 1 or 2'}],
    iTRLitems: [{id: 0, name: '0 - none'},{id: 1, name: '1 - yes'}],

    GraphDataset: [{ pathway: "", drugagents:[]},],


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
  // Ignore the first dummy row for adding data to graph, if switch3 is not selected
            if ((i.editable!= 2) || (this.switch3)){
                this.GraphDataset.splice(0);
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
            if (!this.switch3) {
            return this.headers.filter(header => !this.hiddenColumns.includes(header.text))
            }
            return this.headers;
      },

      clnleft () {
        return this.$refs.cln.getBoundingClientRect().left
      }
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
                      for (var p = 0; p < this.pathwayselection.length; p++){
                            var tDrugagents = [{ agent: "", values:{baseline:0, ptspecific:0}},];
                            tDrugagents.splice(0);
                            for (var d = 0; d < this.drugs.length; d++){
                              if(this.pathways[this.pathwayselection[p]].pathway.trim() == this.drugs[d].pathways.trim()){
                                  tDrugagents.push({agent:this.drugs[d].drugagents, values:{baseline:this.drugs[d].subt, ptspecific:this.drugs[d].total}});
                              }
                            }
                              this.GraphDataset.push({pathway:this.pathways[this.pathwayselection[p]].pathway.trim(), drugagents:tDrugagents});
                          //    alert(JSON.stringify(this.GraphDataset));
                        }
         },

 // PDF print using window.print()
         printPDF1: function () {
             window.print();
         },

// PDF print using printJS
        printPDF2 () {

           printJS({printable:['drugTable'],type:'html',header: 'CNS-TAP'});

           // Adding graph as image in a slide
            domtoimage.toPng(document.getElementById('pathwayGraph'))
                .then(function (dataUrl) {

                //  printJS({printable:['drugTable'],type:'html',header: 'CNS-TAP'},{printable:[dataUrl], type:'image'})
//                printJS({printable:['drugTable'],type:'html',header: 'CNS-TAP'});
                printJS(dataUrl,'image');

//                    pres.addSlide().addImage({path: dataUrl, w: '100%', h: '100%'});
                 })
                 .catch(function (error) {
                     alert("error");
                     console.error('oops, something went wrong!', error);
                 });

        },

// PDF print using DIV tag printing
        async printPDF3() {
              var divDrugTableContents = document.getElementById("drugTable").innerHTML;
              //var divGraph = document.getElementById("AKT");

              var a = window.open('', '', 'height=5, width=10');

              a.document.write('<html>');
              a.document.write('<body > <h1>CNS-TAP</h1><br><br>');
              a.document.write('<h2>Drug Table</h2><br>');
              a.document.write(divDrugTableContents);
              a.document.write('<br><br><h2>Notes</h2><br>');
              a.document.write(this.customNotes);
              a.document.write('<br><br><h2>Pathway Graphs</h2><br>');

              //   Adding graph as image in a slide
                 for (let i = 0; i < this.GraphDataset.length; i++) {
                        let pathw = this.GraphDataset[i].pathway;
                        let dataUrl = await domtoimage.toPng(document.getElementById(pathw));
                        await a.document.write("<br><img src='" + dataUrl + "'/>");
                 }
              a.document.write('</body></html>');
              a.document.close();
              setTimeout(function () { a.print(); }, 500);
              a.onfocus = function () { setTimeout(function () { a.close(); }, 300); }
        },

// PDF print using iFrame printing
        async printPDF4 () {

                  var objFra = document.createElement('iframe');
                  objFra.style.visibility = 'hidden';
                  objFra.src = "about:blank";


                  document.body.appendChild(objFra);
                  objFra.contentWindow.document.open();
                  objFra.contentWindow.document.write("<br><h1>CNS-Tap report</h1><br><br>");

                  objFra.contentWindow.document.write("<br><br><h2>Drug Table</h2><br>");
                  var tableContents = document.getElementById("drugTable").innerHTML;
                  objFra.contentWindow.document.write(tableContents);

                  objFra.contentWindow.document.write("<br><br><h2>Notes</h2><br>");
                  objFra.contentWindow.document.write(this.customNotes);

                  objFra.contentWindow.document.write("<br><br><h2>Pathway Graphs</h2><br>");

                  //   Adding graph as image in a slide
                     for (let i = 0; i < this.GraphDataset.length; i++) {
                            let pathw = this.GraphDataset[i].pathway;
                            let dataUrl = await domtoimage.toPng(document.getElementById(pathw));
                            await objFra.contentWindow.document.write("<br><img src='" + dataUrl + "'/>");
                     }

                  objFra.contentWindow.document.close();
                  objFra.contentWindow.focus();
                  objFra.contentWindow.print();
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

        //   Adding graph as image in a slide
           for (let i = 0; i < this.GraphDataset.length; i++) {
                  let pathw = this.GraphDataset[i].pathway;
                  let dataUrl = await domtoimage.toPng(document.getElementById(pathw));
                  await pres.addSlide().addImage({path: dataUrl, x:'1', y:'1', w: '80%', h: '80%'});
           }
          await pres.writeFile("CNSTAP.pptx");
        },

        updateICLN: function(value,pPathway){
            for (var d = 0; d < this.drugs.length; d++){
                if(this.drugs[d].pathways.trim() === pPathway.trim()){
                      if (this.drugs[d].editable === 0) {
                          this.drugs[d].icln = value;
                      }
                      this.drugs[d].cln = Number(value)*5;
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
                      this.drugs[d].tier = Number(value)*3;
                      this.drugs[d].total = Number(this.drugs[d].subt) + Number(this.drugs[d].cln) + Number(this.drugs[d].tier) + Number(this.drugs[d].trl);
                }
            }
        },


        updateITRL: function(value,pPathway,pDRUGAGENTS){
            for (var d = 0; d < this.drugs.length; d++){
                if((this.drugs[d].pathways.trim() === pPathway.trim()) && (this.drugs[d].drugagents == pDRUGAGENTS)){
                      this.drugs[d].itrl = value;
                      this.drugs[d].trl = Number(value)*20;
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



</style>
