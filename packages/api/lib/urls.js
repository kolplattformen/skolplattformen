const baseUrl = 'https://etjanst.stockholm.se'
const urls = {
  login: socialSecurityNumber => `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&initialize=bankid&personalNumber=${socialSecurityNumber}&_=${Date.now()}`,
  checkStatus: order => `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&verifyorder=${order}&_=${Date.now()}`,
  //loginTarget: `https://login001.stockholm.se/NECSadc/mbid/b64startpage.jsp?startpage=aHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt`,
  loginTarget: 'https://login003.stockholm.se/NECSadcmbid/authenticate/SiteMinderAuthADC?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvR2V0Q2hpbGRyZW4%3d',
  children: `${baseUrl}/vardnadshavare/inloggad2/GetChildren`,
  calendar: childId => `${baseUrl}/vardnadshavare/inloggad2/Calender/GetSchoolCalender?childId=${childId}&rowLimit=50`,
  user: `${baseUrl}/vardnadshavare/base/getuserdata`,
  news: childId => `${baseUrl}/vardnadshavare/inloggad2/News/GetNewsOverview?childId=${childId}`,
  image: url => `${baseUrl}/vardnadshavare/inloggad2/NewsBanner?url=${url}`,
  notifications: childId => `${baseUrl}/vardnadshavare/inloggad2/Overview/GetNotification?childId=${childId}`,
  menu: childId => `${baseUrl}/vardnadshavare/inloggad2/Matsedel/GetMatsedelChoice?childId=${childId}`,
  schedule: (childId, fromDate, endDate) => `${baseUrl}/vardnadshavare/inloggad2/Calender/GetSchema?childId=${childId}&startDate=${fromDate}&endDate=${endDate}`
}

module.exports = urls