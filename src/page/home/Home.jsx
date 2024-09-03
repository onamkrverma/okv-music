import React, { useEffect, useState } from "react";
import "./Home.css";
import { useGetPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import SongsList from "../../components/songsList/SongsList";
import { useDispatch, useSelector } from "react-redux";
import { removePlaylist } from "../../reduxtool/slice/songsSlice";
import AddPlaylist from "../../components/addPlaylist/AddPlaylist";
import { MdDeleteForever } from "react-icons/md";
import Popup from "../../components/popup/Popup";
import { HiOutlineTrash } from "react-icons/hi2";
import { homepagePlaylistInfo } from "../../utils/homepagePlaylists";

const Home = () => {
  useEffect(() => {
    document.title = "Top Trending Songs in India • Okv Music";
  }, []);

  const [isPopup, setIsPopup] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  // local playlist
  const myLocalPlaylistInfo = useSelector(
    (state) => state.songsSlice.myPlaylistInfo
  );

  const dispatch = useDispatch();

  const handleDeleteLocalplaylist = () => {
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
      {homepagePlaylistInfo.map((playlist) => (
        <SongsList
          key={playlist.id}
          playlistId={playlist.id}
          title={playlist.title}
        />
      ))}

      {/* my playlist */}
      {myLocalPlaylistInfo?.map((playlist, index) => (
        <div key={playlist.id}>
          <div className="local-playlist-container container ">
            <p>Your imported Youtube playlist {index + 1} </p>
            <button
              type="button"
              title="delete playlist"
              className="playlist-delete-btn"
              onClick={() => {
                setIsPopup(true), setSelectedPlaylistId(playlist.id);
              }}
            >
              <MdDeleteForever style={{ width: "100%", height: "100%" }} />
            </button>
          </div>

          <SongsList
            key={playlist.id}
            title={playlist.title}
            playlistId={playlist.id}
          />
        </div>
      ))}
      {isPopup ? (
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
      ) : null}

      {/* add playlist button */}
      <AddPlaylist />
    </div>
  );
};

export default Home;
