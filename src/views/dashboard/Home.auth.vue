<style lang="less" scoped>
  .page__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
  }
</style>

<template>
  <div class="page__wrapper">

  </div>
</template>

<script>
// import echarts from 'echarts'

const BASEURL = {
  dashboard: '/api/biz/dashboard'
}
export default {
  data () {
    return {
      statisticData: {}
    }
  },
  computed: {

  },
  methods: {},
  mounted () {
    this.$axios.get(BASEURL.dashboard).then(resp => {
      let respData = resp.data
      this.statisticData = respData
    })
  }
}
</script>
