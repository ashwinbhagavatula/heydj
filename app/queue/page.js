import PublicQueue from "@/components/PublicQueue";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <PublicQueue />
    </Suspense>
  );
};

export default Page;
