import { Box } from "@mui/material";
import React, { useContext } from "react";
import Card from "../components/Card";
import { NoteContext } from "../Context/NoteContext";

export default function Home({ theme }) {
  const { movieCon } = useContext(NoteContext);
  console.log({ movieConFromHome: movieCon });
  return (
    <>
      <div
        style={
          theme ? { backgroundColor: "black" } : { backgroundColor: "#bd90d7 " }
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {movieCon.map((item) => {
            return (
              <Card
                id={item.id}
                key={item.id}
                title={item.original_title}
                vote_average={item.vote_average}
                poster_path={item.poster_path}
                theme={theme}
                release_date={item.release_date}
                original_language={item.original_language}
                vote_count={item.vote_count}
                overview={item.overview}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
