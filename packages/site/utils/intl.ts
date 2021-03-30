export const formatNumber = (
  input: number,
  options: Intl.NumberFormatOptions = {}
) => new Intl.NumberFormat('sv-SE', options).format(input)

export const formatPrice = (input: number) =>
  formatNumber(input, {
    currency: 'SEK',
    minimumFractionDigits: 0,
    style: 'currency',
  })
