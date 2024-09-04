import { useEffect } from "react";
import "./Explore.css";
import ExploreList from "../../components/exploreList/ExploreList";
import { latestPlaylists } from "../../utils/latestPlaylists";

const Explore = () => {
  useEffect(() => {
    document.title = "Explore Songs • Okv Music";
  }, []);

  return (
    <section className="explore-section">
      <div className="explore-container container">
        <div>
          <h2>Discover New Music</h2>
          <div className="explore-inside">
            {latestPlaylists.map((playlist, index) => (
              <ExploreList
                key={playlist.id}
                playlistId={playlist.id}
                serverType="ytServer"
              />
            ))}
          </div>
        </div>
        <ExploreList serverType="myServer" />
      </div>
    </section>
  );
};

export default Explore;
