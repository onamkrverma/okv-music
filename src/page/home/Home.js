import React, { useEffect } from "react";
import "./Home.css";
import { useGetPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import Header from "../../components/header/Header";
import SongsList from "../../components/songsList/SongsList";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyPlaylistSongs,
  addSongs,
  removePlaylist,
  removePlaylistSongs,
} from "../../reduxtool/slice/songsSlice";
import HeroBanner from "./heroBanner/HeroBanner";
import Player from "../../components/player/Player";
import AddPlaylist from "../../components/addPlaylist/AddPlaylist";
import { MdDeleteForever } from "react-icons/md";

const Home = () => {
  const playlistId = {
    newRelesedId: "RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU",
    trendingSongsId: "PL_yIBWagYVjwYmv3PlwYk0b4vmaaHX6aL",
    bollywoodHitsId: "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
    punjabiFireId: "RDCLAK5uy_kuo_NioExeUmw07dFf8BzQ64DFFTlgE7Q",
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

  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  const newSongs = useGetPlaylistItemsQuery(playlistId.newRelesedId);
  const trendingSongs = useGetPlaylistItemsQuery(playlistId.trendingSongsId);
  const bollywoodHitsSongs = useGetPlaylistItemsQuery(
    playlistId.bollywoodHitsId
  );

  const locaPlaylist0 = useGetPlaylistItemsQuery(
    myLocalPlaylist[0]?.playlistId,
    { skip: !myLocalPlaylist[0]?.playlistId }
  );
  const locaPlaylist1 = useGetPlaylistItemsQuery(
    myLocalPlaylist[1]?.playlistId,
    { skip: !myLocalPlaylist[1]?.playlistId }
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
    if (locaPlaylist0?.data) {
      dispatch(
        addMyPlaylistSongs([
          {
            data: locaPlaylist0?.data,
            metaData: {
              title: myLocalPlaylist[0]?.title,
              playlist: myLocalPlaylist[0]?.playlistId,
              isLoading: locaPlaylist0.isLoading,
            },
          },
        ])
      );
    }

    if (locaPlaylist1?.data) {
      dispatch(
        addMyPlaylistSongs([
          {
            data: locaPlaylist0?.data,
            metaData: {
              title: myLocalPlaylist[0]?.title,
              playlist: myLocalPlaylist[0]?.playlistId,
              isLoading: locaPlaylist0.isLoading,
            },
          },
          {
            data: locaPlaylist1?.data,
            metaData: {
              title: myLocalPlaylist[1]?.title,
              playlist: myLocalPlaylist[1]?.playlistId,
              isLoading: locaPlaylist1.isLoading,
            },
          },
        ])
      );
    }

    // eslint-disable-next-line
  }, [myLocalPlaylist, locaPlaylist0?.data, locaPlaylist1?.data]);

  return (
    <div className="home-section">
      <Header />
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
        <div key={songs.metaData?.title}>
          <div className="local-playlist-container container ">
            <p>Your imported Youtube playlist {index + 1} </p>
            <button
              type="button"
              title="delete playlist"
              className="playlist-delete-btn"
              onClick={() => {
                dispatch(removePlaylistSongs(songs.metaData?.playlistId));
                dispatch(removePlaylist(songs.metaData?.playlistId));
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
      {/* add playlist button */}
      <AddPlaylist />

      {id ? <Player /> : null}
    </div>
  );
};

export default Home;
