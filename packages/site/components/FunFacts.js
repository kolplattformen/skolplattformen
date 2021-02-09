import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

const FUNFACTS_DATA = [
  {
    count: '1000000000',
    title: 'kronor kostade originalet',
  },
  {
    count: '7',
    title: 'år att utveckla',
  },
  {
    count: '12',
    title: 'kronor kostar vår app :)',
  },
  {
    count: '5',
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
    <section className="border-top pt-120 pb-80">
      <Container>
        <h3>Inte helt rättvisa jämförelser</h3>
        <Row>
          {FUNFACTS_DATA.map((funfact, index) => (
            <Col md={3} sm={6} key={`funfact-post-${index}`}>
              <div className="single-counter text-center">
                <span className="counter">
                  <VisibilitySensor
                    onChange={onVisibilityChange}
                    offset={{ top: 10 }}
                    delayedCall
                  >
                    <CountUp end={counter.startCounter ? funfact.count : 0} />
                  </VisibilitySensor>
                </span>
                <p>{funfact.title}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default FunFacts
