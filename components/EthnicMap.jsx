"use client";

import { useMemo, useState } from "react";
import { mapGroups } from "./mapData";

const VIEWBOX_W = 1242;
const VIEWBOX_H = 734;

function PeopleCard({ group }) {
  if (!group) return null;

  return (
    <article className="peopleCardDock" aria-live="polite" style={{ "--group-color": group.color }}>
      <span className="peopleCardAccent" aria-hidden="true" />
      <h3>{group.title}</h3>
      <p>{group.subtitle}</p>
      <dl>
        <div><dt>Фото:</dt><dd>{group.stats.photos}</dd></div>
        <div><dt>Аудио:</dt><dd>{group.stats.audio}</dd></div>
        <div><dt>Публикации:</dt><dd>{group.stats.publications}</dd></div>
      </dl>
      <button className="auroraButton" type="button">
        <span>Подробнее</span>
        <svg className="auroraButtonArrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14m-5-5 5 5-5 5" />
        </svg>
      </button>
    </article>
  );
}

export default function EthnicMap() {
  const [activeId, setActiveId] = useState("samoyedic");
  const active = useMemo(
    () => mapGroups.find((group) => group.id === activeId) ?? mapGroups[1],
    [activeId]
  );

  return (
    <section className="pageWidth mapSection" id="map">
      <div className="mapPanel">
        <div className="sectionHeading mapHeading">
          <div>
            <span className="eyebrow dark">Интерактивная коллекция</span>
            <h2>Карта расселения народов Сибири</h2>
          </div>
        </div>

        <div className="mapLegend" aria-label="Группы народов">
          {mapGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={activeId === group.id ? "legendItem isActive" : "legendItem"}
              onMouseEnter={() => setActiveId(group.id)}
              onFocus={() => setActiveId(group.id)}
              onClick={() => setActiveId(group.id)}
              style={{ "--group-color": group.color }}
              aria-pressed={activeId === group.id}
            >
              <span className="legendDot" />
              {group.label}
            </button>
          ))}
        </div>

        <div className="mapStage">
          <div className="mapVisual">
            <div className="mapCanvas">
              <img src="/map-outline.svg" alt="Контурная карта Сибири" />
              <svg
                className="mapOverlay"
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                role="img"
                aria-label="Интерактивные точки расселения народов Сибири"
                preserveAspectRatio="xMidYMid meet"
              >
                {mapGroups.flatMap((group) =>
                  group.points.map(([cx, cy], index) => {
                    const isActive = activeId === group.id;
                    const isMuted = activeId && !isActive;
                    return (
                      <g key={`${group.id}-${index}`}>
                        <circle
                          className="mapPointHit"
                          cx={cx}
                          cy={cy}
                          r="16"
                          onMouseEnter={() => setActiveId(group.id)}
                          onFocus={() => setActiveId(group.id)}
                          onClick={() => setActiveId(group.id)}
                          tabIndex="0"
                          aria-label={group.label}
                        />
                        <circle
                          className={isActive ? "mapPoint isActive" : "mapPoint"}
                          cx={cx}
                          cy={cy}
                          r={isActive ? 7.5 : 6}
                          fill={isActive ? group.color : "#a8a8a8"}
                          opacity={isMuted ? 0.22 : isActive ? 1 : 0.58}
                        />
                      </g>
                    );
                  })
                )}
              </svg>
            </div>
          </div>

          <aside className="mapInfoRail" aria-label="Карточка народности">
            <PeopleCard group={active} />
          </aside>
        </div>

        <div className="mapStats" aria-label="Статистика архива">
          <div><strong>20</strong><span>этносов</span></div>
          <div><strong>170</strong><span>экспедиций</span></div>
          <div><strong>238</strong><span>аудио</span></div>
        </div>
      </div>
    </section>
  );
}
