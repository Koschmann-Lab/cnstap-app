<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
  computed:{
    ptSpecificData: function(){
      return this.chartdata.datasets[1].data
    }
  },
  watch: {
    ptSpecificData: function(){
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>
