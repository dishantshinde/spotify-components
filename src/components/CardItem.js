import React from "react";
import { useNavigate } from "react-router-dom";
export default function CardItem({ image, name, desc, id, type }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/card/${type}/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: type === "artist" && "50%",
          overflow: "hidden",
        }}
      >
        <img className="object-cover w-full h-full" src={image} alt="" />
      </div>

      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
}
