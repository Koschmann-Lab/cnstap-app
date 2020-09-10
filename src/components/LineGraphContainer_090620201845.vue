<template>
  <div id="chartcontainer"  >
    <span>{{rawdata.agent}}</span>
    <line-graph
      :height="250"
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"
      />
    </div>
</template>
<script>
import LineGraph from './LineGraph.vue'
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { wordWrap, formatYears, resolveColor} from './helper.js'
export default {
  name: 'LineGraphContainer',
  components: { LineGraph },
  props: ['rawdata'],
  data: () => ({
    backgroundColor: '#F5DEB3',
    loaded: true,
    chartdata:{
      labels: ['','BaseLine','Patient Specific',''],
      datasets: [
        {
          label: 'MK2006',
          borderColor: '#666',
          data: [null,20,40,null],
          backgroundColor:['#000','#000','#fff','#fff'],
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

      layout: {
              },

      legend: {
        display: false
      },
      scales: {
                 xAxes: [{
                     display: false,
                     drawBorder: false,
                     showBorder: false,

                 }],
                 yAxes: [{
                   display: true,
                   gridLines: {
                     drawBorder: false,
                     showBorder: false,
                     display:false
                   },
                   ticks: {
                       suggestedMin: 0,
                       suggestedMax: 100
                   }
                 }]
             }

    },
















  }),
  created: function(){
    console.log(this.rawdata)
    this.chartdata.datasets[0].label = this.rawdata.agent
    this.chartdata.datasets[0].data[1] = this.rawdata.values.baseline
    this.chartdata.datasets[0].data[2] = this.rawdata.values.ptsepcific
  },
  computed: {

  }
}
</script>
<style scoped>
#chartcontainer {
  border: solid 3px #333;
}
</style>
