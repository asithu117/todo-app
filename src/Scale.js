function Scale(callback) {
  let data = {
    weight: 0,
    unit: '',
    status: '',
  }
  setInterval(() => {
    data = {
      unit: 'kg',
      status: 'ST',
      weight: Math.round(Math.random() * 1000),
    }
    console.log('weight read from scale', data)
    callback(data)
  }, 1000)
}
module.exports = Scale
