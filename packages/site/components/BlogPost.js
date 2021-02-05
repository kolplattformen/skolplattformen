import React from "react";
import Link from "next/link";

const BlogPost = (props) => {
  return (
    <div className="single-blog-inner">
      <div className="post-image">
        <Link href={props.postLink}>
          <a>
            <img src={props.postImage} alt="" />
          </a>
        </Link>

        <div className="post-date">
          <p>
            <span>{props.postDate}</span>
            {props.postMonth}
          </p>
        </div>
      </div>

      <div className="post-content">
        <div className="post-details">
          <div className="post-info d-flex">
            <Link href={props.postLink}>
              <a>
                <span>By</span>
                {props.postAuthor}
              </a>
            </Link>
            <Link href={props.postLink}>
              <a>
                <span>{props.postCommentCount}</span> Comment
              </a>
            </Link>
          </div>

          <div className="post-title">
            <h3>
              <Link href={props.postLink}>
                <a>{props.postTitle}</a>
              </Link>
            </h3>
          </div>
          <p>{props.postContent}</p>
          <Link href={props.postLink}>
            <a className={props.btnClass}>Read More</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
