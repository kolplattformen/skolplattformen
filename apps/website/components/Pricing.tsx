import { formatPrice } from '../utils/intl'
import DownloadButtons from './DownloadButtons'
import Icon from './Icon'
import SectionTitle from './SectionTitle'

export const price = 0

const baseFeatures = [
  {
    included: true,
    title: 'BankID-inloggning',
  },
  {
    included: true,
    title: 'Se nyheter',
  },
  {
    included: true,
    title: 'Se notifieringar',
  },
  {
    included: true,
    title: 'Kontaktuppgifter till andra föräldrar',
  },
  {
    included: false,
    title: 'Gratis support',
  },
  {
    included: false,
    title: 'Pushnotifieringar',
  },
]

const Pricing = () => {
  return (
    <section className="px-5 py-8 md:px-0 md:py-32" id="vad-kostar-det">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Vad kostar det och varför är det inte gratis?"
          text={`Vi som bygger appen vill gärna fortsätta vidareutveckla den och även ha möjlighet att ge ersättning till de som hjälper till. Därför kostar det ${formatPrice(
            price
          )} att ladda ner appen. Det är en engångskostnad och hjälper oss att göra appen bättre.`}
        />
      </div>
      <div className="flex">
        <div className="flex flex-col items-center inline-block px-5 py-8 mx-auto text-center shadow-lg rounded-md">
          <h3 className="text-3xl text-gray-800">Engångskostnad</h3>
          <div className="mt-5 text-6xl text-pink-500">
            {formatPrice(price)}
          </div>
          <ul className="my-5">
            {baseFeatures.map(({ included, title }) => (
              <li className="flex items-center space-x-1" key={title}>
                {included ? (
                  <div className="w-5 text-green-500">
                    <Icon.Check />
                  </div>
                ) : (
                  <div className="w-5 text-red-500">
                    <Icon.Times />
                  </div>
                )}
                <span>{title}</span>
              </li>
            ))}
          </ul>
          <DownloadButtons />
        </div>
      </div>
    </section>
  )
}

export default Pricing
