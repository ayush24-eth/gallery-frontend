// import { useState } from "react";
import "./App.css";
import ImageUploader from "./ImageUploader";
import GetImage from "./GetImage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ImageUploader />
                <GetImage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>

                {/* <ImageUploader /> */}
                {/* <GetImage /> */}
    </>
  );
}

export default App;
