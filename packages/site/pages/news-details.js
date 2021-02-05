import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Layout from "../components/Layout";
import HeaderTwo from "../components/HeaderTwo";
import MobileMenu from "../components/MobileMenu";

import PageBanner from "../components/PageBanner";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import img1 from "../assets/img/blog/list1.png";
import authorImage from "../assets/img/blog/blog-author.png";
import commentAuthor1 from "../assets/img/blog/comment-author.png";
import commentAuthor2 from "../assets/img/blog/comment-author2.png";

const NewsDetails = () => {
  return (
    <Layout pageTitle="Blog Details || Jironis || App Landing React Template">
      <HeaderTwo />
      <MobileMenu />
      <PageBanner pageName="News Details" />
      <section className="pt-120 pb-150">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="blog-details-inner">
                <div className="single-blog-inner">
                  <div className="post-image">
                    <Link href="/news-details">
                      <a>
                        <img src={img1} alt="" />
                      </a>
                    </Link>
                    <div className="post-date">
                      <p>
                        <span>30</span>Sep
                      </p>
                    </div>
                  </div>

                  <div className="post-content">
                    <div className="post-details">
                      <div className="post-info d-flex">
                        <a href="#">
                          <span>By</span>Admin
                        </a>
                        <a href="#">
                          <span>2</span> Comeent
                        </a>
                      </div>

                      <div className="post-title">
                        <h3>
                          <a href="blog-details.html">
                            Pre and Post Launch Mobile App Marketing Pitfalls to
                            Avoid
                          </a>
                        </h3>
                      </div>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of
                        text. All the Lorem Ipsum generators on the Internet
                        tend to repeat predefined chunks as necessary, making
                        this the first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable. The generated Lorem Ipsum
                        is therefore always free from repetition, injected
                        humour, or non-characteristic words etc.
                      </p>
                      <p className="mb-0">
                        t is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy. Various versions have evolved over the
                        years, sometimes by accident, sometimes on purpose
                        injected humour and the like.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="post-tag-share d-flex align-items-center">
                  <div className="post-tag">
                    <h5>Tags:</h5>
                    <a href="#">Business,</a>
                    <a href="#">Agency,</a>
                    <a href="#">Technology</a>
                  </div>
                  <div className="post-share">
                    <ul className="social-list mb--0 list-unstyled">
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="post-author-inner midea">
                  <img src={authorImage} alt="" />
                  <div className="author-details">
                    <h4>Christine Eve</h4>
                    <p>
                      Lorem Ipsum is simply dummy text of the rinting and
                      typesetting been the industry standard dummy text ever
                      sincer nullam condimentum purus.
                    </p>
                    <a href="#">View All Posts</a>
                  </div>
                </div>

                <div className="post-comment">
                  <h3>2 Comments</h3>
                  <ul className="post-comments p-0 m-0 list-unstyled">
                    <li>
                      <div className="comment-author-details media">
                        <img src={commentAuthor1} alt="" />
                        <div className="comment-author-content">
                          <h5>David Martin</h5>
                          <h6>20 oct, 2018 - 4:00 pm</h6>
                          <p>
                            Lorem Ipsum is simply dummy text of the rinting and
                            typesetting been the industry standard dummy text
                            ever sincer condimentum purus. In non ex at ligula
                            fringilla lobortis et aliquet.
                          </p>
                          <a href="#" className="btn">
                            Reply
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex">
                      <div className="comment-author-details media">
                        <img src={commentAuthor2} alt="" />
                        <div className="comment-author-content">
                          <h5>Jasseca Brown</h5>
                          <h6>20 oct, 2018 - 4:00 pm</h6>
                          <p>
                            Lorem Ipsum is simply dummy text of the rinting and
                            typesetting been the industry standard dummy text
                            ever sincer condimentum purus. In non ex at ligula
                            fringilla lobortis et aliquet.
                          </p>
                          <a href="#" className="btn">
                            Reply
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="contact-form contact-page-form parsley-validate">
                  <h3>Leave a Comment</h3>
                  <form action="#">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          className="theme-input-style"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="theme-input-style"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          name="message"
                          placeholder="Write Message"
                          className="theme-input-style"
                        ></textarea>
                        <div className="submite-btn">
                          <button type="submit" className="btn">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Layout>
  );
};

export default NewsDetails;
