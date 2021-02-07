import React, { useState } from 'react'
import { formatPrice } from '../utils/intl'

const Pricing = () => {
  const [pricing] = useState(false)

  const price = 12

  return (
    <section className="pb-90" id="pricing">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-12">
            <div className="section-title text-center">
              <h2>Vad kostar det och varför är det inte gratis?</h2>
              <p>
                Vi som bygger appen vill gärna fortsätta vidareutveckla den och
                även ha möjlighet att ge ersättning till de som hjälper till.
                Därför kostar det {formatPrice(price)} att ladda ner appen. Det är
                en engångskostnad och hjälper oss att göra appen bättre.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="price-content">
              {pricing === false ? (
                <div id="month">
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <div className="single-price-plan text-center">
                        <div className="single-price-top">
                          <h4>Engångskostnad</h4>
                          <span>{formatPrice(price)}</span>
                        </div>
                        <div className="single-price-body">
                          <div className="price-list">
                            <ul>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                BankID-inloggning
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Se nyheter
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Se notifieringar
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Kontaktuppgifter till andra föräldrar
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Gratis support
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Pushnotifieringar
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn">
                            App Store
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {pricing === true ? (
                <div id="year">
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <div className="single-price-plan text-center">
                        <div className="single-price-top">
                          <h4>Standard</h4>
                          <span>$200</span>
                        </div>
                        <div className="single-price-body">
                          <div className="price-list">
                            <ul>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                10 pages
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                500 gb storage
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                10 sdd Database
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Free coustom domain
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                24/7 free support
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn">
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="single-price-plan active text-center">
                        <div className="single-price-top">
                          <h4>Business</h4>
                          <span>$300</span>
                        </div>
                        <div className="single-price-body">
                          <div className="price-list">
                            <ul>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                10 pages
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                500 gb storage
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                10 sdd Database
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Free coustom domain
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                24/7 free support
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn">
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="single-price-plan text-center">
                        <div className="single-price-top">
                          <h4>Professional</h4>
                          <span>$400</span>
                        </div>
                        <div className="single-price-body">
                          <div className="price-list">
                            <ul>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                10 pages
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                500 gb storage
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                10 sdd Database
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Free coustom domain
                              </li>
                              <li>
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                24/7 free support
                              </li>
                            </ul>
                          </div>
                          <a href="#" className="btn">
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
