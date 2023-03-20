// BankId
export const login = (personalNumber?: string) => {
  const baseUrl =
    'https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=1&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt'
  const optionalPersonalNumber =
    personalNumber === undefined ? '' : `&personalNumber=${personalNumber}`
  return `${baseUrl}&initialize=bankid${optionalPersonalNumber}&_=${Date.now()}`
}

export const loginStatus = (order: string) =>
  `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=1&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&verifyorder=${order}&_=${Date.now()}`
export const loginCookie =
  'https://login003.stockholm.se/NECSadcmbid/authenticate/SiteMinderAuthADC?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvR2V0Q2hpbGRyZW4%3d'

// Freja
export const frejaLogin =
  'https://login003.stockholm.se/NECSadcfreja/authenticate/NECSadcfreja?action=init&return_url=https%3A%2F%2Flogin003.stockholm.se%2FNECSadcfreja%2Fauthenticate%2FNECSadcfreja'
export const frejaLoginStatus =
  'https://login003.stockholm.se/NECSadcfreja/authenticate/NECSadcfreja?TYPE=33554433&REALMOID=06-89cf916c-9764-45fa-8690-eaf3fe9282bc&GUID=1&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2ffreja%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&action=checkstatus'
export const frejaReturnUrl =
  'https://login003.stockholm.se/NECSadcfreja/authenticate/NECSadcfreja?TYPE=33554433&REALMOID=06-89cf916c-9764-45fa-8690-eaf3fe9282bc&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2ffreja%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvT3ZlcnNpa3Q%3d'
export const frejaLoginCookie =
  'https://login003.stockholm.se/NECSadcfreja/authenticate/SiteMinderAuthADCFREJA?TYPE=33554433&REALMOID=06-89cf916c-9764-45fa-8690-eaf3fe9282bc&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2ffreja%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvT3ZlcnNpa3Q%3d'

const urlLoggedIn = `https://etjanst.stockholm.se/vardnadshavare/inloggad2`

export const children = `${urlLoggedIn}/GetChildren`

export const calendar = (childId: string) =>
  `${urlLoggedIn}/Calender/GetSchoolCalender?childId=${childId}&rowLimit=50`

export const classmates = (childId: string) =>
  `${urlLoggedIn}/contacts/GetStudentsByClass?studentId=${childId}`

export const teachers = (childId: string, schoolForm: string) =>
  `${urlLoggedIn}/contacts/GetTeachersByStudent?studentId=${childId}&schoolForm=${schoolForm}`

export const schoolContacts = (childId: string, schoolId: string) =>
  `${urlLoggedIn}/contacts/GetSchoolContacts?schoolId=${schoolId}&studentId=${childId}&schoolForm=Klasslista`

export const user =
  'https://etjanst.stockholm.se/vardnadshavare/base/getuserdata'

export const news = (childId: string) =>
  `${urlLoggedIn}/News/GetNewsArchive?bannerImageLimit=5000&childId=${childId}`

export const newsDetails = (childId: string, newsId: string) =>
  `${urlLoggedIn}/News/GetNewsArticle?newsItemId=${newsId}&childId=${childId}`

export const image = (url: string) => `${urlLoggedIn}/NewsBanner?url=${url}`

export const notifications = (childId: string) =>
  `${urlLoggedIn}/notifications/getnotifications?childId=${childId}`

export const menuRss = (childId: string) =>
  `${urlLoggedIn}/Matsedel/GetMatsedelRSS?childId=${childId}`

export const menuList = (childId: string) =>
  `${urlLoggedIn}/Matsedel/GetMatsedelList?childId=${childId}`

export const menuChoice = (childId: string) =>
  `${urlLoggedIn}/Matsedel/GetMatsedelChoice?childId=${childId}`

export const schedule = (childId: string, fromDate: string, endDate: string) =>
  `${urlLoggedIn}/Calender/GetSchema?childId=${childId}&startDate=${fromDate}&endDate=${endDate}`

export const cdn = 'https://etjanst.stockholm.se/vardnadshavare/base/cdn'

export const auth = 'https://etjanst.stockholm.se/vardnadshavare/base/auth'

export const startBundle =
  'https://etjanst.stockholm.se/vardnadshavare/bundles/start'

export const hemPage =
  'https://etjanst.stockholm.se/vardnadshavare/inloggad2/hem'

export const navigationControllerScript =
  'https://etjanst.stockholm.se/vardnadshavare/bundles/navigationController'

export const baseEtjanst = 'https://etjanst.stockholm.se'

export const childcontrollerScript = `https://etjanst.stockholm.se/vardnadshavare/bundles/childcontroller?v=${Date.now()}`

export const createItemConfig =
  'https://raw.githubusercontent.com/kolplattformen/embedded-api/main/config.json'

// Skola24
export const ssoRequestUrl = (targetSystem: string) =>
  `https://fnsservicesso1.stockholm.se/sso-ng/saml-2.0/authenticate?customer=https://login001.stockholm.se&targetsystem=${targetSystem}`

export const ssoResponseUrl =
  'https://login001.stockholm.se/affwebservices/public/saml2sso'
export const samlResponseUrl =
  'https://fnsservicesso1.stockholm.se/sso-ng/saml-2.0/response'

export const timetables =
  'https://fns.stockholm.se/ng/api/services/skola24/get/personal/timetables'
export const renderKey =
  'https://fns.stockholm.se/ng/api/get/timetable/render/key'
export const timetable = 'https://fns.stockholm.se/ng/api/render/timetable'

export const topologyConfigUrl =
  'https://fantomenkrypto.vercel.app/api/getConfig'

export const selectChild =
  'https://etjanst.stockholm.se/vardnadshavare/inloggad2/SelectChild'
