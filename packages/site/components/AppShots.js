import screenshotChildren from '../assets/img/screenshots/screenshot_children.png'
import screenshotChildCalendar from '../assets/img/screenshots/screenshot_child_calendar.png'
import screenshotChildClass from '../assets/img/screenshots/screenshot_child_class.png'
import screenshotChildNews from '../assets/img/screenshots/screenshot_child_news.png'
import screenshotChildNotifications from '../assets/img/screenshots/screenshot_child_notifications.png'
import screenshotLogin from '../assets/img/screenshots/screenshot_login.png'
import SectionTitle from './SectionTitle'

const AppShots = () => {
  return (
    <section className="max-w-6xl py-32 mx-auto" id="screenshots">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Så här ser appen ut"
          text="Alla fina illustrationer är gjorda av illustratören och läraren Karin Nygårds. Texterna är påhittade och nyheterna är tagna från andra källor för att skydda personuppgifter."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-x-4">
        <img src={screenshotLogin} />
        <img src={screenshotChildren} />
        <img src={screenshotChildNews} />
        <img src={screenshotChildNotifications} />
        <img src={screenshotChildCalendar} />
        <img src={screenshotChildClass} />
      </div>
    </section>
  )
}

export default AppShots
