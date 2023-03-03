import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>();

  const LoaderDisplay = ({
    size,
    color,
  }: {
    size: number;
    color: string;
  }): any => {
    return (
      <div className="w-min flex flex-col items-center justify-center">
        <CircularProgress size={size} style={{ color }} />
      </div>
    );
  };

  return { LoaderDisplay, setLoading, isLoading: loading };
};

export default useLoading;
