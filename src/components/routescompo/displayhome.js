import React from "react";
import Navbar from "../navbar";
import { albumsData } from "../../assets/assets";
import Card from "./../card/card";
import CardItem from "../CardItem";
import { useSelector } from "react-redux";
export default function Displayhome() {
  const artistData = useSelector((state) => state.artistData.artists);
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, indx) => (
            <CardItem
              key={indx}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              type="album"
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">featured Charts</h1>
        <div className="flex overflow-auto">
          {artistData.map((item, indx) => (
            <CardItem
              key={indx}
              name={item.name}
              desc="Artist"
              id={item.artistid}
              image={item.image}
              type="artist"
            />
          ))}
        </div>
      </div>
    </>
  );
}
