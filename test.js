const calculate = require('./index')

test ('Calculator', () => {
  const expression = '1.8 * (2 + 300 / (4 * (14 - 7))) - 7.235 * (2.3 - 2) *1.2 - -2 * 20'
  expect(calculate(expression).toFixed(9)).toEqual('60.281114286')
})

