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

const getCalendar = () => 'gregorian'
const getCountry = () => 'SE'
const getCurrencies = () => ['USD', 'SEK']
const getTemperatureUnit = () => 'celsius'
const getTimeZone = () => 'Europe/Stockholm'
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
