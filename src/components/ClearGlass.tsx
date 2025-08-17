import React from "react";
import glassEffect from "./glass-effect.svg";

export const ClearGlass = (): JSX.Element => {
  return (
    <div className="relative w-[362px] h-16">
      <div className="relative w-[442px] h-36 -top-[35px] -left-10 bg-[url('/shadow.svg')] bg-cover bg-[50%_50%]">
        <img
          className="absolute w-[362px] h-16 top-[35px] left-10 bg-blend-screen object-cover pointer-events-none select-none"
          alt="Glass effect"
          src={glassEffect}
        />
      </div>
    </div>
  );
};

export default ClearGlass;


