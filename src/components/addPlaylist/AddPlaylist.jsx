import React, { useEffect, useRef, useState } from "react";
import "./AddPlaylist.css";
import { BsYoutube } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylistInfo } from "../../reduxtool/slice/songsSlice";

const AddPlaylist = () => {
  const [isAddPlaylist, setIsAddPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const dispatch = useDispatch();
  // local playlist
  const myLocalPlaylist = useSelector(
    (state) => state.songsSlice.myPlaylistInfo
  );

  useEffect(() => {
    document.body.style.overflow = isAddPlaylist ? "hidden" : "auto";
  }, [isAddPlaylist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) {
      setErrorMessage("");
    }
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const title = formData.get("title").trim();
        const playlistLink = formData.get("playlistLink");
        const url = new URL(playlistLink);
        const playlistId = url.searchParams.get("list");
        if (!playlistId) return setErrorMessage("Playlist id Not Found");
        dispatch(addPlaylistInfo({ title, id: playlistId }));
      }
      e.target.reset();
      setIsAddPlaylist(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };
  localStorage.setItem("myPlaylist", JSON.stringify(myLocalPlaylist));
  return (
    <div className={`add-your-playlist-container container `}>
      <button
        type="button"
        title="add-palylist"
        className="add-your-playlist-btn cur-pointer"
        onClick={() => setIsAddPlaylist(true)}
      >
        <BsYoutube style={{ width: "30%", height: "30%", color: "#171717" }} />
        <span>Add Youtube Playlist</span>
      </button>

      {/* add playlist model */}

      <div
        className={`${
          isAddPlaylist ? "popup-wrapper absolute-center" : "hide"
        }`}
      >
        <div
          className="popup-overlayer"
          onClick={() => setIsAddPlaylist(false)}
        ></div>
        <div className="popup">
          <button
            type="button"
            title="close"
            className="popup-close-btn cur-pointer"
            onClick={() => {
              setIsAddPlaylist(false), formRef.current?.reset();
            }}
          >
            <RxCross2 size={25} />
          </button>
          <form
            className="add-playlist-form"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <h2 className="add-playlist-form-title">
              Add your favourite Youtube playlist
            </h2>

            <div className="title-input-wrapper">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter playlist title "
                minLength={3}
                required
              />
            </div>
            <div className="title-input-wrapper">
              <label htmlFor="playlistLink">Playlist Link</label>
              <input
                id="playlistLink"
                type="text"
                name="playlistLink"
                placeholder="Enter Youtube playlist link"
                minLength={10}
                required
              />
            </div>
            <button type="submit" className="form-submit-btn cur-pointer">
              Submit
            </button>
            <p>{errorMessage}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylist;
