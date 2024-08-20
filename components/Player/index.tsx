import Image from "next/image";
import React from "react";
import PlayerControls from "./PlayerControls";

const Player = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full backdrop-blur-lg bg-primary/50">
      <div className="flex justify-around items-center w-full h-full">
        {/* Current Song */}
        <div className="flex flex-col gap-4 p-4 rounded-xl border border-white h-[500px]">
          <div className="w-[400px] h-[225px] rounded-md">
            <Image
              src={"https://i.ytimg.com/vi/Kp95Wat3YsA/maxresdefault.jpg"}
              alt="Song"
              width={400}
              height={225}
              className="w-full h-full rounded-md"
            />
          </div>
          <div className="text-center">
            <p>Nikle The Kabhi Hum Ghar Se</p>
            <small>T-Series</small>
          </div>
          <PlayerControls />
        </div>

        {/* Upcomming Songs */}
        <div className="w-1/3 h-40 bg-secondary">
          <h2>Up Next Songs</h2>
        </div>
      </div>
    </div>
  );
};

export default Player;
