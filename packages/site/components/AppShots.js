import screenshotAbsence from '../assets/img/screenshots/screenshot_absence.png'
import screenshotChildren from '../assets/img/screenshots/screenshot_children.png'
import screenshotChildCalendar from '../assets/img/screenshots/screenshot_child_calendar.png'
import screenshotChildClass from '../assets/img/screenshots/screenshot_child_class.png'
import screenshotChildNews from '../assets/img/screenshots/screenshot_child_news.jpg'
import screenshotChildNotifications from '../assets/img/screenshots/screenshot_child_notifications.png'
import screenshotLogin from '../assets/img/screenshots/screenshot_login.png'
import SectionTitle from './SectionTitle'
import Image from 'next/image'

const AppShots = () => {
  return (
    <section
      className="max-w-6xl px-5 py-8 mx-auto md:px-0 md:py-32"
      id="screenshots"
    >
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Så här ser appen ut"
          text="Alla fina illustrationer är gjorda av illustratören och läraren Karin Nygårds. Texterna är påhittade och nyheterna är tagna från andra källor för att skydda personuppgifter."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-x-4">
        <Image
          alt="Inloggning med BankID"
          height={376}
          layout="responsive"
          src={screenshotLogin}
          width={178}
        />
        <Image
          alt="Lista med dina barn i Stockholms Stad"
          height={376}
          layout="responsive"
          src={screenshotChildren}
          width={178}
        />
        <Image
          alt="Barnets nyheter"
          height={376}
          layout="responsive"
          src={screenshotChildNews}
          width={178}
        />
        <Image
          alt="Barnets aviseringar"
          height={376}
          layout="responsive"
          src={screenshotChildNotifications}
          width={178}
        />
        <Image
          alt="Barnets kalender"
          height={376}
          layout="responsive"
          src={screenshotChildCalendar}
          width={178}
        />
        <Image
          alt="Barnets klasskompisar"
          height={376}
          layout="responsive"
          src={screenshotChildClass}
          width={178}
        />
        <Image
          alt="Frånvaroanmälan"
          height={376}
          layout="responsive"
          src={screenshotAbsence}
          width={178}
        />
      </div>
    </section>
  )
}

export default AppShots
