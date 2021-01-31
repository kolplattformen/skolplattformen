import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import HeaderTwo from "../components/HeaderTwo";
import MobileMenu from "../components/MobileMenu";
import PageBanner from "../components/PageBanner";
import BlogPost from "../components/BlogPost";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import img1 from "../assets/img/blog/list1.png";
import img2 from "../assets/img/blog/list2.png";
import img3 from "../assets/img/blog/list3.png";
import img4 from "../assets/img/blog/list4.png";

const BLOG_DATA = [
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img1,
    btnClass: "btn"
  },
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img2,
    btnClass: "btn"
  },
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img3,
    btnClass: "btn"
  },
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img4,
    btnClass: "btn"
  }
];

const NewsPage = () => {
  return (
    <Layout pageTitle="Blog Page || Jironis || App Landing React Template">
      <HeaderTwo />
      <MobileMenu />
      <PageBanner pageName="All News" />
      <section className="pt-120 pb-150">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="blog-list-inner">
                {BLOG_DATA.map((blogPost, index) => (
                  <BlogPost
                    key={`blog-post-${index}`}
                    postLink={blogPost.link}
                    postAuthor={blogPost.author}
                    postDate={blogPost.date}
                    postMonth={blogPost.month}
                    postCommentCount={blogPost.commentCount}
                    postTitle={blogPost.title}
                    postContent={blogPost.content}
                    postImage={blogPost.image}
                    btnClass={blogPost.btnClass}
                  />
                ))}
              </div>
              <Pagination />
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

export default NewsPage;
