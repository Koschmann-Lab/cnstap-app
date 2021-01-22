<template>
  <div id="chartcontainer"  >
    <span></span>

    <line-graph
      :height="300"
      v-if="loaded"
      :chartdata="chartComputedData"
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
  props: ['rawpathway','rawdata','rawbaseline','rawptspecific','rawradius','rawcolorpathway'],
  data: () => ({
    backgroundColor: '#F5DEB3',
    loaded: true,
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
            //           drawBorder: false,
            //           showBorder: false,
            //           display:false,
                       drawOnChartArea: false,
                       drawTicks: true,

                     },
            //         padding: 0,
                     ticks: {
                          display: true,
                          padding: 10,
                          autoSkip: true,
                          maxRotation: 90,
                          minRotation: 40,
                          callback:function(label){
                            var drug = label.split(";")[0];
                            return drug;
                          }
                      }
                 },

                 {
                   id: 'xAxis2',
                   gridLines: {
                      drawOnChartArea: true, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                         display: true,
                         padding: 10,
                         autoSkip: true,
                         maxRotation: 90,
                         minRotation: 40,
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
                   scaleLabel: {
                      display: true,
                      labelString: 'CNS-TAP Score'
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
  },
  computed: {

    chartComputedData: function(){

      let obj = {
        labels: ['','MK2006',''],
        datasets: [
          {
            label: 'BaseLine',
        //    borderColor: '#666',
            borderColor: this.rawcolorpathway,
            data: [null,20,null],
        //    backgroundColor:'#000',
            backgroundColor: this.rawcolorpathway,
            fill:false,
            pointRadius: 10,
            pointHoverRadius: 10,
            showLine: false,
            borderWidth: 1,
            xAxisID:'xAxis1',
          },
          {
            label: 'Patient Specific',
      //      borderColor: '#666',
            borderColor: this.rawcolorpathway,
            data: [null,40,null],
            backgroundColor:'#fff',
            fill:false,
            pointRadius: 10,
            pointHoverRadius: 10,
            showLine: false,
            borderWidth: 1,

          }
        ]
      }


      obj.labels.splice(0)
      obj.datasets[0].data.splice(0)
      obj.datasets[1].data.splice(0)

      obj.datasets[0].pointRadius = this.rawradius
      obj.datasets[1].pointRadius = this.rawradius


        for (var p = 0; p < this.rawdata.length; p++){
              if (this.rawdata[p] != null) {
                  obj.labels.push(this.rawdata[p])
              } else {
                 obj.labels.push("")
              }

              obj.datasets[0].data.push(this.rawbaseline[p])
              obj.datasets[1].data.push(this.rawptspecific[p])
        }
      return obj
    }
  }
}
</script>
<style scoped>
#chartcontainer {
  border: solid 1px #333;
}
</style>
