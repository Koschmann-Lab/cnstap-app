<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      type: Object,
      default: null
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
