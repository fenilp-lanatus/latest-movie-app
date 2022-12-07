import React, { useState } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Wwitch from "@mui/material/Switch";
import movies from "../moviedata.json";
import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";

export default function Header(props) {
  const { movieCon, setMovieCon } = useContext(NoteContext);
  const [datastore, setDataStore] = useState(movieCon);
  const [isTrue, setIsTrue] = useState("asc");
  console.log(isTrue);
  const sortArray = () => {
    setIsTrue((item) => !item);
  };
  console.log(datastore);

  const navigate = useNavigate();

  function descending() {
    if (isTrue == "desc") {
      const descendingData = movies.sort((a, b) =>
        a.original_title > b.original_title ? -1 : 1
      );
      const dataArr = [...descendingData];

      props.setIndex(dataArr);
      setIsTrue("asc");
    } else if (isTrue == "asc") {
      const ascendingData = movies.sort((a, b) =>
        a.original_title > b.original_title ? 1 : -1
      );
      const dataArr1 = [...ascendingData];

      console.log(dataArr1);
      props.setIndex(dataArr1);
      setIsTrue("desc");
    }
  }

  // function ascending() {
  //   const ascendingData = movies.sort((a, b) =>
  //     a.original_title < b.original_title ? 1 : -1
  //   );
  //   const dataArr1 = [...ascendingData];

  //   console.log(dataArr1);
  //   props.setIndex(dataArr1);
  // }
  const searchfilter = (event) => {
    props.setInputValue(event.target.value);

    let newData = [];
    datastore.filter((data) => {
      if (
        data.original_title
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        return newData.push(data);
      }
    });
    console.log(newData);
    console.log(movieCon);
    setMovieCon(newData);
  };
  function setDarkmode() {
    props.setTheme((isClicked) => !isClicked);
  }

  return (
    <header
      className="header-fixed"
      style={
        props.theme
          ? { backgroundColor: "#181818" }
          : { backgroundColor: "#aad790" }
      }
    >
      <div className="header-limiter">
        <h1>
          <a
            href="#"
            style={props.theme ? { color: "white" } : { color: "#181818" }}
          >
            LATEST MOVIE APP{" "}
          </a>
        </h1>

        <nav>
          <a onClick={() => navigate("/")}>Home</a>
          <a onClick={() => navigate("/edit")}>Edit</a>
        </nav>
      </div>
      <input
        onChange={searchfilter}
        value={props.inputValue}
        type="text"
        placeholder="Search..."
        className="inputText"
      ></input>
      <FilterAltIcon
        style={props.theme ? { color: "White" } : { color: "#181818" }}
        className="icon"
        sx={{ fontSize: "2.8rem" }}
        onClick={() => {
          descending();
        }}
      />
      <Wwitch onClick={() => setDarkmode()} />
    </header>
  );
}
