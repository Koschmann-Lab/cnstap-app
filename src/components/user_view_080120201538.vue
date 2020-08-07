<template>
  <v-container>


<!-- Introduction button - Start -->
    <template>
      <div class="text-right">
        <v-btn
          icon
          @click="startIntro();">
        <v-icon large color="grey darken-2">mdi-comment-question</v-icon>
        </v-btn>
      </div>
    </template>
<!-- Introduction button - End -->

<!-- Switches for Notes, Graph and Patient Data - Start -->
<v-row class="justify-center align-center">
   <v-col cols="3">
       <h1 class="display-3 font-weight-bold grey--text text--darken-2">
        CNS-TAP
      </h1>
   </v-col>
   <v-col cols="9" class="font-weight-bold grey--text text--darken-2 text-right">
      <v-simple-table>
      <tbody><tr><td class="lightbluecenter">
        <div v-intro="'Switch to enter your custom Notes'" v-intro-step="2">
          <v-switch v-model="switch1" inset :label="`Note Space`"></v-switch>
          </div>
      </td><td class="lightbluecenter">
        <div v-intro="'Switch to view Graph that compares different Drugs for Pathways'" v-intro-step="3">
          <v-switch v-model="switch2" inset :label="`Pathway Graphs`"></v-switch>
        </div>
        </td><td class="lightbluecenter">
          <div v-intro="'Switch to view and/or edit Patient relevant data'" v-intro-step="4">
          <v-switch v-model="switch3" inset :label="`Patient Data Columns`"></v-switch>
        </div>
      </td>
      </tr></tbody>
      </v-simple-table>
   </v-col>
</v-row>
<!-- Switches for Notes, Graph and Patient Data - End -->

<!-- Print buttons for PDF and PPT - Start -->
<div>
  <v-row>
    <v-col cols="2" >
    </v-col>
    <v-col cols="10" >
        <div align="right" v-intro="'Print report with Data table, Notes and Graph'" v-intro-step="6">
         Generate Report <v-space></v-space>
         <v-btn rounded class="grey darken-3 white--text" align="right" @click="printPDF()"  dark>PDF</v-btn> <v-space></v-space>
         <v-btn rounded class="grey darken-3 white--text" align="right" @click="printPPT()"  dark>PPT</v-btn>
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
       <div v-if="switch1">
          <v-textarea
            solo
            name="notes"
          label="Friday 26, 2020 10:00 AM"

          ></v-textarea>
       </div>
    </v-col>
  </v-row>
</div>
<!-- Notes area - End -->


   <v-row>
      <v-col cols="2" >
<!-- Pathways multi selection - Start -->
        <div v-intro="'Select your relevant Pathways. If no Pathway is selected, data for all the Pathways will be displayed in the Data table.'" v-intro-step="1">
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
<!-- Graph display - Start -->
        <div id="pathwayGraph" v-if="switch2">
        <template>
          <div >
            <v-card
              class="pa-2 bluebg"
              outlined
              tile
            >
            <PathwaysGraph :data="PathwaysGraphData" :options="PathwaysGraphOptions" ></PathwaysGraph>
          </v-card>
          </div>
          <br><br>
        </template>
        <v-row>
          <v-col
            v-for="testsetobj in testset"
            :key="testsetobj.agent"
            cols="12"
            sm="3"
          >
            <testLineGraph></testLineGraph>
          </v-col>
        </v-row>
       </div>
<!-- Graph display - End -->

<!-- Main Drug Table - Start -->
  <div v-intro="'Data table that displays Pathway/Drug attributes'" v-intro-step="5">
  <v-data-table
      :headers="computedHeaders"
      :items="filteredItems"
      class="elevation-0 bluebg customtable"
      hide-default-footer
       disable-pagination
      dense
      id="drugTable"
    >
<!-- Main Drug Table - Print headers - Start -->
    <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }" ref = "h.value">
            <template v-if="header.tt === ''" >
                    <span :key="h.text" >{{header.text}}</span>
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
            <div class="white grey--text-darken-4"><p>
                    <v-edit-dialog
                      :return-value.sync="props.item.icln"
                      large
                      persistent
                      @save="save"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                    <v-tooltip top color="amber lighten-4" >
                    <template v-slot:activator="{ on }">
                          <div v-on="on">{{ props.item.icln }}</div>
                    </template>
                    <div class="tooltip">
                       <span>{{ ttCLNrow }}</span>
                    </div>
                    </v-tooltip>

                      <template v-slot:input>
                        <div class="mt-4 title">Update Clonality</div>
                      </template>
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.icln"
                          :rules="[max25chars]"
                          label="Edit"
                          single-line
                          counter
                          autofocus
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
              </p></div>
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
            <div class="white grey--text-darken-4"><p>
                         <v-edit-dialog
                           :return-value.sync="props.item.itier"
                           large
                           persistent
                           @save="save"
                           @cancel="cancel"
                           @open="open"
                           @close="close"
                         >

                           <v-tooltip top color="amber lighten-4" >
                           <template v-slot:activator="{ on }">
                                 <div v-on="on">{{ props.item.itier }}</div>
                           </template>
                           <div class="tooltip">
                              <span>{{ ttTIERrow }}</span>
                           </div>
                           </v-tooltip>

                           <template v-slot:input>
                             <div class="mt-4 title">Update Variant Tier
                             </div>
                             <v-text-field
                               v-model="props.item.itier"
                               :rules="[max25chars]"
                               label="Edit"
                               single-line
                               counter
                               autofocus
                             ></v-text-field>
                           </template>
                         </v-edit-dialog>
                </p></div>
             </template>
             <template v-if="props.item.editable === 2">
               <div class="grey darken-3 white--text"><p>{{ props.item.itier }}</p>
               </div>
             </template>
          </template>
<!-- Main Drug Table - Configure iTIER column - End -->

<!-- Main Drug Table - Configure iTRL column - Start -->
          <template v-slot:item.itrl="props">
            <template v-if="props.item.editable != 2">
            <div class="white grey--text-darken-4"><p>
                  <v-edit-dialog
                    :return-value.sync="props.item.itrl"
                    large
                    persistent
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >

                  <v-tooltip top color="amber lighten-4" >
                  <template v-slot:activator="{ on }">
                        <div v-on="on">{{ props.item.itrl }}</div>
                  </template>
                  <div class="tooltip">
                     <span>{{ ttTRLrow }}</span>
                  </div>
                  </v-tooltip>

                    <template v-slot:input>
                      <div class="mt-4 title">Update Clinical Trial</div>
                    </template>
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.itrl"
                        :rules="[max25chars]"
                        label="Edit"
                        single-line
                        counter
                        autofocus
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
          </p></div>
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
    </v-col>
</v-row>
</v-container>
</template>

<script>

 import PathwaysGraph from '../components/PathwaysGraph.vue'
 import testLineGraph from '../components/testLineGraph.vue'

// top color="amber lighten-4 black--text"
import pptxgen from "pptxgenjs";
import printJS from 'print-js';




  export default {

    name: 'UserView',

    components: {
      PathwaysGraph,
      testLineGraph
    },

    mounted() {
      this.startIntro();
     },

    data: () => ({



      PathwaysGraphData: {

                datasets: [
                  {
                    label: 'Baseline',
                    backgroundColor: '#393B40',
                    pointBackgroundColor: '#393B40',
                    borderWidth: 1,
                    pointBorderColor: '#393B40',
                    data: []
                  },
                  {
                    label: 'Patient specific',
                    backgroundColor: '#ffffff',
                    borderColor: '#212121',
                    borderWidth: 2,
                    data: []
                  }
                ]
              },

              PathwaysGraphOptions: {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      reverse: true
                    },
                    pointLabels: {
                      display: true
                    },
                    gridLines: {
                      drawOnChartArea: false
                    }
                  }],

                  xAxes: [{
                    position: 'top',
                    type: 'category',
                    labels: [],
                    pointLabels: {
                      display: true
                    },
                    ticks: {
                      beginAtZero: true
                    },
                    gridLines: {
                      drawOnChartArea: false
                    }
                }]
              },
              legend: {
                display: true
              },

              tooltips: {
                callbacks: {
                  label(tooltipItem, data) {
                    // Get the dataset label.
                    const label = data.datasets[tooltipItem.datasetIndex].label;
                    // Format the y-axis value.
                    const value = tooltipItem.yLabel;
                    return `${label}: ${value}`;
                  }
                }
              },

              responsive: true,
              maintainAspectRatio: false,
              height: 200,
            },

      pgTitle: 'CNS-TAP',

      ttCNSrow: '2 for primary CNS tumor x 5',
      ttBBBrow: '2 for primary BBB x 5',
      ttFDArow: '2 for primary FDA x 5',
      ttCLNrow: '2 for primary CLN x 5',
      ttTIERrow: '2 for primary TIER x 5',
      ttTRLrow: '2 for primary TRL x 5',

      switch1: false,
      switch2: false,
      switch3: false,


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
      { id:7, pathway: "HDAC", checked: false },
      { id:8, pathway: "INI1", checked: false },
      { id:9, pathway: "MEK", checked: false },
      { id:10, pathway: "PDGFR", checked: false },
      { id:11, pathway: "P13K/mTOR", checked: false },
      { id:12, pathway: "MET", checked: false },
      { id:13, pathway: "CHK1", checked: false },
      { id:14, pathway: "MET/VEGF2", checked: false },
      { id:15, pathway: "GENERIC CYTOTOXIC", checked: false } ],



    headers: [
      {   text: 'Pathways', align: 'center', sortable: true, value: 'pathways', class: 'grey darken-3 white--text', tt: '' },
      {   width: '150px', text: 'Drug Agents', align: 'center', sortable: true, value: 'drugagents', class: 'grey darken-3 white--text', tt: ''  },
      {   text: 'Vitro', align: 'center', sortable: true, value: 'vitro', class: 'grey darken-3 white--text', tt: 'Tumor line preclinical data (in vitro)'  },
      {   text: 'Vivo', align: 'center', sortable: true, value: 'vivo', class: 'grey darken-3 white--text', tt: 'Tumor line preclinical data (in vivo)' },
      {   text: 'Safety', align: 'center', sortable: true, value: 'safety', class: 'grey darken-3 white--text', tt: 'Safety data' },
      {   text: 'CNS', align: 'center', sortable: true, value: 'cns', class: 'grey darken-3 white--text', tt: 'CNS' },
      {   text: 'BBB', align: 'center', sortable: true, value: 'bbb', class: 'grey darken-3 white--text', tt: 'BBB' },
      {   text: 'FDA', align: 'center', sortable: true, value: 'fda', class: 'grey darken-3 white--text', tt: 'FDA' },
      {   text: 'SubT', align: 'center', sortable: true, value: 'subt', class: 'grey darken-1 white--text', tt: '' },
      {   text: 'iCLN', align: 'center', sortable: true, value: 'icln', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'iCLN' },
      {   text: 'iTIER', align: 'center', sortable: true, value: 'itier', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'iTIER' },
      {   text: 'iTRL', align: 'center', sortable: true, value: 'itrl', class: 'blue-grey lighten-4 grey--text-darken-4', tt: 'iTRL' },
      {   text: 'CLN', align: 'center', sortable: true, value: 'cln', class: 'grey darken-3 white--text', tt: 'CLN' },
      {   text: 'TIER', align: 'center', sortable: true, value: 'tier', class: 'grey darken-3 white--text', tt: 'TIER' },
      {   text: 'TRL', align: 'center', sortable: true, value: 'trl', class: 'grey darken-3 white--text', tt: 'TRL' },
      {   text: 'Total', align: 'center', sortable: true, value: 'total', class: 'grey darken-1 white--text', tt: '' }, ],

    drugs: [
    { pathways: "", drugagents: "", vitro: "", vivo: "", safety: "", cns: "", bbb: "", fda: "", subt:"", icln: "INPUT", itier: "PATIENT", itrl: "DATA", cln: "", tier: "", trl: "", total: "", editable: 2, },
    { pathways: "AKT", drugagents: "MK2206", vitro: 4, vivo: 6, safety: 6, cns: 0, bbb: 0, fda: 0, subt:16, icln: 0, itier: 5, itrl: 10, cln: 0, tier: 5, trl: 10, total: 31, editable: 1, },
    { pathways: "AKT", drugagents: "Perfinosine", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 0, fda: 0, subt:8, icln: 2, itier: 0, itrl: 0,  cln: 2, tier: 0, trl: 0, total: 10, editable: 0, },
    { pathways: "ALK", drugagents: "Ceritinib", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 10, fda: 10, subt:28, icln: 2, itier: 0, itrl: 10,  cln: 2, tier: 0, trl: 10, total: 40, editable: 1, },
    { pathways: "ALK", drugagents: "Alectinib", vitro: 2, vivo: 6, safety: 3, cns: 5, bbb: 10, fda: 0, subt:26, icln: 0, itier: 0, itrl: 10,  cln: 0, tier: 0, trl: 10, total: 36, editable: 0, },
    { pathways: "ALK", drugagents: "Enrectinib", vitro: 4, vivo: 0, safety: 3, cns: 10, bbb: 10, fda: 0, subt:27, icln: 4, itier: 0, itrl: 0,  cln: 4, tier: 0, trl: 0, total: 31, editable: 0, },
    { pathways: "BRAF", drugagents: "Enrectinib", vitro: 4, vivo: 0, safety: 3, cns: 10, bbb: 10, fda: 0, subt:27, icln: 0, itier: 5, itrl: 20,  cln: 0, tier: 5, trl: 20, total: 52, editable: 1, } ],

    testset: [
      {agent:"MK2006",values:{baseline:20, ptsepcific:40}},
      {agent:"Perfinosine",values:{baseline:30, ptsepcific:45}},
      {agent:"Ceritinib",values:{baseline:25, ptsepcific:35}},
      {agent:"Enrectinib",values:{baseline:25, ptsepcific:35}},

    ]

    }),
    computed: {

      filteredItems() {
        var p;
       this.resetGraphData();
        return this.drugs.filter((i) => {
        if (!this.pathwayselection || this.pathwayselection.length == 0) {
            if (i.pathways.trim() != "") {
                this.addGraphData (i.pathways.trim(),i.subt,i.total,'10',i.drugagents.trim());
                return true;
            } else if (this.switch3) {
              this.addGraphData (i.pathways.trim(),i.subt,i.total,'10',i.drugagents.trim());
              return true;
            }
        }
        if (this.pathwayselection.length > 0) {
            for (p = 0; p < this.pathwayselection.length; p++) {
                if (i.pathways.trim() === "" || this.pathways[this.pathwayselection[p]].pathway.trim() == i.pathways.trim()) {
                  if (i.pathways.trim() != "") {
                      this.addGraphData (i.pathways.trim(),i.subt,i.total,'10',i.drugagents.trim());
                      return true;
                  } else if (this.switch3) {
                    this.addGraphData (i.pathways.trim(),i.subt,i.total,'10',i.drugagents.trim());
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
         switch1_click:function(){this.$router.push("/UserView")   },
         switch2_click:function(){this.$router.push("/UserView")  },
         switch3_click:function(){this.$router.push("/UserView")  },
         max25chars: v => v.length <= 25 || 'Input too long!',

         startIntro() {
           if(confirm("Do you want an introduction to CNS-Tap website?")){
             const introJS = require("intro.js");
             introJS.introJs().start();
           }
         },

         addGraphData (pPathway,pSubt,pTotal,pRadius,pDrug) {
           if (pPathway != "") {
                  this.PathwaysGraphOptions.scales.xAxes[0].labels.push(pPathway + ' (' + pDrug + ')');
                  this.PathwaysGraphOptions.scales.xAxes[0].labels.push(pPathway + 'P (' + pDrug + ')');
                  this.PathwaysGraphData.datasets[0].data.push({ x: pPathway + ' (' + pDrug + ')', y: pSubt, r: pRadius, name: pDrug });
                  this.PathwaysGraphData.datasets[1].data.push({ x: pPathway + 'P (' + pDrug + ')', y: pTotal, r: pRadius, name: pDrug });
           }
         },
         resetGraphData(){
            this.PathwaysGraphData.datasets[0].data.splice(0,this.PathwaysGraphData.datasets[0].data.length);
            this.PathwaysGraphData.datasets[1].data.splice(0,this.PathwaysGraphData.datasets[1].data.length);
            this.PathwaysGraphOptions.scales.xAxes[0].labels.splice(0,this.PathwaysGraphOptions.scales.xAxes[0].labels.length);
            this.PathwaysGraphOptions.scales.xAxes[0].labels.push('');
            this.PathwaysGraphData.datasets[0].data.push({ x: '', y: '0', r: '0', name: '' });
            this.PathwaysGraphData.datasets[1].data.push({ x: '', y: '0', r: '0', name: '' });
        },
        // Example Code for styling the column - Start
        getStyle (column, dat) {
            // alert(dat);
            if (dat.trim() != "y") {
                switch(column){
                  case 'subt':
                    return 'blue-grey lighten-4 grey--text-darken-4';
                  case 'total':
                      return 'blue-grey lighten-4 grey--text-darken-4';
                  case 'icln':
                      return 'white grey--text-darken-4';
                  case 'itier':
                          return 'white grey--text-darken-4';
                  case 'itrl':
                          return 'white grey--text-darken-4';
                  default:
                          return '';
                }
            } else if (dat.trim() === "y") {
              switch(column){
                case 'icln':
                      return 'grey darken-3 white--text';
                case 'itier':
                      return 'grey darken-3 white--text';
                case 'itrl':
                      return 'grey darken-3 white--text';
                default:
                        return '';
                }
            }


        },
        getPos(name) {
             const left = this.$refs.name.getBoundingClientRect().left
             const top = this.$refs.name.getBoundingClientRect().top
             console.log(name+ ": Left - "+ left+"  Top - "+top)
        },
        // Example Code for styling the column - End

        printPDF () {
         // printJS({printable:'cnstap.pdf', type:'pdf', showModal:true});
         //  let pdfd = new printJS();
         //  printJS("drugTable",'html');
           printJS({printable:['drugTable'],type:'html',header: 'CNS-TAP'});
          // printJS("drugGraph",'html');

        },

        printPPT () {
         // alert("Print table");

          // 1. Create a new Presentation
           let pres = new pptxgen();

           // 2. Add a Slide
           let slideBanner = pres.addSlide();

           // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
           let textboxText = "CNS-TAP";
           let textboxOpts = { x: 1, y: 2, color: "363636", fill: "f1f1f1", align: pres.AlignH.center };
           slideBanner.addText(textboxText, textboxOpts);

           let slideNotes = pres.addSlide();
           let textboxText1 = "Notes";
           let textboxOpts1 = { x: 1, y: 1, color: "363636", fill: "f1f1f1", align: pres.AlignH.center };
           slideNotes.addText(textboxText1, textboxOpts1);
           slideNotes.addText("Friday 26, 2020 10:00 AM",{ x: 1, y: 1.5, w: 3, align: pres.AlignH.left, color: "363636", fontSize: 18 });
           slideNotes.addText("Notes: " + this.customNotes,{ x: 1, y: 2, align: pres.AlignH.left, color: "363636", fontSize: 12 });

           pres.tableToSlides("drugTable");

           // Pass table element ID to tableToSlides function to produce 1-N slides
           // pres.tableToSlides("drugTable", {
           //  addText: { text: "Drugs Table", options: { x: 1, y: 0.5, color: "0088CC" } }
           // });

       //    pres.addChart(pres.ChartType.line,this.PathwaysGraphData,this.PathwaysGraphOptions);

           // 4. Save the Presentation
           pres.writeFile("CNSTAP.pptx");

        },



    },
//    watch: {
//           PathwaysGraphData: function () {
//              alert('change');
          //     this.answer = 'Waiting for you to stop typing...'
          //     this.debouncedGetAnswer()
//           }
//    }
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
    }
td p {
  margin: 0;
  padding:10px;
}



</style>
