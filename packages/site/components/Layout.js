import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import favImg from "../assets/img/favicon.png";

const Layout = (props) => {
  const [scrollTop, setScrollTop] = useState(false);

  const handleScrollTop = () => {
    if (window.scrollY > 70) {
      setScrollTop(true);
    } else if (window.scrollY < 70) {
      setScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  });
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.pageTitle}</title>
        <link rel="shortcut icon" type="image/png" href={favImg} />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700"
          rel="stylesheet"
        />
      </Head>
      <div className="page-wrapper" id="wrapper">
        {props.children}
      </div>
      {scrollTop === true ? (
        <div class="back-to-top show" style={{ cursor: "pointer" }}>
          <ScrollLink
            to="wrapper"
            smooth={true}
            duration={500}
            className="scroll-to-top"
          >
            <i class="fa fa-chevron-up"></i>
          </ScrollLink>
        </div>
      ) : null}
    </div>
  );
};

export default Layout;
