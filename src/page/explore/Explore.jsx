import { useEffect, useState } from "react";
import { useGetPlaylistQuery } from "../../reduxtool/services/songsApi";
import "./Explore.css";
import ExploreList from "../../components/exploreList/ExploreList";
import { useGetMyplaylistInfoQuery } from "../../reduxtool/services/myApi";
import { latestPlaylists } from "../../utils/latestPlaylists";
const Explore = ({ miniPlayerActive }) => {
  useEffect(() => {
    document.title = "Explore Songs • Okv Music";
  }, []);

  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [discoverNewMusic, setDiscoverNewMusic] = useState([]);

  const newReleased = useGetPlaylistQuery(latestPlaylists[0].id, {
    skip: !miniPlayerActive,
  });
  const newMusicHindi = useGetPlaylistQuery(latestPlaylists[1].id, {
    skip: !miniPlayerActive,
  });
  const newIndianPop = useGetPlaylistQuery(latestPlaylists[2].id, {
    skip: !miniPlayerActive,
  });
  const newMusicPanjab = useGetPlaylistQuery(latestPlaylists[3].id, {
    skip: !miniPlayerActive,
  });
  const newMusicHaryanvi = useGetPlaylistQuery(latestPlaylists[4].id, {
    skip: !miniPlayerActive,
  });
  const newMusicTelgu = useGetPlaylistQuery(latestPlaylists[5].id, {
    skip: !miniPlayerActive,
  });
  const newMusicTamil = useGetPlaylistQuery(latestPlaylists[6].id, {
    skip: !miniPlayerActive,
  });

  useEffect(() => {
    if (
      newReleased.data &&
      newMusicHindi.data &&
      newIndianPop.data &&
      newMusicPanjab.data &&
      newMusicHaryanvi.data &&
      newMusicTamil.data &&
      newMusicTelgu.data
    ) {
      setDiscoverNewMusic([
        newReleased.data?.items[0],
        newMusicHindi.data?.items[0],
        newMusicPanjab.data?.items[0],
        newIndianPop.data?.items[0],
        newMusicHaryanvi.data?.items[0],
        newMusicTamil.data?.items[0],
        newMusicTelgu.data?.items[0],
      ]);
    }
    // eslint-disable-next-line
  }, [
    newReleased.data,
    newMusicHindi.data,
    newIndianPop.data,
    newMusicPanjab.data,
    newMusicHaryanvi.data,
    newMusicTamil.data,
    newMusicTelgu.data,
  ]);

  // get my local playlist info

  const { data, isLoading } = useGetMyplaylistInfoQuery();

  useEffect(() => {
    if (data) {
      setLocalPlaylists(data.localPlaylistsInfo);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <section className="explore-section">
      <div className="explore-container container">
        {localPlaylists?.map((localPlaylist, index) => (
          <ExploreList
            key={index}
            title={localPlaylist.playlistTitle}
            exploreData={localPlaylist.data}
            isLoading={isLoading}
            dataType="localFetch"
          />
        ))}

        <ExploreList
          title={"Discover New Music"}
          exploreData={discoverNewMusic}
          isLoading={newIndianPop.isLoading}
          dataType="youtubeFetch"
        />
      </div>
    </section>
  );
};

export default Explore;
