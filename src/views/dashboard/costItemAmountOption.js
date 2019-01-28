const amountOption = {
  title: {
    textStyle: {
      color: '#444',
      fontSize: 16
    },
    x: 'center'
  },
  color: ['#f56c6c', '#439bd8', '#31c3e9', '#5ae4e3', '#91eeb8', '#fae35e', '#f56c6c'],
  grid: {
    left: 90
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    data: []
  },
  series: {
    data: [],
    type: 'bar',
    label: {
      show: true,
      textBorderColor: '#333',
      textBorderWidth: 2,
      formatter (val) {
        if (val.value === 0) {
          return ''
        }
        return `${val.value}元`
      }
    }
  }
}

export default amountOption
