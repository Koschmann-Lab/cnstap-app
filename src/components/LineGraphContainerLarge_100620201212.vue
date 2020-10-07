<template>
  <div id="chartcontainer"  >
    <span>{{rawpathway}}</span>

    <line-graph
      :height="350"
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
          borderWidth: 1

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
          borderWidth: 1
        }


      ]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
  //    height: 200,
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
                 xAxes: [{
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
              //         precision: 1,
              //         showLabelBackdrop: true
              //         lineHeight: 2,
                      padding: 0,
              //         z: 0.5,

                         }



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

//  this.options.scales.xAxes.labels.splice(0)

    for (var p = 0; p < this.rawdata.length; p++){
      if (this.rawdata[p] != null) {
          this.chartdata.labels.push(this.rawdata[p])
      } else {
         this.chartdata.labels.push("")

      }

      this.chartdata.datasets[0].data.push(this.rawbaseline[p])
      this.chartdata.datasets[1].data.push(this.rawptspecific[p])

  //    this.options.scales.xAxes.labels.push(this.rawdata[p])

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
