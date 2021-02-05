import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import img1 from "../assets/img/boys.png";
import img2 from "../assets/img/icons/goal.svg";

const CtaTwo = () => {
  return (
    <section className="bg-2 pt-120 pb-120">
      <Container>
        <Row>
          <Col lg={7} sm={7}>
            <div className="user-interact-image">
              <img src={img1} alt="" />
            </div>
          </Col>
          <Col lg={5} sm={5}>
            <div className="user-interact-inner">
              <h2>Lika säkert</h2>
              <p>
                Ingen information om dina barn skickas till oss, all kommunikatoin går direkt mellan din telefon och Skolplattformens servrar. Du loggar in med BankID som vanligt.
              </p>
              <a href="#" className="btn">
                App Store
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaTwo;
