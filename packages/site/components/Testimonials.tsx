import React from 'react'
import imgKarin from '../assets/img/karin.jpg'
import imgNiels from '../assets/img/niels.jpg'
import imgPer from '../assets/img/per.jpg'
import imgFredrik from '../assets/img/wass.jpg'
import Section from './Section'
import Image from 'next/image'

export const testimonials = [
  {
    image: imgKarin,
    text:
      'Oftast när jag behöver kolla upp något är jag stressad och på språng. Om det tar tid att logga in och leta så struntar jag till sist i det.',
    name: 'Karin Nygårds',
    title: 'Lärare och förälder',
  },
  {
    image: imgFredrik,
    text:
      'Det känns bra att mänskligheten nu befrias från upphandlingshaveriets bojor. Framtiden är här! Och den kostade nästan ingenting. Öppen data är kärlek.',
    name: 'Fredrik Wass',
    title: 'Förälder',
  },
  {
    image: imgPer,
    text:
      'Christian Landgren la upp en bild på sin ”Skrota Skolplattformen”-keps, det fick mig att dra igång en Facebook-grupp som utvecklades till ett slags hackathon där Christian och några gjorde en app av Skolplattformen, så som den borde vara. Så nu behövs inte den där kepsen längre, här är appen.',
    name: 'Per Strömbeck',
    title: 'Förälder',
  },
  {
    image: imgNiels,
    text:
      'Digitala lösningar inom skolan är som på många andra områden inom det offentliga varken användarvänliga eller effektiva. Med öppen källkod och öppen data kan vi få snabbare och billigare få till bättre lösningar. Och dessutom öka insynen i hur systemen som formar vår vardag fungerar. Öppna Skolplattformen är ett bra exempel på detta',
    name: 'Niels Paarup-Petersen',
    title: 'Riksdagsledamot C',
  },
]

const Testimonials = () => {
  return (
    <Section padding="py-8 md:pt-32 md:pb-20">
      {testimonials.map((testimonial) => (
        <div
          className="flex justify-center mt-12 md:mt-0"
          key={testimonial.name}
        >
          <div className="max-w-md px-8 py-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <div className="flex justify-center -mt-16 md:justify-start">
              <div className="object-cover w-20 h-20 border-2 border-indigo-500 rounded-full">
                <Image
                  alt={testimonial.name}
                  className="object-cover rounded-full"
                  height={80}
                  src={testimonial.image}
                  width={80}
                />
              </div>
            </div>
            <div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {testimonial.text}
              </p>
            </div>
            <div className="flex flex-col mt-4 text-pink-600">
              {testimonial.name}
              <div className="text-sm text-gray-400">{testimonial.title}</div>
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}

export default Testimonials
