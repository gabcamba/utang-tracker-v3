import React from "react";
import UtangItem from "./UtangItem";
import { Skeleton } from "@mui/material";
import SkeletonLoader from "./SkeletonLoader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const UtangList = ({
  utangs,
  isFetching,
  setIsFetching,
  setSnackDeleteOpen,
}) => {
  return (
    <>
      <div className="utang-list">
        {isFetching ? (
          <>
            <SkeletonLoader count={50} />
          </>
        ) : utangs.length ? (
          utangs.map((utang) => (
            <UtangItem
              key={utang.uid}
              utang={utang}
              setIsFetching={setIsFetching}
              setSnackDeleteOpen={setSnackDeleteOpen}
            />
          ))
        ) : (
          <div className="no-utang">
            <span>
              No utangs found. <br /> Good job Gab & Mei!
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default UtangList;
