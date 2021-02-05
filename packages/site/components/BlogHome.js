import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import BlogPost from "./BlogPost";
import SectionTitle from "./SectionTitle";

import img1 from "../assets/img/blog/blog1.png";
import img2 from "../assets/img/blog/blog2.png";
import img3 from "../assets/img/blog/blog3.png";

const BLOG_HOME_DATA = [
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of available but majority have alteration in some by inject humour or random words.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img1,
    btnClass: "blog-btn"
  },
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of available but majority have alteration in some by inject humour or random words.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img2,
    btnClass: "blog-btn"
  },
  {
    title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
    content:
      "There are many variations of passages of available but majority have alteration in some by inject humour or random words.",
    link: "/news-details",
    date: "30",
    month: "Sep",
    author: "Admin",
    commentCount: "2",
    image: img3,
    btnClass: "blog-btn"
  }
];

const BlogHome = () => {
  return (
    <section className="border-top pt-115 pb-80" id="blog">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} lg={8}>
            <SectionTitle
              title="Our News & Articles"
              text="Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt    mollit lorem ipsum anim id est laborum perspiciatis unde."
            />
          </Col>
        </Row>
        <Row>
          {BLOG_HOME_DATA.map((blogPost, index) => (
            <Col md={4} lg={4} key={`blog-post-${index}`}>
              <BlogPost
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
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogHome;
