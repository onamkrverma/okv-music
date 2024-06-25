import React, { useEffect, useState } from "react";
import "./Home.css";
import { useGetPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import SongsList from "../../components/songsList/SongsList";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyPlaylistSongs,
  addSongs,
  removePlaylist,
  removePlaylistSongs,
} from "../../reduxtool/slice/songsSlice";
import HeroBanner from "./heroBanner/HeroBanner";
import AddPlaylist from "../../components/addPlaylist/AddPlaylist";
import { MdDeleteForever } from "react-icons/md";
import Popup from "../../components/popup/Popup";
import { HiOutlineTrash } from "react-icons/hi2";

const Home = ({ miniPlayerActive }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    document.title = "Home • Okv Music";
  }, []);

  const playlistId = {
    newRelesedId: "RDCLAK5uy_nNhhgRET3NcJ4SJBvqhAIJ6t7vjsQYowc",
    trendingSongsId: "OLAK5uy_lSTp1DIuzZBUyee3kDsXwPgP25WdfwB40",
    bollywoodHitsId: "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
  };
  // local playlist
  const myLocalPlaylist = useSelector(
    (state) => state.songsSlice.myPlaylistData
  );

  const dispatch = useDispatch();
  const songsData = useSelector((state) => state.songsSlice.songsData);
  const myPlaylistSongs = useSelector(
    (state) => state.songsSlice.myPlaylistSongs
  );

  const newSongs = useGetPlaylistItemsQuery(playlistId.newRelesedId, {
    skip: !miniPlayerActive,
  });
  const trendingSongs = useGetPlaylistItemsQuery(playlistId.trendingSongsId, {
    skip: !miniPlayerActive,
  });
  const bollywoodHitsSongs = useGetPlaylistItemsQuery(
    playlistId.bollywoodHitsId,
    { skip: !miniPlayerActive }
  );

  const localPlaylist0 = useGetPlaylistItemsQuery(
    myLocalPlaylist[0]?.playlistId,
    { skip: myLocalPlaylist[0] === undefined || !miniPlayerActive }
  );

  const localPlaylist1 = useGetPlaylistItemsQuery(
    myLocalPlaylist[1]?.playlistId,
    { skip: myLocalPlaylist[1] === undefined || !miniPlayerActive }
  );

  useEffect(() => {
    if (trendingSongs.data && newSongs.data && bollywoodHitsSongs.data) {
      dispatch(
        addSongs([
          {
            data: trendingSongs.data,
            metaData: {
              title: "Trending Songs",
              playlist: playlistId.trendingSongsId,
              isLoading: trendingSongs.isLoading,
            },
          },

          {
            data: newSongs.data,
            metaData: {
              title: "New Relased",
              playlist: playlistId.newRelesedId,
              isLoading: newSongs.isLoading,
            },
          },
          {
            data: bollywoodHitsSongs.data,
            metaData: {
              title: "Bollywood Hits",
              playlist: playlistId.bollywoodHitsId,
              isLoading: bollywoodHitsSongs.isLoading,
            },
          },
        ])
      );
    }

    // eslint-disable-next-line
  }, [trendingSongs.data, newSongs.data, bollywoodHitsSongs.data]);

  // add local playlist songs

  useEffect(() => {
    const playlistSongs = [];
    if (localPlaylist0?.currentData) {
      playlistSongs.push({
        data: localPlaylist0.data,
        metaData: {
          title: myLocalPlaylist[0]?.title,
          playlist: myLocalPlaylist[0]?.playlistId,
          isLoading: localPlaylist0.isLoading,
        },
      });
    }

    if (localPlaylist1?.currentData) {
      playlistSongs.push({
        data: localPlaylist1.data,
        metaData: {
          title: myLocalPlaylist[1]?.title,
          playlist: myLocalPlaylist[1]?.playlistId,
          isLoading: localPlaylist1.isLoading,
        },
      });
    }

    if (playlistSongs.length > 0) {
      dispatch(addMyPlaylistSongs(playlistSongs));
    }
  }, [myLocalPlaylist, localPlaylist0?.data, localPlaylist1?.data]);

  // handle delete local playlist

  const handleDeleteLocalplaylist = () => {
    dispatch(removePlaylistSongs(selectedPlaylistId));
    dispatch(removePlaylist(selectedPlaylistId));
    setIsPopup(false);
  };
  useEffect(() => {
    if (!isPopup) {
      setSelectedPlaylistId(null);
    }
  }, [isPopup]);

  return (
    <div className="home-section">
      <HeroBanner
        songsData={songsData[0]?.data?.items}
        isLoading={songsData[0]?.metaData?.isLoading}
      />

      {!songsData.length ? (
        <>
          <SongsList isLoading={newSongs.isLoading} />
          <SongsList isLoading={newSongs.isLoading} />
          <SongsList isLoading={newSongs.isLoading} />
        </>
      ) : (
        songsData.map((songs) => (
          <SongsList
            key={songs.metaData?.title}
            title={songs.metaData?.title}
            songsData={songs.data?.items}
            // isLoading={songs.metaData?.isLoading}
            playlistId={songs.metaData?.playlist}
          />
        ))
      )}

      {/* my playlist */}
      {myPlaylistSongs?.map((songs, index) => (
        <div key={index}>
          <div className="local-playlist-container container ">
            <p>Your imported Youtube playlist {index + 1} </p>
            <button
              type="button"
              title="delete playlist"
              className="playlist-delete-btn"
              onClick={() => {
                setIsPopup(true),
                  setSelectedPlaylistId(songs.metaData?.playlist);
              }}
            >
              <MdDeleteForever style={{ width: "100%", height: "100%" }} />
            </button>
          </div>

          <SongsList
            title={songs.metaData?.title}
            songsData={songs.data?.items}
            isLoading={songs.metaData?.isLoading}
            playlistId={songs.metaData?.playlist}
          />
        </div>
      ))}
      <Popup
        Icon={<HiOutlineTrash size={50} color="white" />}
        title={"Delete Playlist"}
        subtitle={"Are you sure you want to delete this playlist?"}
        primaryBtnText={"Delete"}
        secondaryBtnText={"Cancel"}
        isPopup={isPopup}
        setIsPopup={setIsPopup}
        handleSecondaryBtn={() => {
          setIsPopup(false);
        }}
        handlePrimaryBtn={handleDeleteLocalplaylist}
      />

      {/* add playlist button */}
      <AddPlaylist />
    </div>
  );
};

export default Home;
