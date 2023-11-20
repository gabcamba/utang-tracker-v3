import React from "react";
import { NO_UTANG_FOUND } from "../constants";
import mimi from "../gifs/Mimi-GIFV2-lg.gif";
import peach from "../gifs/Peach-GIFV2-lg.gif";
import yuki from "../gifs/Yuki-GIFV2-lg.gif";
import zoe from "../gifs/Zoe-GIF-lg.gif";

const NoUtang = () => {
  return (
    <>
      <div>
        <img alt="peach" style={{ height: 40, width: 40 }} src={peach} />
        <img
          alt="zoe"
          style={{ height: 40, width: 40, marginBottom: 2 }}
          src={zoe}
        />
        <img alt="mimi" style={{ height: 40, width: 40 }} src={mimi} />
        <img
          alt="yuki"
          style={{ height: 40, width: 40, marginBottom: 2 }}
          src={yuki}
        />
      </div>

      <span>{NO_UTANG_FOUND}</span>
    </>
  );
};

export default NoUtang;
