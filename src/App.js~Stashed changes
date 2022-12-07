import movies from "./moviedata.json";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NoteState, { NoteContext } from "./Context/NoteContext";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [theme, setTheme] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(movies);
  console.log(index);
  const [arrayData, setarrayData] = useState([]);
  const [loading, setLoading] = useState(false);

  const spreadData = index.map((data) => {
    return data.title;
  });
  const object = { data: spreadData };
  arrayData.push(object);
  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 100);
  }, []);
  return (
    <>
      {loading ? (
        <ClipLoader
          color={"#181818"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <NoteState>
            <Layout
              index={index}
              setIndex={setIndex}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setTheme={setTheme}
              theme={theme}
            >
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home index={index} theme={theme} />}
                />
                <Route path="/edit" element={<Edit index={index} />} />
              </Routes>
            </Layout>
          </NoteState>
        </>
      )}
    </>
  );
}

export default App;
