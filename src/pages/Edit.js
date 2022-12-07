import { NoteContext } from "../Context/NoteContext";
import React, { useState, useRef } from "react";
import "../styles/Edit.css";

export default function Editable() {
  const { movieCon, setMovieCon } = React.useContext(NoteContext);
  const [movieeData, setmovieeData] = useState(movieCon);
  const [singleMovieUpdateData, setSingleMovieUpdateData] = useState("");
  const [fieldId, setFieldId] = useState("");
  const ref = useRef("");

  function handleClick(id) {
    const currentMovie = movieeData.filter((newMovie) => {
      if (newMovie.id === id) {
        return newMovie;
      }
    });
    setSingleMovieUpdateData(currentMovie[0]);

    console.log({ currentMovie });
    console.log({ singleMovieUpdateData });

    setFieldId(id);
  }

  const onChangeInput = (e) => {
    e.preventDefault();
    console.log(e);
    const { name, value } = e.target;
    console.log(value);

    if (name === "original_title") {
      // console.log(value);
      setSingleMovieUpdateData({
        ...singleMovieUpdateData,
        original_title: value,
      });
    } else if (name === "vote_count") {
      setSingleMovieUpdateData({ ...singleMovieUpdateData, vote_count: value });
    } else if (name === "release_date") {
      setSingleMovieUpdateData({
        ...singleMovieUpdateData,
        release_date: value,
      });
    } else {
    }
    // setMovieCon(newMoviedat);
  };

  ///////////////////////////////////////
  // e.target.name;
  // const { name, value } = e.target;
  // console.log("name", name);

  // console.log("value", value);
  // console.log("id");
  // console.log(id);

  // const editData = movieeData.map((item) =>
  //   item.id === id && name ? { ...item, [name]: value } : ite

  // );
  // console.log([name]);

  // setInput(e.target.value);
  ////////////////////////////////////////
  // const editData = movieeData.map((newMovie) => {
  // if (name === "original_title" && newMovie.id === id) {
  //   console.log(value);
  //   return { ...newMovie, original_title: value };
  // } else if (name === "vote_count" && newMovie.id === id) {
  //   return { ...newMovie, vote_count: value };
  // } else if (name === "release_date" && newMovie.id === id) {
  //   return { ...newMovie, release_date: value };
  // } else return newMovie;
  // });
  // console.log({ editData });
  // setmovieeData(editData);

  // setUpdated(newFormData);
  // setUpdated(editData);
  // const newFormData = [...editData];
  // setMovieCon(editData);

  // ref.current.focus();
  // console.log(element.firstChild.focu);

  // element.blur();
  // element.firstChild.firstChild.focus();
  // console.log(element);
  // const saveData = handleSaveClick();
  const handleSaveClick = () => {
    console.log(" handle save click ");
    console.log({ singleMovieUpdateData });
    const newMoviedata = movieeData.map((item) => {
      console.log(item);
      if (item.id == singleMovieUpdateData.id) {
        console.log(singleMovieUpdateData);
        return singleMovieUpdateData;
      } else {
        return item;
      }
    });
    setMovieCon(newMoviedata);
    setmovieeData(newMoviedata);
    console.log({ newMoviedata });
    setFieldId();
  };
  const handleCancelClick = () => {
    console.log(" handle cancel click ");
    // setMovieCon(movieeData);

    // const cancelMoviedata = movieeData.map((item) => {
    //   if (item.original_title !== singleMovieUpdateData.original_title) {
    //     return item;
    //   } else {
    //     return;
    //   }
    // });
    // setmovieeData(cancelMoviedata);
    setFieldId();
    // setmovieeData();
  };
  return (
    <div className="container">
      <h1 className="title">ReactJS Editable Table</h1>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Votes</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movieeData.map(
            ({ id, original_title, vote_count, release_date }) => (
              <tr key={id}>
                <td>
                  {fieldId && fieldId === id ? (
                    <input
                      className="in"
                      ref={ref}
                      id={id}
                      name="original_title"
                      value={singleMovieUpdateData.original_title}
                      type="text"
                      onChange={(e) => onChangeInput(e)}
                      placeholder="Type Movie Name"

                      // selectTextOnFocus="false"
                      // disabled
                    />
                  ) : (
                    <input
                      className="ins"
                      ref={ref}
                      // id={id}
                      name="original_title"
                      value={original_title}
                      type="text"
                      onChange={(e) => onChangeInput(e)}
                      placeholder="Type Movie Name"
                      disabled={true}
                    />
                  )}
                </td>
                <td>
                  {fieldId && fieldId == id ? (
                    <input
                      className="in"
                      id={id}
                      name="vote_count"
                      value={singleMovieUpdateData.vote_count}
                      type="number"
                      onChange={(e) => onChangeInput(e)}
                      placeholder="Type Votes"
                    />
                  ) : (
                    <input
                      className="ins"
                      id={id}
                      name="vote_count"
                      value={vote_count}
                      type="number"
                      onChange={(e) => onChangeInput(e)}
                      placeholder="Type Votes"
                      disabled
                    />
                  )}
                </td>
                <td>
                  {fieldId && fieldId == id ? (
                    <input
                      className="in"
                      name="release_date"
                      type="text"
                      id={id}
                      value={singleMovieUpdateData.release_date}
                      onChange={(e) => onChangeInput(e)}
                      placeholder="Type Date"
                    />
                  ) : (
                    <input
                      className="ins"
                      name="release_date"
                      type="text"
                      id={id}
                      value={release_date}
                      onChange={(e) => onChangeInput(e)}
                      placeholder="Type Date"
                      disabled={true}
                    />
                  )}
                </td>
                <td>
                  {fieldId !== id && (
                    <button
                      key={id}
                      onClick={() => handleClick(id)}
                      className="bttns"
                    >
                      Edit
                    </button>
                  )}
                  {fieldId === id && (
                    <>
                      <button
                        className="bttns"
                        key={id + 1}
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        key={id + 2}
                        onClick={handleCancelClick}
                        className="bttns"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
//   const handleAddFormChange = (event) => {
//     event.preventDefault();

//     const fieldName = event.target.getAttribute("name");
//     const fieldValue = event.target.value;

//     const newFormData = { ...addFormData };
//     newFormData[fieldName] = fieldValue;

//     setMovieCon(newFormData);
//   };

//   // const handleEditFormChange = (event) => {
//   //   event.preventDefault();

//   //   const fieldName = event.target.getAttribute("name");
//   //   const fieldValue = event.target.value;

//   //   const newFormData = { ...editFormData };
//   //   newFormData[fieldName] = fieldValue;

//   //   setMovieCon(newFormData);
//   // };

//   const newArr = movieCon.map((singleMovie) => {
//     if (event.field === "original_title" && singleMovie.id === event.id) {
//       return { ...singleMovie, original_title: event.value };
//     } else if (event.field === "vote_count" && singleMovie.id === event.id) {
//       return { ...singleMovie, vote_count: event.value };
//     } else if (event.field === "release_date" && singleMovie.id === event.id) {
//       return {
//         ...singleMovie,
//         release_date: event.value.toLocaleDateString(),
//       };
//     }

//     return singleMovie;
//   });
//   setMovieCon(newArr);

//   const columns = [
//     {
//       field: "original_title",
//       headerName: "Movies",
//       width: 200,
//       editable: true,
//     },
//     {
//       field: "vote_count",
//       headerName: "Voter",
//       type: "number",
//       width: 200,
//       editable: true,
//     },
//     {
//       field: "release_date",
//       headerName: "Release Date",
//       type: "date",
//       width: 200,
//       editable: true,
//     },
//   ];
//   <div style={{ height: 850 }}>
//     <DataGrid
//       style={{ width: "70rem" }}
//       rows={movieCon}
//       columns={columns}
//       onCellEditCommit={handleEvent}
//     />
//   </div>;
// }
