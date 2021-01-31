import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import img1 from "../assets/img/icons/solution1.svg";
import img2 from "../assets/img/girls.png";

const CtaThree = () => {
  return (
    <section className="pt-120 pb-120">
      <Container>
        <Row>
          <Col lg={5} sm={5}>
            <div className="user-interact-inner">
              <h2>Se summering för alla dina barn på ett ställe</h2>
              <p>
                Vi har räknat, det tar flera minuter att få en uppfattning om vad som händer i skolan imorgon för dina barn. I vår app kan du direkt se allt som är aktuellt för alla barnen på en och samma skärm.
              </p>
              <a href="#" className="btn">
                App Store
              </a>
            </div>
          </Col>
          <Col lg={7} sm={7}>
            <div className="user-interact-image type2">
              <img src={img2} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaThree;
