import React from "react";

import postImg1 from "../assets/img/blog/latest-blog1.png";
import postImg2 from "../assets/img/blog/latest-blog2.png";
import postImg3 from "../assets/img/blog/latest-blog3.png";

const Sidebar = () => {
  return (
    <aside>
      <div className="single-sidebar-widget mb-30">
        <div className="search-bar-widget">
          <div className="search-form parsley-validate">
            <form action="#" method="POST">
              <input type="text" placeholder="Search here..." required />
            </form>
          </div>
        </div>
      </div>

      <div className="single-sidebar-widget mb-30">
        <div className="sidebar-title">
          <h5>Latest Posts</h5>
        </div>
        <div className="sidebar-body latest-post">
          <ul>
            <li>
              <div className="latest-post-wrap media">
                <div className="latest-post-img">
                  <img src={postImg1} alt="" />
                </div>
                <div className="latest-post-body media-body">
                  <p>
                    <a href="#">Basic rules of running web agency</a>
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="latest-post-wrap media">
                <div className="latest-post-img">
                  <img src={postImg2} alt="" />
                </div>
                <div className="latest-post-body media-body">
                  <p>
                    <a href="#">Introducing latest app features</a>
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="latest-post-wrap media">
                <div className="latest-post-img">
                  <img src={postImg3} alt="" />
                </div>
                <div className="latest-post-body media-body">
                  <p>
                    <a href="#">Become the best sale marketer</a>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="single-sidebar-widget mb-30">
        <div className="sidebar-title">
          <h5>Categories</h5>
        </div>

        <div className="sidebar-body categories-inner">
          <ul>
            <li>
              <a href="#">Business</a>
            </li>
            <li>
              <a href="#">Introductions</a>
            </li>
            <li>
              <a href="#">One Page Template</a>
            </li>
            <li>
              <a href="#">Parallax Effects</a>
            </li>
            <li>
              <a href="#">New Technologies</a>
            </li>
            <li>
              <a href="#">Video Backgrounds</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="single-sidebar-widget mb-30">
        <div className="sidebar-title">
          <h5>Tags</h5>
        </div>

        <div className="sidebar-body tag-inner">
          <a href="#">Business,</a>
          <a href="#">Agency,</a>
          <a href="#">Technology,</a>
          <a href="#">Parallax,</a>
          <a href="#">nnovative,</a>
          <a href="#">Professional,</a>
          <a href="#">Experience,</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
