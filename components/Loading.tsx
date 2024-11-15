import { LoaderPinwheel } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="py-10 flex items-center justify-center">
      <LoaderPinwheel className="animate-spin text-primary h-6 w-6" />
    </div>
  );
};

export default Loading;
