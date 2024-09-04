import React, { useEffect } from "react";
import "./Home.css";
import SongsList from "../../components/songsList/SongsList";

import { homepagePlaylistInfo } from "../../utils/homepagePlaylists";

const Home = () => {
  useEffect(() => {
    document.title = "Top Trending Songs in India • Okv Music";
  }, []);

  return (
    <div className="home-section">
      {homepagePlaylistInfo.map((playlist) => (
        <SongsList
          key={playlist.id}
          playlistId={playlist.id}
          title={playlist.title}
        />
      ))}
    </div>
  );
};

export default Home;
