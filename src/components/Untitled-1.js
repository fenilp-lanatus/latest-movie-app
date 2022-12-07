 <div
        className="box"
        style={
          theme ? { backgroundColor: `#181818` } : { backgroundColor: "white" }
        }
      >
        <div className="main">
          <div className="logo">
            <h2>LATEST MOVIE APP</h2>
          </div>
          <div className="buttons">
            <div className="btn">
              <>
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/edit" element={<EditPage />} />
                </Routes>
              </>
            </div>
            <div className="inputtext">
              <input
                onChange={searchfilter}
                value={inputValue}
                type="text"
                placeholder="Search..."
                className="inputText"
              ></input>
            </div>
            <div className="icon">
              <FilterAltIcon
                onClick={() => descending()}
                sx={{ fontSize: "3rem" }}
              />
            </div>
            <div className="filter">
              <Wwitch onClick={() => setDarkmode()} />
            </div>
          </div>
        </div>
       <div
       
      > 
        {index.map((data) => {
          // console.log({ data });
          return (
            <>
              <div
                className="di"
                style={
                  theme
                    ? { backgroundColor: "white" }
                    : { backgroundColor: `#aad779` }
                }
              >
                <div key={data.id} className="underbox">
                  {data.poster_path}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                    alt="Images"
                    className="image"
                    key={data.id}
                  />
                </div>
                <div className="title">
                  <h3>{data.title}</h3>
                  <Rating
                    initialValue={data.vote_average / 2.5}
                    readonly={true}
                  />
                   <Rating name="no-value" value={null} className="rating" /> 
                </div>
                <div className="btns">
                  <button className="bttns">Read More</button>
                </div>
              </div>
            </>
          );
        })}
      </div>