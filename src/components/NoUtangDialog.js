import React from "react";
import { NO_UTANG_FOUND } from "../constants";
import pixelpets from "../gifs/Group-Jump-Final.gif";

const NoUtang = () => {
  return (
    <>
      <div>
        <img alt="pixelpets" style={{ height: 40, width: 125 }} src={pixelpets} />
      </div>

      <span>{NO_UTANG_FOUND}</span>
    </>
  );
};

export default NoUtang;
