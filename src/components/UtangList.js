import React from "react";
import UtangItem from "./UtangItem";
import SkeletonLoader from "./SkeletonLoader";
import { GOOD_JOB, NO_UTANG_FOUND } from "../constants";

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
              {NO_UTANG_FOUND} <br /> {GOOD_JOB}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default UtangList;
