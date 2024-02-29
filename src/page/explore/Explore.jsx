import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useGetPlaylistQuery } from "../../reduxtool/services/songsApi";
import "./Explore.css";
import ExploreList from "../../components/exploreList/ExploreList";
import { useGetMyplaylistInfoQuery } from "../../reduxtool/services/myApi";

const Explore = () => {
  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [discoverNewMusic, setDiscoverNewMusic] = useState([]);

  const playlists = [
    { title: "Released", id: "RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU" },
    {
      title: "New Music Hindi",
      id: "RDCLAK5uy_nNhhgRET3NcJ4SJBvqhAIJ6t7vjsQYowc",
    },
    {
      title: "New Indian Pop",
      id: "RDCLAK5uy_k66J6mE65JgdE4zoeNSzmw_16JB_ueINE",
    },
    {
      title: "New Music Panjab",
      id: "RDCLAK5uy_mk3xwsayv9PxawuXS-U6ao9eMeNmSwYAM",
    },
    {
      title: "New Music Haryanvi",
      id: "RDCLAK5uy_nTkyDVpCk3iCQG_3bDJyhGgb1uzcBZM4A",
    },
    {
      title: "New Music Telgu",
      id: "RDCLAK5uy_l8CaYQvBQWVT2st1VsW9JjODWisR_vd3U",
    },
    {
      title: "New Music Tamil",
      id: "RDCLAK5uy_nVQAtE2KBWk-ROQIc5o39Oup3hOLnYV0g",
    },
  ];

  const newReleased = useGetPlaylistQuery(playlists[0].id);
  const newMusicHindi = useGetPlaylistQuery(playlists[1].id);
  const newIndianPop = useGetPlaylistQuery(playlists[2].id);
  const newMusicPanjab = useGetPlaylistQuery(playlists[3].id);
  const newMusicHaryanvi = useGetPlaylistQuery(playlists[4].id);
  const newMusicTelgu = useGetPlaylistQuery(playlists[5].id);
  const newMusicTamil = useGetPlaylistQuery(playlists[6].id);

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
  console.log(data);

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
