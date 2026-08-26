"use client";

import { useRef, useState } from "react";

const archiveBase = "https://old08-15.agiki.ru/music/audio/8/";

const tracks = [
  {
    title: "Эбэм ырыата (Песня бабушки)",
    performer: "Готовцева Анна Егоровна",
    duration: 5.4,
    src: `${archiveBase}1.%20Песня%20бабушки.%20Исп.%20А.Е.%20Горохова.mp3`,
  },
  {
    title: "Эбэҥкилии ырыа (Эвенкийская песня)",
    performer: "Готовцева Анна Егоровна",
    duration: 63.072,
    src: `${archiveBase}3.%20Эвенкийская%20песня%20Исп.%20А.Е.%20Горохова.mp3`,
  },
  {
    title: "Табаны ыҥырыы (Зов оленя)",
    performer: "Николаев Егор Иосифович",
    duration: 18.756,
    src: `${archiveBase}4.%20Зов%20оленя.%20Звукоподражание.%20Е.И.%20Николаев.mp3`,
  },
  {
    title: "Морсуо оҕото (Песня о Морсуо)",
    performer: "Обрядовый коллектив «Дылкэн»",
    duration: 89.568,
    src: `${archiveBase}7.%20Морсуо%20о5ото.%20Квинтет%20Илкэн.mp3`,
  },
  {
    title: "Ёхорьё (эвенкийский круговой танец)",
    performer: "Н. П. Колодезникова, М. И. Егорова, Л. И. Лыскаева",
    duration: 35.88,
    src: `${archiveBase}10.%20Ехорье.mp3`,
  },
];

const bars = [18,26,34,23,43,50,38,60,31,48,64,54,70,42,28,55,78,65,44,61,83,72,53,47,66,57,38,50,42,29,34,24,20];

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function PlayerIcon({ paused }) {
  if (paused) {
    return (
      <svg className="playerIcon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="5" width="4" height="14" rx="2" fill="currentColor" />
        <rect x="14" y="5" width="4" height="14" rx="2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className="playerIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 6.7c0-1.1 1.2-1.8 2.1-1.2l8 5.3c.8.5.8 1.7 0 2.2l-8 5.3c-.9.6-2.1 0-2.1-1.2V6.7Z" fill="currentColor" />
    </svg>
  );
}

function SkipIcon({ direction }) {
  const previous = direction === "previous";
  return (
    <svg className="skipIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={previous ? "M7 5v14M18 6.5 10 12l8 5.5Z" : "M17 5v14M6 6.5l8 5.5-8 5.5Z"} />
    </svg>
  );
}

export default function AudioArchive() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(tracks[0].duration);
  const currentTrack = tracks[currentIndex];

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();

    return audio.play().catch(() => setPlaying(false));
  };

  const loadTrack = (index, shouldPlay) => {
    const nextIndex = (index + tracks.length) % tracks.length;
    const audio = audioRef.current;

    setCurrentIndex(nextIndex);
    setCurrentTime(0);
    setDuration(tracks[nextIndex].duration);

    if (!audio) return;
    audio.src = tracks[nextIndex].src;
    audio.load();
    if (shouldPlay) playAudio();
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) playAudio();
    else audio.pause();
  };

  const selectTrack = (index) => {
    if (index === currentIndex) {
      togglePlayback();
      return;
    }

    loadTrack(index, true);
  };

  const moveTrack = (step) => {
    loadTrack(currentIndex + step, playing);
  };

  return (
    <section className="pageWidth contentPanel audioPanel" id="archive-content">
      <div className="sectionHeading compact">
        <div>
          <span className="eyebrow dark">Фонограммархив</span>
          <h2>Аудиоархив</h2>
        </div>
        <span className="audioArchiveLink" role="link" aria-disabled="true" title="Раздел находится в разработке">
          Перейти в фонограммархив
          <svg className="inlineArrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </span>
      </div>

      <div className="audioLayout">
        <article className="featuredTrack">
          <span className="trackTag">Эвенки · Саха</span>
          <h3>{currentTrack.title}</h3>
          <p>{currentTrack.performer} · Оленёкский район · 2014</p>

          <div className={`waveform${playing ? " isPlaying" : ""}`} aria-hidden="true">
            {bars.map((height, index) => (
              <i
                key={index}
                style={{
                  height: `${height}%`,
                  "--wave-duration": `${560 + (index % 7) * 70}ms`,
                  "--wave-delay": `${index * -43}ms`,
                  "--wave-offset": `${Math.round(Math.sin(index * 0.58) * 8 + Math.cos(index * 0.21) * 3)}px`,
                }}
              />
            ))}
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.src}
            preload="metadata"
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => loadTrack(currentIndex + 1, true)}
            onError={() => setPlaying(false)}
          />

          <div className="playerControls">
            <span className="time">{formatTime(currentTime)}</span>
            <button
              className="roundButton secondary"
              type="button"
              onClick={() => moveTrack(-1)}
              aria-label="Предыдущая запись"
            >
              <SkipIcon direction="previous" />
            </button>
            <button
              className={`roundButton primary${playing ? " isPlaying" : ""}`}
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? "Пауза" : "Воспроизвести"}
            >
              <PlayerIcon paused={playing} />
            </button>
            <button
              className="roundButton secondary"
              type="button"
              onClick={() => moveTrack(1)}
              aria-label="Следующая запись"
            >
              <SkipIcon direction="next" />
            </button>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </article>

        <div className="trackList">
          {tracks.map((track, index) => {
            const isCurrent = index === currentIndex;
            return (
              <button
                className={`trackRow${isCurrent ? " isActive" : ""}`}
                type="button"
                key={track.title}
                onClick={() => selectTrack(index)}
                aria-current={isCurrent ? "true" : undefined}
              >
                <span className="miniPlay"><PlayerIcon paused={isCurrent && playing} /></span>
                <span className="trackCopy">
                  <strong>{track.title}</strong>
                  <small>{track.performer} · 2014</small>
                </span>
                <span className="trackDuration">{formatTime(track.duration)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
