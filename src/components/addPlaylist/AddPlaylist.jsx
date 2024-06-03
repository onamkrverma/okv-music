import React, { useEffect, useRef, useState } from "react";
import "./AddPlaylist.css";
import { BsYoutube } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../reduxtool/slice/songsSlice";

const AddPlaylist = () => {
  const [isAddPlaylist, setIsAddPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const dispatch = useDispatch();
  // local playlist
  const myLocalPlaylist = useSelector(
    (state) => state.songsSlice.myPlaylistData
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
        dispatch(addPlaylist([...myLocalPlaylist, { title, playlistId }]));
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
    <div
      className={`add-your-playlist-container container ${
        myLocalPlaylist.length >= 2 ? "hide" : ""
      } `}
    >
      <button
        type="button"
        title="add-palylist"
        className="add-your-playlist-btn cur-pointer"
        onClick={() => setIsAddPlaylist(true)}
      >
        <BsYoutube style={{ width: "30%", height: "30%", color: "#171717" }} />
        <span>Import Youtube Playlist</span>
      </button>

      {/* add playlist model */}

      <div
        className={`${
          isAddPlaylist ? "add-playlist-model-wrapper absolute-center" : "hide"
        }`}
      >
        <div
          className="model-overlayer"
          onClick={() => setIsAddPlaylist(false)}
        ></div>
        <div className="add-playlist-model">
          <span
            className="add-playlist-model-close cur-pointer"
            onClick={() => setIsAddPlaylist(false)}
          >
            <RxCross2 style={{ width: "100%", height: "100%" }} />
          </span>
          <form
            className="add-playlist-form"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <p className="add-playlist-form-title">
              Add your favourite Youtube playlist
            </p>

            <div className="title-input-wrapper">
              <p>Title</p>
              <input
                type="text"
                name="title"
                placeholder="Enter playlist title "
                minLength={3}
                required
              />
            </div>
            <div className="title-input-wrapper">
              <p>Playlist Link</p>
              <input
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
