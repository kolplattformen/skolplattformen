import React from 'react'
import imgKarin from '../assets/img/karin.jpg'
import imgNiels from '../assets/img/niels.jpg'
import imgPer from '../assets/img/per.jpg'
import imgFredrik from '../assets/img/wass.png'
import Section from './Section'

const testimonials = [
  {
    image: imgKarin,
    text:
      'Det känns bra att mänskligheten nu befrias från upphandlingshaveriets bojor. Framtiden är här! Och den kostade nästan ingenting. Öppen data är kärlek.',
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
          key={testimonial.title}
        >
          <div className="max-w-md px-8 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-center -mt-16 md:justify-start">
              <img
                className="object-cover w-20 h-20 border-2 border-indigo-500 rounded-full"
                src={testimonial.image}
              />
            </div>
            <div>
              <p className="mt-2 text-gray-600">{testimonial.text}</p>
            </div>
            <div className="flex flex-col mt-4 text-pink-500">
              {testimonial.name}
              <div className="text-sm text-gray-500">{testimonial.title}</div>
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}

export default Testimonials
