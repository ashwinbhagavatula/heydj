import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading(props) {
  return (
    <div className="mt-10 md:mt-16 px-4 md:px-20 max-w-7xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient-white">
          {props.page === "queuePage" ? "Song Requests Queue" : "My Queue"}
        </h2>
      </div>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="mt-3 rounded-2xl h-32" />
      ))}
    </div>
  );
}

export default Loading;
