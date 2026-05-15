import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const USERNAME = "Neopetcemetery";
const ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

export default function NowPlaying() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch(ENDPOINT);
        const data = await res.json();
        const latest = data.recenttracks?.track?.[0];
        if (latest) {
          setTrack({
            name: latest.name,
            artist: latest.artist["#text"],
            album: latest.album["#text"],
            image: latest.image?.[2]?.["#text"] || "",
            isPlaying: latest["@attr"]?.nowplaying === "true",
            url: latest.url,
          });
        }
      } catch {
        setTrack(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTrack();
    const id = setInterval(fetchTrack, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <a
      href={track?.url || `https://www.last.fm/user/${USERNAME}`}
      target="_blank"
      rel="noopener noreferrer"
      className="now-playing text-decoration-none"
    >
      {/* Full-bleed album art */}
      {track?.image && (
        <img src={track.image} alt={track?.album} className="now-playing__bg" />
      )}
      <div className="now-playing__overlay" />

      {/* Top label */}
      <div className="now-playing__header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
        </svg>
        <span>{loading ? "Loading…" : track?.isPlaying ? "Now Playing" : "Last Played"}</span>
      </div>

      {/* Bottom track info */}
      {track && !loading && (
        <div className="now-playing__footer">
          <span className="now-playing__track">{track.name}</span>
          <span className="now-playing__artist">{track.artist}</span>
        </div>
      )}

      {track?.isPlaying && (
        <div className="now-playing__bars">
          <span /><span /><span /><span />
        </div>
      )}
    </a>
  );
}
