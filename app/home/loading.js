import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading(props) {
  return (
    <div className="mt-10 md:mt-20 px-4 md:px-20 mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-primary ">
          {props.page === "queuePage" ? "Song Requests Queue" : "My Queue"}
        </h2>
      </div>
      <Skeleton className="mt-3 bg-card rounded-lg md:rounded-xl py-4 px-2 md:px-8 h-32">
        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-4 md:gap-10 grow">
            <div className="flex flex-col gap-1">
              <p className="text-primary text-xl md:text-2xl font-semibold"></p>
              <p className="md:text-lg text-sm text-gray-400"></p>
              <p className="md:text-lg text-xs text-gray-500"></p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-28 md:max-w-48"></div>
        </div>
      </Skeleton>
      <Skeleton className="mt-3 bg-card rounded-lg md:rounded-xl py-4 px-2 md:px-8 h-32">
        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-4 md:gap-10 grow">
            <div className="flex flex-col gap-1">
              <p className="text-primary text-xl md:text-2xl font-semibold"></p>
              <p className="md:text-lg text-sm text-gray-400"></p>
              <p className="md:text-lg text-xs text-gray-500"></p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-28 md:max-w-48"></div>
        </div>
      </Skeleton>
      <Skeleton className="mt-3 bg-card rounded-lg md:rounded-xl py-4 px-2 md:px-8 h-32">
        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-4 md:gap-10 grow">
            <div className="flex flex-col gap-1">
              <p className="text-primary text-xl md:text-2xl font-semibold"></p>
              <p className="md:text-lg text-sm text-gray-400"></p>
              <p className="md:text-lg text-xs text-gray-500"></p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-28 md:max-w-48"></div>
        </div>
      </Skeleton>
    </div>
  );
}

export default Loading;
