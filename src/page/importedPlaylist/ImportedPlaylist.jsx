import React, { useState } from "react";
import "./ImportedPlaylist.css";
import { useDispatch, useSelector } from "react-redux";
import { removePlaylist } from "../../reduxtool/slice/songsSlice";
import AddPlaylist from "../../components/addPlaylist/AddPlaylist";
import { MdDeleteForever } from "react-icons/md";
import Popup from "../../components/popup/Popup";
import { HiOutlineTrash } from "react-icons/hi2";
import SongsList from "../../components/songsList/SongsList";
const ImportedPlaylist = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState([]);

  // local playlist
  const myLocalPlaylistInfo = useSelector(
    (state) => state.songsSlice.myPlaylistInfo
  );

  const dispatch = useDispatch();

  const hanldeCheck = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedPlaylistId([...selectedPlaylistId, value]);
    } else {
      const updated = selectedPlaylistId.filter((item) => item !== value);
      setSelectedPlaylistId(updated);
    }
  };

  const handleDeleteLocalplaylist = () => {
    selectedPlaylistId.map((item) => dispatch(removePlaylist(item)));
    setIsPopup(false);
  };

  return (
    <div className="container">
      <div className="imported-playlist">
        <h2>Imported YT Playlist</h2>
        {myLocalPlaylistInfo?.length ? (
          <button
            type="button"
            title="delete playlist"
            className="playlist-delete-btn"
            disabled={selectedPlaylistId.length === 0}
            onClick={() => {
              setIsPopup(true);
            }}
          >
            <MdDeleteForever size={20} />
            Delete
          </button>
        ) : null}
      </div>
      {myLocalPlaylistInfo?.map((playlist, index) => (
        <div key={playlist.id} className="imported-playlist-wrapper">
          <input
            type="checkbox"
            title="checkbox"
            name={playlist.id}
            value={playlist.id}
            className="checkbox-input"
            onChange={(e) => hanldeCheck(e)}
          />
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
          subtitle={"Are you sure you want to delete the selected playlist?"}
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

export default ImportedPlaylist;
