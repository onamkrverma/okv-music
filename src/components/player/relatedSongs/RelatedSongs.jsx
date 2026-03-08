import { useEffect, useRef, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useGetRelatedSongsQuery } from "../../../reduxtool/services/myApi";
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
  const [shouldFetch, setShouldFetch] = useState(songsList.length === 0);

  const { data, isLoading, isError, error, refetch } = useGetRelatedSongsQuery(
    id,
    {
      skip: !shouldFetch,
    }
  );

  useEffect(() => {
    if (data) {
      setSongsList(data.result);
      setShouldFetch(false);
    }
    // eslint-disable-next-line
  }, [data]);

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
    if (!shouldFetch) {
      setShouldFetch(true);
    } else {
      refetch();
    }
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
              className={`${shouldFetch ? "rotate-circle" : ""}`}
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
                  <p className="error-message">Error: {error?.data?.error}</p>
                ) : null}
                <button
                  type="button"
                  className="cur-pointer refetch-button"
                  onClick={() => refetch()}
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
