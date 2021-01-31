import React from "react";

const PageBanner = (props) => {
  return (
    <div className="page-title-wrap">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="page-title-content text-center">
              <ul className="mb-0 list-unstyle nav">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="#">{props.pageName}</a>
                </li>
              </ul>
              <h1 className="h2">{props.pageName}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
