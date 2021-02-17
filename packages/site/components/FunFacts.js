import React from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

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
    count: 12,
    title: 'kronor kostar vår app :)',
  },
  {
    count: 5,
    title: 'veckors utveckling',
  },
]

const FunFacts = () => {
  const [counter, setCounter] = React.useState({
    startCounter: false,
  })

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setCounter({ startCounter: true })
    }
  }

  return (
    <section className="max-w-6xl py-8 mx-auto md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-5">
        {FUNFACTS_DATA.map((funfact) => (
          <div className="text-center" key={funfact.title}>
            <span className="text-5xl text-indigo-500">
              <VisibilitySensor
                onChange={onVisibilityChange}
                offset={{ top: 10 }}
                delayedCall
              >
                <CountUp end={counter.startCounter ? funfact.count : 0} />
              </VisibilitySensor>
            </span>
            <p className="text-gray-700">{funfact.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FunFacts
