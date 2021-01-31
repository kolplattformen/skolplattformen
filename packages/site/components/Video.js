import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const Video = () => {
  const [open, setOpen] = useState({
    isOpen: false
  });
  const openModal = (e) => {
    e.preventDefault();
    setOpen({
      isOpen: true
    });
  };
  return (
    <section className="app-video">
      <ModalVideo
        channel="youtube"
        isOpen={open.isOpen}
        videoId="Kl5B6MBAntI"
        onClose={() => setOpen({ isOpen: false })}
      />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="theme-video-wrap">
              <span
                onClick={openModal}
                style={{ cursor: "pointer" }}
                className="video-btn"
                data-popup="video"
              >
                <i className="fa fa-play"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
