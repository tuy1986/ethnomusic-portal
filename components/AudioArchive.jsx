"use client";

import { useState } from "react";

const tracks = [
  { title: "Игра на варгане — Хомус", meta: "Экспедиция · Якутия · Ю. И. Шейкин · 1985", duration: "3:55" },
  { title: "Игра на варгане — Хомус", meta: "Экспедиция · Якутия · Ю. И. Шейкин · 1985", duration: "2:48" },
  { title: "Игра на варгане — Хомус", meta: "Экспедиция · Якутия · Ю. И. Шейкин · 1985", duration: "4:12" },
  { title: "Игра на варгане — Хомус", meta: "Экспедиция · Якутия · Ю. И. Шейкин · 1985", duration: "1:57" },
  { title: "Игра на варгане — Хомус", meta: "Экспедиция · Якутия · Ю. И. Шейкин · 1985", duration: "3:19" },
];

const bars = [18,26,34,23,43,50,38,60,31,48,64,54,70,42,28,55,78,65,44,61,83,72,53,47,66,57,38,50,42,29,34,24,20];

export default function AudioArchive() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="pageWidth contentPanel audioPanel" id="archive-content">
      <div className="sectionHeading compact">
        <div>
          <span className="eyebrow dark">Фонограммархив</span>
          <h2>Аудиоархив</h2>
        </div>
        <a className="textLink" href="https://old08-15.agiki.ru/music/" target="_blank" rel="noreferrer">Перейти <span>→</span></a>
      </div>

      <div className="audioLayout">
        <article className="featuredTrack">
          <span className="trackTag">Тувинцы</span>
          <h3>Горловое пение — Хоомей</h3>
          <p>Экспедиция · Тыва · В. С. Никифорова · 1987</p>

          <div className="waveform" aria-hidden="true">
            {bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
          </div>

          <div className="playerControls">
            <span className="time">2:14</span>
            <button
              className="roundButton secondary"
              type="button"
              aria-label="Предыдущая запись"
            >
              ‹
            </button>
            <button
              className="roundButton primary"
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Пауза" : "Воспроизвести"}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>
            <button
              className="roundButton secondary"
              type="button"
              aria-label="Следующая запись"
            >
              ›
            </button>
            <span className="time">3:55</span>
          </div>
        </article>

        <div className="trackList">
          {tracks.map((track, index) => (
            <button className="trackRow" type="button" key={`${track.title}-${index}`}>
              <span className="miniPlay">▶</span>
              <span className="trackCopy">
                <strong>{track.title}</strong>
                <small>{track.meta}</small>
              </span>
              <span className="trackDuration">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
