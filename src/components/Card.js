import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "../styles/Card.css";

export default function Card(data) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown((isClicked) => !isClicked);
  };
  const changePopUpShowState = () => {
    setIsShown(false);
  };
  return (
    <>
      <div
        className="di"
        style={
          data.theme
            ? { backgroundColor: "white" }
            : { backgroundColor: `#aad779` }
        }
      >
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
            alt="Images"
            className="image"
          />
        </div>
        <div className="title">
          <h3>{data.title}</h3>
          <Rating initialValue={data.vote_average / 2.5} readonly={true} />
          <h3>{data.vote_count}</h3>
          <h4>{data.release_date}</h4>
        </div>
        <div className="btns">
          <button className="bttns" onClick={handleClick}>
            Read More
          </button>
        </div>
        {isShown ? (
          <div className="modal" key={data.id} id={data.id}>
            <div
              className="overlay"
              onClick={(event) => {
                console.log(event.target);
                if (event.target.className === "overlay") {
                  changePopUpShowState();
                }
              }}
            >
              <div className="modal-content">
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                    alt="Images"
                    className="image"
                  />
                </div>
                <div className="title">
                  <h2>{data.title}</h2>
                </div>
                <div>{data.overview}</div>
                <div>
                  <h3>Release Date:{data.release_date}</h3>
                  <h3>Language:{data.original_language}</h3>
                  <h3>Vote:{data.vote_count}</h3>
                </div>

                <div className="cl">
                  <button
                    className="close"
                    onClick={() => {
                      changePopUpShowState();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
