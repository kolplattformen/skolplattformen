import screenshotChildren from '../assets/img/screenshots/screenshot_children.png'
import screenshotChildCalendar from '../assets/img/screenshots/screenshot_child_calendar.png'
import screenshotChildClass from '../assets/img/screenshots/screenshot_child_class.png'
import screenshotChildNews from '../assets/img/screenshots/screenshot_child_news.jpg'
import screenshotChildNotifications from '../assets/img/screenshots/screenshot_child_notifications.png'
import screenshotLogin from '../assets/img/screenshots/screenshot_login.png'
import SectionTitle from './SectionTitle'

const AppShots = () => {
  return (
    <section
      className="max-w-6xl px-5 md:px-0 py-8 md:py-32 mx-auto"
      id="screenshots"
    >
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Så här ser appen ut"
          text="Alla fina illustrationer är gjorda av illustratören och läraren Karin Nygårds. Texterna är påhittade och nyheterna är tagna från andra källor för att skydda personuppgifter."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4">
        <img src={screenshotLogin} alt="Inloggning med BankID" />
        <img
          src={screenshotChildren}
          alt="Lista med dina barn i Stockholms Stad"
        />
        <img src={screenshotChildNews} alt="Barnets nyheter" />
        <img
          src={screenshotChildNotifications}
          alt="Lista med barnets aviseringar"
        />
        <img src={screenshotChildCalendar} alt="Barnets kalender" />
        <img src={screenshotChildClass} alt="Barnets klasskompisar" />
      </div>
    </section>
  )
}

export default AppShots
