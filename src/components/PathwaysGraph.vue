
<script>

// Load complete module with all charts
import VueCharts from 'vue-chartjs'

export default {
  extends: VueCharts.Bubble,
  mixins: [VueCharts.mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}


</script>

<style>

</style>
