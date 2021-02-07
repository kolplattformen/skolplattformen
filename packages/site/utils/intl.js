export const formatNumber = (input, options = {}) =>
  new Intl.NumberFormat('sv-SE', options).format(input)

export const formatPrice = (input) =>
  formatNumber(input, {
    currency: 'SEK',
    minimumFractionDigits: 0,
    style: 'currency',
  })
