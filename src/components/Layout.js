import React from "react";
import Header from "./Header";

export default function Layout({
  children,
  setIndex,
  inputValue,
  setInputValue,
  setTheme,
  theme,
  index,
}) {
  return (
    <>
      <div>
        <Header
          index={index}
          setIndex={setIndex}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setTheme={setTheme}
          theme={theme}
        />
        {children}
      </div>
    </>
  );
}
