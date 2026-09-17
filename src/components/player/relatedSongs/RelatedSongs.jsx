import { useEffect, useRef, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedSongs } from "../../../api/getRelated";
import { addSongInfo } from "../../../reduxtool/slice/currentSongSlice";
import "./RelatedSongs.css";
import RelatedSongsSkeleton from "./RelatedSongsSkeleton";

const RelatedSongs = ({ songsList, setSongsList }) => {
  const dispatch = useDispatch();
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;
  const [isUpClick, setIsUpClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const latestRequestId = useRef(null);

  // Guards against a stale response (e.g. from a superseded request when
  // the song changes mid-fetch) overwriting state for the current song.
  const fetchRelated = async () => {
    const requestId = id;
    latestRequestId.current = requestId;
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    try {
      const result = await getRelatedSongs(requestId);
      if (latestRequestId.current !== requestId) return;
      setSongsList(result);
    } catch (error) {
      if (latestRequestId.current !== requestId) return;
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      if (latestRequestId.current === requestId) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (songsList.length === 0) {
      fetchRelated();
    }
    // eslint-disable-next-line
  }, [id]);

  const handleRedirect = (videoId) => {
    dispatch(addSongInfo({ ...currentSong, id: videoId }));
  };

  const upNextRef = useRef();
  const refreshRef = useRef();

  window.onclick = (e) => {
    if (
      !upNextRef.current?.contains(e.target) &&
      !refreshRef.current?.contains(e.target)
    ) {
      setIsUpClick(false);
    }
  };

  const handleRefetch = () => {
    fetchRelated();
  };

  return (
    <div className="related-songs-section">
      <h3 className="relate-songs-heading">Up Next Songs</h3>
      <div
        className="relate-songs-heading mobile-next cur-pointer"
        ref={upNextRef}
        onClick={() => setIsUpClick(!isUpClick)}
      >
        Up Next Songs
      </div>
      <div
        className={`related-songs-container ${
          isUpClick ? "related-songs-mobile" : ""
        }`}
      >
        <div className="refresh-container">
          <button
            type="button"
            title="refresh"
            ref={refreshRef}
            className="cur-pointer refetch-button"
            onClick={handleRefetch}
          >
            <TbRefresh
              size={20}
              className={`${isLoading ? "rotate-circle" : ""}`}
            />
            Refresh
          </button>
        </div>
        {isLoading ? (
          <RelatedSongsSkeleton amount={6} />
        ) : (
          <>
            {songsList?.length ? (
              songsList?.map((song) => (
                <div
                  className="related-songs-info-wrapper cur-pointer"
                  key={song?.index}
                  onClick={() => handleRedirect(song?.videoId)}
                >
                  <div className="related-songs-image-wrapper">
                    <img
                      src={song?.thumbnails}
                      className="related-songs-image"
                      alt={song?.title}
                    />
                    {id === song?.videoId && (
                      <div className="playing-status-wrapper">
                        <BsPlayCircleFill
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    )}
                    <small className="song-time-length">{song.length}</small>
                  </div>
                  <div className="related-songs-title-channel-wrapper">
                    <p className="related-songs-title-wrapper">{song?.title}</p>
                    <p className="related-songs-channel-wrapper">
                      • {song?.artistInfo.artist[0]?.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="related-songs-error-wrapper">
                <p className="sorry-emoji">😢</p>
                <p>Sorry! Not able to fetch related songs</p>
                {isError ? (
                  <p className="error-message">Error: {errorMessage}</p>
                ) : null}
                <button
                  type="button"
                  className="cur-pointer refetch-button"
                  onClick={fetchRelated}
                >
                  Refetch
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedSongs;
