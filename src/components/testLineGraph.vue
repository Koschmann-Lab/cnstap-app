<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['','BaseLine','Patient Specific',''],
      datasets: [
        {
          label: 'MK2006',
          borderColor: '#666',
          data: [null,20,40,null],
          backgroundColor:['#000','#000','#fff','#fff'],
          fill:false,
          pointRadius: 10,
          pointHoverRadius: 10
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
            xAxes: [{
                display: false //this will remove all the x-axis grid lines
            }],
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }]
        },

    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
