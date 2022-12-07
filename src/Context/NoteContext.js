import movieConData from "../moviedata.json";
import React, { createContext, useState } from "react";

export const NoteContext = createContext();
const NoteState = (props) => {
  const [movieCon, setMovieCon] = useState(movieConData);
  console.log({ movieConFromNoteContext: movieCon });
  return (
    <NoteContext.Provider value={{ movieCon, setMovieCon }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
