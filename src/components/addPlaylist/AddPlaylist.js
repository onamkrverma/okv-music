import React, { useEffect, useRef, useState } from "react";
import "./AddPlaylist.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const AddPlaylist = () => {
  const [isAddPlaylist, setisAddPlaylist] = useState(false);
  const formRef = useRef(null);
  // local playlist id
  const myLocalPlaylist = JSON.parse(localStorage.getItem("myPlaylist"));
  const [myPlaylist, setMyPlaylist] = useState(myLocalPlaylist || []);

  useEffect(() => {
    document.body.style.overflow = isAddPlaylist ? "hidden" : "auto";
  }, [isAddPlaylist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const title = formData.get("title");
      const playlistId = formData.get("playlistId");
      setMyPlaylist([...myPlaylist, { title, playlistId }]);
    }
    e.target.reset();
    window.location.reload();
  };
  localStorage.setItem("myPlaylist", JSON.stringify(myPlaylist));

  return (
    <div className="add-your-playlist-container container ">
      <button
        type="button"
        title="add-palylist"
        className="add-your-playlist-btn cur-pointer"
        onClick={() => setisAddPlaylist(true)}
      >
        <AiOutlinePlusCircle
          style={{ width: "30%", height: "30%", color: "#04152d" }}
        />
        <span>Add Your Playlist</span>
      </button>

      {/* add playlist model */}

      <div
        className={`${
          isAddPlaylist ? "add-playlist-model-wrapper absolute-center" : "hide"
        }`}
      >
        <div
          className="model-overlayer"
          onClick={() => setisAddPlaylist(false)}
        ></div>
        <div className="add-playlist-model">
          <span
            className="add-playlist-model-close cur-pointer"
            onClick={() => setisAddPlaylist(false)}
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
              <p>Playlist Id</p>
              <input
                type="text"
                name="playlistId"
                placeholder="Enter youtube playlist id"
                minLength={3}
                required
              />
            </div>
            <button type="submit" className="form-submit-btn cur-pointer">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylist;
