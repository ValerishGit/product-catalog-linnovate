import { Loader2Icon } from "lucide-react";
import React from "react";

function CustomLoader() {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Loader2Icon className="animate-spin"></Loader2Icon>
    </div>
  );
}

export default CustomLoader;
