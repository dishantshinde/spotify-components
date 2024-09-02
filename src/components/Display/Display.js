import React, { useEffect, useRef } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Displayhome from "../routescompo/displayhome";
import DisplayCard from "../DisplayCard";

export default function Display() {
  const displayRef = useRef();
  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<Displayhome />} />
        <Route
          path="/card/:type/:id"
          element={<DisplayCard displayRef={displayRef} />}
        />
      </Routes>
    </div>
  );
}
