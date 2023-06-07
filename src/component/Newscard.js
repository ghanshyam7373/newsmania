import React from "react";

const Newscard = (props) => {
    let { title, desc, imgUrl, newsUrl, author, date, source } = props;
    return (
      <>
        <div className="card bg-dark my-4">
          <span style={{left:'88%', zIndex:'1'}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <div className="imgCardDiv">
            <img src={imgUrl} className="card-img-top" id="cardImg" alt="..." />
          </div>
          <div className="card-body">
            <h6 className="card-title">{title}..</h6>
            <p className="card-text text">{desc}..</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} at{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-success"
            >
              Read More
            </a>
          </div>
        </div>
      </>
    );
}

export default Newscard;