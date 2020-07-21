<template>
  <v-container>

<v-row class="justify-center align-center">
   <v-col cols="3">
       <h1 class="display-3 font-weight-bold grey--text text--darken-2">
        CNS-TAP
      </h1>
   </v-col>
   <v-col cols="9" class="font-weight-bold grey--text text--darken-2 text-right">

      <v-simple-table>
      <tbody><tr><td class="lightbluecenter">
          <v-switch v-model="switch1" inset :label="`Note Space`"></v-switch>
      </td><td class="lightbluecenter">
          <v-switch v-model="switch2" inset :label="`Pathway Graphs`"></v-switch>
        </td><td class="lightbluecenter">
          <v-switch v-model="switch3" inset :label="`Patient Data Columns`"></v-switch>
      </td>
      </tr></tbody>
      </v-simple-table>
   </v-col>
</v-row>



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


   <v-row>
      <v-col cols="2" >
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
      </v-col>

      <v-col cols="10" >

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

       </div>


<div>

  <v-data-table
      :headers="computedHeaders"
      :items="filteredItems"
      class="elevation-0 bluebg customtable"
      hide-default-footer
      hide-actions
      disable-pagination
      dense
    >

    <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }">
      <template v-if="header.tt === ''">
              <span :key="h.text">{{header.text}}</span>
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

        <!-- Example Code for styling the column - Start -->
        <template v-slot:item.subt="{ item }">
          <div :class="getStyle('subt')">{{ item.subt }}</div>
        </template>
        <!-- Example Code for styling the column - End -->

        <template v-slot:item.cln="props" class="grey darken-2 white--text">
          <template v-if="props.item.editable === 0">
            <v-tooltip top color="amber lighten-4" >
              <template v-slot:activator="{ on }">
                  <div v-on="on" class="grey darken-2 white--text">{{ props.item.cln }}</div>
                </template>
                  <div class="tooltip">
                    <span>{{ ttCLNrow }}</span>
                  </div>
            </v-tooltip>
          </template>
          <template v-else>
              <v-edit-dialog
                :return-value.sync="props.item.cln"
                large
                persistent
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
              <v-tooltip top color="amber lighten-4" >
              <template v-slot:activator="{ on }">
                    <div v-on="on" >{{ props.item.cln }}</div>
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
                    v-model="props.item.cln"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                    autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
          </template>
        </template>

        <template v-slot:item.tier="props">
          <template v-if="props.item.editable === 0">
            <v-tooltip top color="amber lighten-4" >
            <template v-slot:activator="{ on }">
                  <div v-on="on" class="grey darken-2 white--text">{{ props.item.tier }}</div>
            </template>
            <div class="tooltip">
               <span>{{ ttTIERrow }}</span>
            </div>
            </v-tooltip>
          </template>
          <template v-else>
               <v-edit-dialog
                 :return-value.sync="props.item.tier"
                 large
                 persistent
                 @save="save"
                 @cancel="cancel"
                 @open="open"
                 @close="close"
               >

                 <v-tooltip top color="amber lighten-4" >
                 <template v-slot:activator="{ on }">
                       <div v-on="on">{{ props.item.tier }}</div>
                 </template>
                 <div class="tooltip">
                    <span>{{ ttTIERrow }}</span>
                 </div>
                 </v-tooltip>

                 <template v-slot:input>
                   <div class="mt-4 title">Update Variant Tier
                   </div>
                   <v-text-field
                     v-model="props.item.tier"
                     :rules="[max25chars]"
                     label="Edit"
                     single-line
                     counter
                     autofocus
                   ></v-text-field>
                 </template>
               </v-edit-dialog>
             </template>
          </template>

            <template v-slot:item.trl="props">
              <template v-if="props.item.editable === 0">
                <v-tooltip top color="amber lighten-4" >
                <template v-slot:activator="{ on }">
                      <div v-on="on" class="grey darken-2 white--text">{{ props.item.trl }}</div>
                </template>
                <div class="tooltip">
                   <span>{{ ttTRLrow }}</span>
                </div>
                </v-tooltip>
              </template>
              <template v-else>
                   <v-edit-dialog
                     :return-value.sync="props.item.trl"
                     large
                     persistent
                     @save="save"
                     @cancel="cancel"
                     @open="open"
                     @close="close"
                   >

                     <v-tooltip top color="amber lighten-4" >
                     <template v-slot:activator="{ on }">
                           <div v-on="on">{{ props.item.trl }}</div>
                     </template>
                     <div class="tooltip">
                        <span>{{ ttTRLrow }}</span>
                     </div>
                     </v-tooltip>

                     <template v-slot:input>
                       <div class="mt-4 title">Update Clinical Trial
                       </div>
                       <v-text-field
                         v-model="props.item.trl"
                         :rules="[max25chars]"
                         label="Edit"
                         single-line
                         counter
                         autofocus
                       ></v-text-field>
                     </template>
                   </v-edit-dialog>
              </template>
            </template>

  </v-data-table>
</div>

      </v-col>


</v-row>


  </v-container>
</template>

<script>

 import PathwaysGraph from '../components/PathwaysGraph.vue'
// top color="amber lighten-4 black--text"

  export default {

    name: 'UserView',

    components: {
      PathwaysGraph
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

      pathwayselection: [],
      hiddenColumns: ['SubT','CLN','TIER','TRL'],

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
      {   text: 'SubT', align: 'center', sortable: true, value: 'subt', class: 'grey darken-2 white--text', tt: '' },
      {   text: 'CLN', align: 'center', sortable: true, value: 'cln', class: 'lightbg', tt: 'CLN' },
      {   text: 'TIER', align: 'center', sortable: true, value: 'tier', class: 'lightbg', tt: 'TIER' },
      {   text: 'TRL', align: 'center', sortable: true, value: 'trl', class: 'lightbg', tt: 'TRL' },
      {   text: 'Total', align: 'center', sortable: true, value: 'total', class: 'grey darken-2 white--text', tt: '' }, ],

    drugs: [
    { pathways: "AKT", drugagents: "MK2206", vitro: 4, vivo: 6, safety: 6, cns: 0, bbb: 0, fda: 0, subt:16, cln: 0, tier: 5, trl: 10, total: 31, editable: 1, },
    { pathways: "AKT", drugagents: "Perfinosine", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 0, fda: 0, subt:8, cln: 2, tier: 0, trl: 0, total: 10, editable: 0, },
    { pathways: "ALK", drugagents: "Ceritinib", vitro: 2, vivo: 0, safety: 6, cns: 0, bbb: 10, fda: 10, subt:28, cln: 2, tier: 0, trl: 10, total: 40, editable: 1, },
    { pathways: "ALK", drugagents: "Alectinib", vitro: 2, vivo: 6, safety: 3, cns: 5, bbb: 10, fda: 0, subt:26, cln: 0, tier: 0, trl: 10, total: 36, editable: 0, },
    { pathways: "ALK", drugagents: "Enrectinib", vitro: 4, vivo: 0, safety: 3, cns: 10, bbb: 10, fda: 0, subt:27, cln: 4, tier: 0, trl: 0, total: 31, editable: 0, },
    { pathways: "BRAF", drugagents: "Enrectinib", vitro: 4, vivo: 0, safety: 3, cns: 10, bbb: 10, fda: 0, subt:27, cln: 0, tier: 5, trl: 20, total: 52, editable: 1, } ]

    }),
    computed: {

      filteredItems() {
        var p;
       this.resetGraphData();
        return this.drugs.filter((i) => {
        if (!this.pathwayselection || this.pathwayselection.length == 0) {
                this.addGraphData (i.pathways.trim(),i.subt,i.total,'10',i.drugagents.trim());
 //                this.PathwaysGraph.renderChart(this.data, this.options);
              return true;
        }
        if (this.pathwayselection.length > 0) {
            for (p = 0; p < this.pathwayselection.length; p++) {
                if (this.pathways[this.pathwayselection[p]].pathway.trim() == i.pathways.trim()) {
                  this.addGraphData (i.pathways.trim(),i.subt,i.total,'10',i.drugagents.trim());
 //                 this.PathwaysGraph.renderChart(this.PathwaysGraphData, this.PathwaysGraphOptions);
                  return true;
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
      }
    },

    methods:{
         switch1_click:function(){this.$router.push("/UserView")   },
         switch2_click:function(){this.$router.push("/UserView")  },
         switch3_click:function(){this.$router.push("/UserView")  },

         addGraphData (pPathway,pSubt,pTotal,pRadius,pDrug) {

            this.PathwaysGraphOptions.scales.xAxes[0].labels.push(pPathway + ' (' + pDrug + ')');
            this.PathwaysGraphOptions.scales.xAxes[0].labels.push(pPathway + 'P (' + pDrug + ')');
            this.PathwaysGraphData.datasets[0].data.push({ x: pPathway + ' (' + pDrug + ')', y: pSubt, r: pRadius, name: pDrug });
            this.PathwaysGraphData.datasets[1].data.push({ x: pPathway + 'P (' + pDrug + ')', y: pTotal, r: pRadius, name: pDrug });

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
        getStyle (column) {
          switch(column){
            case 'subt':
              return 'grey darken-1 white--text';
            default:
              return '';
          }
        },
        // Example Code for styling the column - End

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

</style>
