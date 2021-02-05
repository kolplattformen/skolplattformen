import React from "react";

const Pagination = () => {
  return (
    <ul className="theme-pagination pt-sans pagination align-items-center">
      <li className="">
        <a href="#">
          <i className="fa fa-angle-left"></i>
        </a>
      </li>
      <li className="active">
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li>
      <li>
        <a href="#">3</a>
      </li>
      <li>
        <a href="#">5</a>
      </li>
      <li>
        <a href="#">
          <i className="fa fa-angle-right"></i>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
