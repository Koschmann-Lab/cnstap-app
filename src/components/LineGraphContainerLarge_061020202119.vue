<template>
  <div id="chartcontainer"  >
    <span></span>

    <line-graph
      :height="250"
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"
      />
    </div>
</template>
<script>


import LineGraph from './LineGraphLarge.vue'
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { wordWrap, formatYears, resolveColor} from './helper.js'
export default {
  name: 'LineGraphContainerLarge',
  components: { LineGraph },
  props: ['rawpathway','rawdata','rawbaseline','rawptspecific'],
  data: () => ({
    backgroundColor: '#F5DEB3',
    loaded: true,
    chartdata:{
      labels: ['','MK2006',''],

      datasets: [
        {
          label: 'BaseLine',
          borderColor: '#666',
          data: [null,20,null],
          backgroundColor:'#000',
          fill:false,
          pointRadius: 10,
          pointHoverRadius: 10,
          showLine: false,
          borderWidth: 1,
          xAxisID:'xAxis1',
        },
        {
          label: 'Patient Specific',
          borderColor: '#666',
          data: [null,40,null],
          backgroundColor:'#fff',
          fill:false,
          pointRadius: 10,
          pointHoverRadius: 10,
          showLine: false,
          borderWidth: 1,

        }

      ]
    },

    options:{
      responsive: true,
      maintainAspectRatio: true,

      layout: {
                  padding: {
                      left: 0,
                      right: 0,
                      top: 50,
                      bottom: 50
                  }
              },

      legend: {
        display: false
      },

      scales: {
                 xAxes: [
                   {
                     id: 'xAxis1',

                     display: true,
                     drawBorder: false,
                     showBorder: false,

                     gridLines: {
                       drawBorder: false,
                       showBorder: false,
                       display:false
                     },
                     padding: 0,
                     ticks: {
                          padding: 0,
                          callback:function(label){
                            var drug = label.split(";")[0];
                            return drug;
                          }
                      }
                 },

                 {
                   id: 'xAxis2',
                   gridLines: {
                      drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                         padding: 0,
                         callback:function(label){
                           var pathway = label.split(";")[1];
                           return pathway;
                         }
                    },
                 }],

                 yAxes: [{
                     display: true,
                   gridLines: {
                     drawBorder: true,
                     showBorder: false,
                     display:true,
                   },
                   ticks: {
                       suggestedMin: 0,
                       suggestedMax: 100,
                       }
                   }]
             }

    },

  }),
  created: function(){
    console.log(this.rawdata)

  this.chartdata.labels.splice(0)
  this.chartdata.datasets[0].data.splice(0)
  this.chartdata.datasets[1].data.splice(0)


    for (var p = 0; p < this.rawdata.length; p++){
          if (this.rawdata[p] != null) {
              this.chartdata.labels.push(this.rawdata[p])
          } else {
             this.chartdata.labels.push("")
          }
          this.chartdata.datasets[0].data.push(this.rawbaseline[p])
          this.chartdata.datasets[1].data.push(this.rawptspecific[p])
    }

  },
  computed: {

  }
}
</script>
<style scoped>
#chartcontainer {
  border: solid 1px #333;
}
</style>
