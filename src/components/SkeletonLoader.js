import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonLoader = ({ count }) => {
  return (
    <>
      {Array(50)
        .fill(1)
        .map((el, i) => (
          <Skeleton
            sx={{ margin: 2 }}
            variant="rounded"
            width={"92%"}
            height={60}
          />
        ))}
    </>
  );
};

export default SkeletonLoader;
