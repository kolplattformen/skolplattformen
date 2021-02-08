export const login = (personalNumber: string) => (
  `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&initialize=bankid&personalNumber=${personalNumber}&_=${Date.now()}`
)

export const loginStatus = (order: string) => (
  `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&verifyorder=${order}&_=${Date.now()}`
)

export const loginCookie = 'https://login003.stockholm.se/NECSadcmbid/authenticate/SiteMinderAuthADC?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvR2V0Q2hpbGRyZW4%3d'

export const children = 'https://etjanst.stockholm.se/vardnadshavare/inloggad2/GetChildren'

export const calendar = (childId: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Calender/GetSchoolCalender?childId=${childId}&rowLimit=50`
)

export const classmates = (childId: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/contacts/GetStudentsByClass?studentId=${childId}`
)

export const user = 'https://etjanst.stockholm.se/vardnadshavare/base/getuserdata'

export const news = (childId: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/News/GetNewsOverview?childId=${childId}`
)

export const newsDetails = (childId: string, newsId: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/News/GetNewsArticle?newsItemId=${newsId}&childId=${childId}`
)

export const image = (url: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/NewsBanner?url=${url}`
)

export const notifications = (childId: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Overview/GetNotification?childId=${childId}`
)

export const menu = (childId: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Matsedel/GetMatsedelRSS?childId=${childId}`
)

export const schedule = (childId: string, fromDate: string, endDate: string) => (
  `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Calender/GetSchema?childId=${childId}&startDate=${fromDate}&endDate=${endDate}`
)
