import React from "react";

const SectionTitle = (props) => {
  return (
    <div className="section-title text-center">
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
};

export default SectionTitle;
