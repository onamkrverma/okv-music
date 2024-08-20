import React from "react";
import PlayIcon from "@/public/icons/play.svg";
import PauseIcon from "@/public/icons/pause.svg";
import NextIcon from "@/public/icons/next.svg";
import PreviousIcon from "@/public/icons/previous.svg";

const PlayerControls = () => {
  return (
    <div>
      {/* seekbar and duration */}
      <div className="w-full flex flex-col gap-2  items-center justify-center">
        <input
          type="range"
          // value={0}
          min={0}
          max={2}
          className="h-1.5 w-full cursor-pointer accent-action-500"
          step="any"
          // onChange={(e) => setSeekTime(e.target.valueAsNumber)}
        />
        <div className="flex w-full justify-between items-center">
          <p className="text-sm">00:00</p>
          <p className="text-sm">01:00</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button type="button" title="Prev">
          <PreviousIcon className="w-8 h-8" />
        </button>
        <button type="button" title="Play/Pause">
          <PlayIcon className="w-14 h-14" />
        </button>
        <button type="button" title="Next">
          <NextIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
