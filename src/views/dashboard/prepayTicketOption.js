const prepayTicketOption = {
  title: {
    text: `预付款未结票数`,
    textStyle: {
      color: '#444',
      fontSize: 16
    },
    x: 'center'
  },
  color: ['#439bd8', '#31c3e9', '#5ae4e3', '#91eeb8', '#fae35e', '#f56c6c'],
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}票'
  },
  legend: {
    top: 20,
    left: 'left',
    data: [],
    formatter (val) {
      if (val.length > 8) {
        return val.substr(0, 8) + '...'
      } else {
        return val
      }
    },
    tooltip: {
      show: true
    }
  },
  series: {
    type: 'pie',
    radius: '55%',
    center: ['50%', '65%'],
    data: [],
    label: {
      show: false
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }
}

export default prepayTicketOption
