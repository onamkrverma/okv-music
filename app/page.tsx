import Card from "@/components/Card";
import { homePlaylistId } from "@/utils/playlistIds";
import { PlaylistItems } from "@/utils/youTubeApi.d";
import { getPlaylistItems } from "@/utils/youTubeApi";
import Link from "next/link";

const Home = async () => {
  const playlistSongs = await Promise.all(
    homePlaylistId.map(async (item) => {
      const data: PlaylistItems = await getPlaylistItems({
        playlistId: item.playlistId,
      });
      return {
        title: item.title,
        data,
      };
    })
  );

  return (
    <div className="page-container flex flex-col gap-6">
      {playlistSongs.map((playlistSong) => (
        <div key={playlistSong.data.etag} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{playlistSong.title}</h2>
            <Link href={"/"} className="text-sm hover:underline">
              View all
            </Link>
          </div>
          <div className="flex items-center gap-4 p-1.5 overflow-x-auto">
            {playlistSong.data.items.map((item) => (
              <Card
                key={item.id}
                title={item.snippet.title}
                imageSrc={
                  item.snippet.thumbnails.maxres
                    ? item.snippet.thumbnails.maxres.url
                    : item.snippet.thumbnails.high.url
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
