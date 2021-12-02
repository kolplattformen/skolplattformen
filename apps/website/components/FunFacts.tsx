import React from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import { price } from './Pricing'

const FUNFACTS_DATA = [
  {
    count: 1000000000,
    title: 'kronor kostade originalet',
  },
  {
    count: 7,
    title: 'år att utveckla',
  },
  {
    count: price,
    title: 'kronor kostar vår app :)',
  },
  {
    count: 39,
    title: 'utvecklare har bidragit',
  },
]

const FunFacts = () => {
  const [counter, setCounter] = React.useState({
    startCounter: false,
  })

  const onVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      setCounter({ startCounter: true })
    }
  }

  return (
    <section className="max-w-6xl py-8 mx-auto md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-5">
        {FUNFACTS_DATA.map((funfact) => (
          <div className="text-center" key={funfact.title}>
            <span className="text-4xl text-indigo-500 sm:text-5xl whitespace-nowrap">
              <VisibilitySensor
                onChange={onVisibilityChange}
                offset={{ top: 10 }}
                delayedCall
              >
                <CountUp
                  end={counter.startCounter ? funfact.count : 0}
                  separator=" "
                />
              </VisibilitySensor>
            </span>
            <p className="text-gray-700 dark:text-gray-400">{funfact.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FunFacts
