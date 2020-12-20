const routes = {
  login: (personalNumber: string) => `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&initialize=bankid&personalNumber=${personalNumber}&_=${Date.now()}`,
  loginStatus: (order: string) => `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&verifyorder=${order}&_=${Date.now()}`,
  loginCookie:
    'https://login003.stockholm.se/NECSadcmbid/authenticate/SiteMinderAuthADC?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvR2V0Q2hpbGRyZW4%3d',
  children:
    'https://etjanst.stockholm.se/vardnadshavare/inloggad2/GetChildren',
  calendar: (childId: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Calender/GetSchoolCalender?childId=${childId}&rowLimit=50`,
  classmates: (childId: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/contacts/GetStudentsByClass?studentId=${childId}`,
  user:
    'https://etjanst.stockholm.se/vardnadshavare/base/getuserdata',
  news: (childId: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/News/GetNewsOverview?childId=${childId}`,
  image: (url: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/NewsBanner?url=${url}`,
  notifications: (childId: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Overview/GetNotification?childId=${childId}`,
  menu: (childId: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Matsedel/GetMatsedelRSS?childId=${childId}`,
  schedule: (childId: string, fromDate: string, endDate: string) => `https://etjanst.stockholm.se/vardnadshavare/inloggad2/Calender/GetSchema?childId=${childId}&startDate=${fromDate}&endDate=${endDate}`,
}

export default routes
