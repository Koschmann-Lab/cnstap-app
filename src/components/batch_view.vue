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

        <div class="headline font-weight-bold grey--text text--darken-2">
          Batch Client
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
The Batch Client for the Central Nervous System Targeted Agent Prediction (CNS TAP) tool is used
for processing optimal targeted therapy for multiple neuro-oncology patients at the same time in batch mode.
The patients data are formatted in a Comma Separated Value (CSV) file format.
<br><br> The layout for this file is as follows:
<b>PatientID,Pathway,CLN,TIER</b>. Sample CSV file (cnstap-input.csv):


<v-btn
   class="ma-2"
   outlined
   href="cnstap-input.csv"
   target="_blank"
   download
   >
       Download Sample CSV file
</v-btn>


<br><br>Once the file is ready, you can upload the file below and run the program to
process the CSV file which will generate the results in a CSV file that can be downloaded.

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
                          <div class="mb-4" align="center">
<img src="../assets/cnstap-batch.png" style="width:400px;">

                          </div>
                          </v-card-text>
                          </v-card>
                          </template>
        </v-col>
  </v-row>


  <div v-if="!batchFile && processedCSVFile.length==0">
      <v-alert type="info">
        Please Upload your CSV file below for processing....
      </v-alert>
  </div>

  <div v-if="processedCSVFile.length>0">
      <v-alert type="info">
        File has been processed. Please Download the results file....
      </v-alert>
  </div>


    <div v-if="FileError">
        <v-alert type="error">
          Error processing the file. Please try again Or Upload another File...
        </v-alert>
    </div>


  <v-row class="text-center">

    <v-col class="mb-4" cols="2">

    </v-col>

      <v-col class="mb-4" cols="3" align="center">
        <template>
          <v-file-input
            accept=".csv"
            label="Click here to select a .csv file"
             show-size
             placeholder="Select your CSV file using above mentioned format"
             v-model="batchFile"
          ></v-file-input>
        </template>



      </v-col>


      <v-col class="mb-4" cols="3">
       <v-btn
            @click="process_batch"
            class="ma-2"
            :disabled="batchFile.length==0"
            >
      Run Batch
       <v-icon large right>mdi-file-cog-outline</v-icon>
       </v-btn>
      </v-col>

      <v-col class="mb-4" cols="3">

       <v-btn
          class="ma-2"
          :disabled="processedCSVFile.length==0"
          @click="download_csv"
          >
        Download
         <v-icon large right >mdi-file-download-outline</v-icon>
       </v-btn>
      </v-col>

          <v-col class="mb-4" cols="1">

          </v-col>

   </v-row>

<!-- v-row>
  <v-col cols="auto">
    <v-card width="600" height="300" raised>
      <v-card-title>File contents:</v-card-title>
      <v-card-text><p>{{ CSVFile }}</p></v-card-text>
    </v-card>
  </v-col>
</v-row -->




   <Footer></Footer>

  </v-container>
</template>

<script>

import Footer from '../components/Footer.vue'

import axios from "axios";


  export default {
    name: 'BatchView',

    components: {
      Footer
    },
    created:function(){

      if (window.location.protocol === 'http:' && !window.location.href.includes("localhost")) {
      window.location.href = window.location.href.replace("http","https");
      }


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
        self.drugs.forEach(function(e){
          let pathway = e.pathways
          let indexcheck = self.pathways.findIndex(function(p){
            return p.pathway == pathway
          })
          console.log(pathway, indexcheck)
          if(indexcheck==-1){
            let id = self.pathways.length
            let obj = {}
            obj.id=id+1
            obj.pathway=pathway
            obj.checked=false
            self.pathways.push(obj)
          }
        })
        self.pathways.sort(function(a,b){
          if (a.pathway > b.pathway) {
            return 1;
          }
          if (a.pathway < b.pathway) {
            return -1;
          }
          return 0;
        })
        console.log(self.pathways)
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


    data: () => ({

      FileError: false,
      batchFile: "",
      CSVFile: "",
      processedCSVFile: "",
      parsed: false,

     CSVFileJSON: [{PatientID: "",Pathway: "",CLN: "",TIER: ""}],
     InputLineItem: {PatientID: "",Pathway: "",CLN: "",TIER: ""},

      drugs: [],
      scrollInvoked: 0,

    pgTitle: 'CNS-TAP',
    pgSubTitle: 'Central Nervous System Targeted Agent Prediction Tool',

    }),

    methods:{


      process_batch:function() {

        var CLNmultiplier = 5;
        var TIERmultiplier = 3;


        if (!this.batchFile) {
          alert("Please Upload your CSV file below for processing....");
        }

        var reader = new FileReader();
        // Use the javascript reader object to load the contents
        // of the file in the v-model prop
        reader.readAsText(this.batchFile);
        reader.onload = () => {
          this.CSVFile = reader.result;
          this.load_csv_JSON();
          this.processedCSVFile = "PatientID,Pathway,Drug,Vitro,Vivo,PedsSafety,CNS,BBB,FDA,SubTotal,CLN,TIER,TOTAL\n";
                  for (var i=1; i < this.CSVFileJSON.length; i++) {
                    for (var d=0; d < this.drugs.length; d++) {
                        if (this.CSVFileJSON[i].Pathway.trim() == this.drugs[d].pathways.trim()) {
                            if (this.CSVFileJSON[i].CLN == ""){this.CSVFileJSON[i].CLN=0;}
                            if (this.CSVFileJSON[i].TIER == ""){this.CSVFileJSON[i].TIER=0;}
                            let iCLN = parseInt(this.CSVFileJSON[i].CLN) * CLNmultiplier;
                            let iTIER = parseInt(this.CSVFileJSON[i].TIER) * TIERmultiplier;
                            let iTotal = parseInt(this.drugs[d].total) + iCLN + iTIER;
                            this.processedCSVFile = this.processedCSVFile + this.CSVFileJSON[i].PatientID + ','+ this.drugs[d].pathways + ',' + this.drugs[d].drugagents + ',' + this.drugs[d].vitro + ',' + this.drugs[d].vivo + ',' + this.drugs[d].safety + ',' + this.drugs[d].cns + ',' + this.drugs[d].bbb + ',' + this.drugs[d].fda  + ',' + this.drugs[d].total + ',' + iCLN + ',' + iTIER + ',' + iTotal + '\n';
                        }
                    }
                  }
        }
        this.batchFile = "";
        this.CSVFile = "";

      },


      load_csv_JSON:function() {
        var iCtr = 0;
        var vElement = "";

        this.CSVFileJSON = [];
        for (var p = 0; p < this.CSVFile.length; p++) {

            switch (this.CSVFile[p]) {
            case '\n':
                    iCtr = 0;
                    this.InputLineItem.TIER = vElement;
                    vElement = "";
                    this.CSVFileJSON.push({...this.InputLineItem});
                    this.InputLineItem.PatientID = "";
                    this.InputLineItem.Pathway = "";
                    this.InputLineItem.CLN = "";
                    this.InputLineItem.TIER = "";
                    break;
            case ',':
                   iCtr = iCtr + 1;
                   switch (iCtr) {
                     case 1:
                         this.InputLineItem.PatientID = vElement;
                         vElement = "";
                         break;
                     case 2:
                         this.InputLineItem.Pathway = vElement;
                         vElement = "";
                         break;
                     case 3:
                         this.InputLineItem.CLN = vElement;
                         vElement = "";
                         break;
                   }
                   break;
             default:
                   vElement = vElement + this.CSVFile[p];
                   break;
          }

        }

      },

      download_csv:function() {

        try {
          //   const data = JSON.stringify(this.processedCSVFile)
             const data = this.processedCSVFile
             const blob = new Blob([data], {type: 'text/plain'})
             const e = document.createEvent('MouseEvents'),
             a = document.createElement('a');
             a.download = "cnstap-output.csv";
             a.href = window.URL.createObjectURL(blob);
             a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
             e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
             a.dispatchEvent(e);
        }
        catch(e) {
            this.FileError = true;
        }

        this.processedCSVFile = "";
        this.CSVFile = "";
        this.batchFile = "";
      },



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
