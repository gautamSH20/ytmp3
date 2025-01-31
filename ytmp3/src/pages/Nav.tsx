import { useState } from "react";
import { DarkIcon, LinghtIcon } from "../assets/Place";

interface navInter {
  onclick: () => void;
}

export const Nav = (prop: navInter) => {
  const [light, setLight] = useState(true);
  return (
    <div className=" flex md:justify-between shadow-md w-[40vh] justify-between md:w-[110vh] p-3 rounded text-xl dark:text-black text-sky-200 dark:bg-[#1e2939] bg-linear-to-bl from-violet-600 to-fuchsia-600">
      IN-YT2MP4
      <button
        onClick={() => {
          prop.onclick();
          setLight((e) => !e);
        }}
        className="cursor-pointer"
      >
        {light ? <DarkIcon /> : <LinghtIcon />}
      </button>
    </div>
  );
};
