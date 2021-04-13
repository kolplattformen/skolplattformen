const getLocales = () => [
  { countryCode: 'EN', languageTag: 'en-US', languageCode: 'en', isRTL: false },
  { countryCode: 'SE', languageTag: 'sv-SE', languageCode: 'sv', isRTL: false },
]

const findBestAvailableLanguage = jest.fn(() => ({
  languageTag: 'sv',
  isRTL: false,
}))

const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
})

const getCalendar = () => 'gregorian' // or "japanese", "buddhist"
const getCountry = () => 'US' // the country code you want
const getCurrencies = () => ['USD', 'EUR'] // can be empty array
const getTemperatureUnit = () => 'celsius' // or "fahrenheit"
const getTimeZone = () => 'Europe/Paris' // the timezone you want
const uses24HourClock = () => true
const usesMetricSystem = () => true

const addEventListener = jest.fn()
const removeEventListener = jest.fn()

export {
  findBestAvailableLanguage,
  getLocales,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  addEventListener,
  removeEventListener,
}
