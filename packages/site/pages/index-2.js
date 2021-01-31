import React from "react";
import Layout from "../components/Layout";
import HeaderTwo from "../components/HeaderTwo";
import MobileMenu from "../components/MobileMenu";
import BannerTwo from "../components/BannerTwo";
import FunFacts from "../components/FunFacts";
import CtaTwo from "../components/CtaTwo";
import CtaThree from "../components/CtaThree";
import Video from "../components/Video";
import Pricing from "../components/Pricing";
import AppShots from "../components/AppShots";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import BlogHome from "../components/BlogHome";
import Clients from "../components/Clients";
import CtaOne from "../components/CtaOne";
import Footer from "../components/Footer";

const HomePageTwo = () => {
  return (
    <Layout pageTitle="Jironis">
      <HeaderTwo />
      <MobileMenu />
      <BannerTwo />
      <Features />
      <FunFacts />
      <CtaTwo />
      <CtaThree />
      <Video />
      <AppShots />
      <Pricing />
      <Testimonials />
      <Clients />
      <BlogHome />
      <CtaOne />
      <Footer />
    </Layout>
  );
};

export default HomePageTwo;
