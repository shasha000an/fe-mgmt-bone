<style lang="less" scoped>
  .page__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    .page__section {
      height: 49.5%;
      .el-col {
        .statistic {
          position: relative;
          height: 100%;
          border-radius: 4px;
          border: 1px solid #ebeef5;
          background-color: #fff;
          color: #303133;
          transition: 0.3s;

          &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          }

          .info--data {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            .info--item {
              border-radius: 4px;
              height: 32.5%;
              border: 1px solid #ebeef5;
              background-color: #fff;

              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;

              &.unticket--10 {
                color: rgb(100, 213, 114);
              }
              &.unreceive--10 {
                color: rgb(255, 213, 114);
              }
              &.unpaid--10 {
                color: rgb(242, 94, 67);
              }
            }

            .amount {
              font-size: 24px;
            }
            .tips {
              color: #c8c8c8;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="page__wrapper">
    <el-row type="flex" :gutter="5" class="page__section">
      <el-col :span="4">
        <div class="statistic" style="border: none">
          <div class="info--data">
            <div class="info--item unticket--10">
              <div class="amount">{{statisticData.unTicketCount}}</div>
              <div class="tips">{{$t('dashboard.unTicketCount')}}</div>
            </div>
            <div class="info--item unreceive--10">
              <div class="amount">{{statisticData.unReceivableCount}}</div>
              <div class="tips">{{$t('dashboard.unReceivableCount')}}</div>
            </div>
            <div class="info--item unpaid--10">
              <div class="amount">{{statisticData.noPaidCount}}</div>
              <div class="tips">{{$t('dashboard.noPaidCount')}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic todo--list">
          <div style="height: 10%; color: '#444'; font-size: 16px; text-align: center; padding-top: 4px; font-weight: bold;">
            待办任务
          </div>
          <i class="el-icon-more" style="position: absolute; right: 6px; top: 4px; cursor: pointer;" title="办理" @click="handleShowMore"></i>
          <div style="height: 90%">
            <simple-table :table-column="tableColumn" :show-header="false" :table-data="tableData" :pageable="false"> </simple-table>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="statistic" id="statistic__prepay--ticket"></div>
      </el-col>
      <el-col :span="6">
        <div class="statistic" id="statistic__prepay--amount"></div>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="5" class="page__section">
      <el-col :span="6">
        <div class="statistic" id="statistic_costitem--income"></div>
      </el-col>
      <el-col :span="6">
        <div class="statistic" id="statistic_costitem--incomeA"></div>
      </el-col>
      <el-col :span="6">
        <div class="statistic" id="statistic_costitem--cost"></div>
      </el-col>
      <el-col :span="6">
        <div class="statistic" id="statistic_costitem--costA"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'

import prepayTicketOption from './prepayTicketOption'
import prepayAmountOption from './prepayAmountOption'
import costItemTicketOption from './costItemTicketOption'
import amountOption from './costItemAmountOption'

const BASEURL = {
  dashboard: '/api/biz/dashboard',
  backlog: '/api/biz/dashboard/backlog'
}
export default {
  data () {
    return {
      statisticData: {},
      tableData: []
    }
  },
  computed: {
    tableColumn () {
      return [
        { prop: 'voucherNo', label: this.$t('dashboard.voucherNo'), width: 100 },
        { prop: 'projectName', label: this.$t('dashboard.projectName'), width: 120 },
        { prop: 'NAME', label: this.$t('dashboard.NAME'), width: 200 },
        { prop: 'userName', label: this.$t('dashboard.userName'), width: 80 }
      ]
    }
  },
  methods: {
    handleShowMore () {
      this.$router.push({
        name: 'voucher-management'
      })
    }
  },
  mounted () {
    let prepayTicketChart = echarts.init(document.querySelector('#statistic__prepay--ticket'))
    prepayTicketChart.setOption(prepayTicketOption)

    let prepayAmountChart = echarts.init(document.querySelector('#statistic__prepay--amount'))
    prepayAmountChart.setOption(prepayAmountOption)

    let incomeTicketChart = echarts.init(document.querySelector('#statistic_costitem--income'))
    incomeTicketChart.setOption(costItemTicketOption)

    let incomeAmountChart = echarts.init(document.querySelector('#statistic_costitem--incomeA'))
    incomeAmountChart.setOption(amountOption)

    let costTicketChart = echarts.init(document.querySelector('#statistic_costitem--cost'))
    costTicketChart.setOption(costItemTicketOption)

    let costAmountChart = echarts.init(document.querySelector('#statistic_costitem--costA'))
    costAmountChart.setOption(amountOption)

    this.$axios.get(BASEURL.dashboard, { params: { countDays: '10' } }).then(resp => {
      let respData = resp.data
      this.statisticData = respData

      prepayTicketChart.setOption({
        legend: { data: respData.countAdvanceNumber.map(item => item.name) },
        series: { data: respData.countAdvanceNumber }
      })

      prepayAmountChart.setOption({
        legend: { data: respData.countAdvanceAmount.map(item => item.name) },
        series: { data: respData.countAdvanceAmount }
      })

      incomeTicketChart.setOption({
        title: { text: this.$t('dashboard.incomeTicket') },
        legend: { data: respData.countNumber0.map(item => item.name) },
        series: { data: respData.countNumber0 }
      })

      incomeAmountChart.setOption({
        title: { text: this.$t('dashboard.incomeAmount') },
        yAxis: { data: respData.countAmount0.map(item => item.name) },
        series: { data: respData.countAmount0.map(item => item.value) }
      })

      costTicketChart.setOption({
        title: { text: this.$t('dashboard.costTicket') },
        legend: { data: respData.countNumber1.map(item => item.name) },
        series: { data: respData.countNumber1 }
      })

      costAmountChart.setOption({
        title: { text: this.$t('dashboard.costAmount') },
        yAxis: { data: respData.countAmount1.map(item => item.name) },
        series: { data: respData.countAmount1.map(item => item.value) }
      })
    })

    let loadingFlag = this.$loading({ fullscreen: false, target: document.querySelector('.todo--list'), text: this.$t('tip.systemLoading') })
    this.$axios
      .get(BASEURL.backlog)
      .then(resp => {
        let respData = resp.data
        this.tableData = respData
      })
      .finally(() => {
        loadingFlag.close()
      })
  }
}
</script>
