const costItemTicketOption = {
  title: {
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
    top: 'center',
    left: 0,
    orient: 'vertical',
    data: []
  },
  series: {
    type: 'pie',
    radius: '55%',
    center: ['65%', '50%'],
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

export default costItemTicketOption
