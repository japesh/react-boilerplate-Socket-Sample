import React from "react";
export default function List({ data, renderRow }) {
  return (
    <div>
      {data.length === 0 ? <div>Loading....</div> : data.map(renderRow)}
    </div>
  );
}
