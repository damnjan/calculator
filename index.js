function parse(...numbers) {
  return numbers.map(numberString => {
    const number = isNaN(numberString) ? NaN : parseFloat(numberString)
    if (isNaN(number)) {
      throw new Error('Invalid number: ' + numberString)
    }
    return number
  })
}

function calculateWithoutBraces(str) {
  const sumOrSubRegex = /([\+-]?[\d\.]+)(\+|-)([\+-]?[\d\.]+)/
  const mulOrDivRegex = /([\d\.]+)(\*|\/)([\+-]?[\d\.]+)/


  while(mulOrDivRegex.test(str)) {
    str = str.replace(mulOrDivRegex, (match, left, operator, right) => {
      const [a, b] = parse(left, right)
      return operator === '*' ? a * b : a / b
    })
  }

  while(sumOrSubRegex.test(str)) {
    str = str.replace(sumOrSubRegex, (match, left, operator, right) => {
      const [a, b] = parse(left, right)
      return operator === '+' ?  a + b : a - b
    })
  }

  return str
}

module.exports = function recurseCalc(str) {
  str = str.replace(/\s/g, '')
  const bracesRegex = /\(([^\(]+?)\)/
  while (bracesRegex.test(str)) {
    str = str.replace(bracesRegex, (match, expr) => calculateWithoutBraces(expr))
  }

  return Number(calculateWithoutBraces(str))
}
