import { Col, Container, Row } from 'react-bootstrap'

const MEDIA_DATA = [
  {
    "title": "Efter skandalerna – kodande föräldrar släpper egen skolapp",
    "source": "Ny Teknik",
    "link": "https://www.nyteknik.se/premium/efter-skandalerna-kodande-foraldrar-slapper-egen-skolapp-7009234",
  }, {
    "title": "Stockholms stad utreder föräldrarnas app: ”Kan vara olaglig”",
    "source": "Ny Teknik",
    "link": "https://www.nyteknik.se/digitalisering/stockholms-stad-utreder-foraldrarnas-app-kan-vara-olaglig-7009287",
  }, {
    "title": "Lärare dömer ut Skolplattformen",
    "source": "Dagens Nyheter",
    "link": "https://www.dn.se/sthlm/larare-domer-ut-skolplattformen/",
  }, {
    "title": "Han utmanar Skolplattformen med egen app: ”Något behövde göras”",
    "source": "SVT Nyheter",
    "link": "https://www.svt.se/nyheter/lokalt/stockholm/han-trottnade-pa-skolplattformen-byggde-en-egen-app",
  },

]

const Media = () => {
  return (
    <section className="border-top pt-120 pb-80">
      <Container>
        <div className="section-title text-center">
          <h1>Öppna Skolplattformen i media</h1>
        </div>
        <Row>
          {MEDIA_DATA.map((article, index) => (
            <Col md={3} sm={6} key={`article-${index}`}>
              <div>
                <p><b><a href={article.link}>{article.title}</a></b></p>
                <p>{article.source}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Media
