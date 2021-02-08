import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import img1 from '../assets/img/boys.png'


const CtaTwo = () => {
  return (
    <section className="bg-2 pt-120 pb-120">
      <Container>
        <Row>
          <Col lg={7} sm={7}>
            <div className="user-interact-image">
              <Image src={img1} width="668" height="500" alt="" />
            </div>
          </Col>
          <Col lg={5} sm={5}>
            <div className="user-interact-inner">
              <h2>Lika säkert</h2>
              <p>
                Ingen information om dina barn skickas till oss, all
                kommunikation går direkt mellan din telefon och Skolplattformens
                servrar. Du loggar in med BankID som vanligt.
              </p>
              <a href="#" className="btn">
                App Store
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CtaTwo
