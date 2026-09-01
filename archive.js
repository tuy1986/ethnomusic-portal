(() => {
  const archiveBase = "https://old08-15.agiki.ru/music/audio/8/";
  const tracks = [
    {
      title: "Эбэм ырыата (Песня бабушки)",
      performer: "Готовцева Анна Егоровна",
      year: "2014",
      ethnos: "Эвенки",
      genre: "Песня",
      place: "Республика Саха (Якутия)",
      duration: 5.4,
      src: archiveBase + "1.%20Песня%20бабушки.%20Исп.%20А.Е.%20Горохова.mp3"
    },
    {
      title: "Эбэҥкилии ырыа (Эвенкийская песня)",
      performer: "Готовцева Анна Егоровна",
      year: "2014",
      ethnos: "Эвенки",
      genre: "Песня",
      place: "Республика Саха (Якутия)",
      duration: 63.072,
      src: archiveBase + "3.%20Эвенкийская%20песня%20Исп.%20А.Е.%20Горохова.mp3"
    },
    {
      title: "Табаны ыҥырыы (Зов оленя)",
      performer: "Николаев Егор Иосифович",
      year: "2014",
      ethnos: "Саха",
      genre: "Звукоподражание",
      place: "Республика Саха (Якутия)",
      duration: 18.756,
      src: archiveBase + "4.%20Зов%20оленя.%20Звукоподражание.%20Е.И.%20Николаев.mp3"
    },
    {
      title: "Морсуо оҕото (Песня о Морсуо)",
      performer: "Обрядовый коллектив «Дылкэн»",
      year: "2014",
      ethnos: "Эвенки",
      genre: "Обрядовая песня",
      place: "Республика Саха (Якутия)",
      duration: 89.568,
      src: archiveBase + "7.%20Морсуо%20о5ото.%20Квинтет%20Илкэн.mp3"
    },
    {
      title: "Ёхорьё (эвенкийский круговой танец)",
      performer: "Н. П. Колодезникова, М. И. Егорова, Л. И. Лыскаева",
      year: "2014",
      ethnos: "Эвенки",
      genre: "Танцевальная песня",
      place: "Республика Саха (Якутия)",
      duration: 35.88,
      src: archiveBase + "10.%20Ехорье.mp3"
    }
  ];

  const playIcon = "▶";
  const pauseIcon = "Ⅱ";

  function formatTime(value) {
    if (!Number.isFinite(value) || value < 0) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function makeWave(element, count) {
    if (!element || element.children.length) return;
    const bars = Array.from({ length: count }, (_, index) => {
      const base = 28 + Math.abs(Math.sin(index * .61) * 46) + Math.abs(Math.cos(index * .23) * 16);
      return Math.min(92, Math.round(base));
    });
    element.innerHTML = bars.map((height, index) => (
      `<i style="height:${height}%;--wave-duration:${560 + (index % 7) * 72}ms;--wave-delay:${index * -43}ms;--wave-offset:${Math.round(Math.sin(index * .58) * 7 + Math.cos(index * .21) * 3)}px"></i>`
    )).join("");
  }

  document.querySelectorAll(".aurora-wave").forEach((wave) => makeWave(wave, 38));
  document.querySelectorAll(".mini-wave").forEach((wave) => makeWave(wave, 23));

  const menuButton = document.querySelector(".archive-menu");
  const menu = document.querySelector(".archive-nav");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const dock = document.createElement("aside");
  dock.className = "player-dock";
  dock.setAttribute("aria-label", "Текущая фонограмма");
  dock.innerHTML = `
    <button class="play-button small" type="button" data-dock-play aria-label="Воспроизвести">${playIcon}</button>
    <div class="dock-copy"><strong data-current-title>Фонограмма</strong><small data-current-meta>Исполнитель</small></div>
    <div class="dock-progress"><input class="seek" data-seek type="range" min="0" max="100" value="0" aria-label="Позиция воспроизведения"></div>
    <div class="dock-controls"><button class="dock-skip" type="button" data-player-action="previous" aria-label="Предыдущая запись">‹</button><button class="dock-skip" type="button" data-player-action="next" aria-label="Следующая запись">›</button></div>
    <span class="dock-time"><span data-current-time>0:00</span> / <span data-total-time>0:00</span></span>
    <button class="dock-close" type="button" data-dock-close aria-label="Закрыть проигрыватель">×</button>`;
  document.body.appendChild(dock);

  const audio = document.createElement("audio");
  audio.preload = "metadata";
  document.body.appendChild(audio);

  let currentIndex = Number(document.body.dataset.initialTrack || 0);
  let loaded = false;

  function currentTrack() { return tracks[currentIndex]; }

  function updateCopy() {
    const track = currentTrack();
    document.querySelectorAll("[data-current-title]").forEach((element) => { element.textContent = track.title; });
    document.querySelectorAll("[data-current-meta]").forEach((element) => { element.textContent = `${track.performer} · ${track.year}`; });
    document.querySelectorAll("[data-current-tag]").forEach((element) => { element.textContent = `Выбранная запись · ${track.ethnos} · ${track.genre}`; });
    document.querySelectorAll("[data-total-time]").forEach((element) => { element.textContent = formatTime(audio.duration || track.duration); });
    document.querySelectorAll("[data-track-play]").forEach((button) => {
      const active = Number(button.dataset.trackPlay) === currentIndex;
      const playing = active && !audio.paused;
      button.textContent = playing ? pauseIcon : playIcon;
      button.setAttribute("aria-label", playing ? "Пауза" : `Воспроизвести: ${tracks[Number(button.dataset.trackPlay)]?.title || "фонограмма"}`);
    });
    document.querySelectorAll("[data-current-play]").forEach((button) => {
      button.textContent = audio.paused ? playIcon : pauseIcon;
      button.setAttribute("aria-label", audio.paused ? "Воспроизвести" : "Пауза");
    });
    const dockPlay = document.querySelector("[data-dock-play]");
    if (dockPlay) {
      dockPlay.textContent = audio.paused ? playIcon : pauseIcon;
      dockPlay.setAttribute("aria-label", audio.paused ? "Воспроизвести" : "Пауза");
    }
    document.querySelectorAll(".record-row").forEach((row) => row.classList.toggle("is-active", Number(row.dataset.track) === currentIndex && !audio.paused));
    document.querySelectorAll(".aurora-wave").forEach((wave) => wave.classList.toggle("is-playing", !audio.paused));
  }

  function ensureLoaded(index) {
    if (loaded && index === currentIndex) return;
    currentIndex = (index + tracks.length) % tracks.length;
    audio.src = currentTrack().src;
    audio.load();
    loaded = true;
    document.querySelectorAll("[data-current-time]").forEach((element) => { element.textContent = "0:00"; });
    document.querySelectorAll("[data-seek]").forEach((seek) => { seek.value = "0"; });
    updateCopy();
  }

  function playTrack(index) {
    const sameTrack = loaded && index === currentIndex;
    if (!sameTrack) ensureLoaded(index);
    document.body.classList.add("has-player");
    if (sameTrack && !audio.paused) audio.pause();
    else audio.play().catch(() => updateCopy());
  }

  document.querySelectorAll("[data-track-play]").forEach((button) => {
    button.addEventListener("click", () => playTrack(Number(button.dataset.trackPlay)));
  });

  document.querySelectorAll("[data-current-play]").forEach((button) => {
    button.addEventListener("click", () => playTrack(currentIndex));
  });

  const dockPlay = document.querySelector("[data-dock-play]");
  if (dockPlay) dockPlay.addEventListener("click", () => playTrack(currentIndex));

  document.querySelectorAll("[data-player-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.playerAction === "previous" ? -1 : 1;
      ensureLoaded(currentIndex + direction);
      document.body.classList.add("has-player");
      audio.play().catch(() => updateCopy());
    });
  });

  const closeDock = document.querySelector("[data-dock-close]");
  if (closeDock) closeDock.addEventListener("click", () => {
    audio.pause();
    document.body.classList.remove("has-player");
  });

  document.querySelectorAll("[data-seek]").forEach((seek) => {
    seek.addEventListener("input", () => {
      if (!loaded) ensureLoaded(currentIndex);
      const duration = audio.duration || currentTrack().duration;
      audio.currentTime = duration * Number(seek.value) / 100;
    });
  });

  audio.addEventListener("timeupdate", () => {
    const duration = audio.duration || currentTrack().duration;
    const progress = duration ? audio.currentTime / duration * 100 : 0;
    document.querySelectorAll("[data-current-time]").forEach((element) => { element.textContent = formatTime(audio.currentTime); });
    document.querySelectorAll("[data-total-time]").forEach((element) => { element.textContent = formatTime(duration); });
    document.querySelectorAll("[data-seek]").forEach((seek) => { seek.value = String(progress); });
  });
  audio.addEventListener("loadedmetadata", updateCopy);
  audio.addEventListener("play", updateCopy);
  audio.addEventListener("pause", updateCopy);
  audio.addEventListener("ended", () => {
    ensureLoaded(currentIndex + 1);
    audio.play().catch(() => updateCopy());
  });
  audio.addEventListener("error", updateCopy);

  const initial = Number(document.body.dataset.initialTrack || 0);
  currentIndex = Number.isFinite(initial) ? Math.max(0, Math.min(tracks.length - 1, initial)) : 0;
  updateCopy();

  const search = document.getElementById("archive-search");
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const records = Array.from(document.querySelectorAll(".record-row[data-search]"));
  const count = document.getElementById("result-count");
  const empty = document.querySelector(".empty-result");

  function filterRecords() {
    if (!records.length) return;
    const query = (search?.value || "").trim().toLocaleLowerCase("ru");
    let visible = 0;
    records.forEach((record) => {
      const matchesText = !query || record.dataset.search.toLocaleLowerCase("ru").includes(query);
      const matchesFilters = filters.every((filter) => !filter.value || record.dataset[filter.dataset.filter] === filter.value);
      const show = matchesText && matchesFilters;
      record.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? "запись" : visible > 1 && visible < 5 ? "записи" : "записей"}`;
    if (empty) empty.style.display = visible ? "none" : "block";
  }

  if (search) search.addEventListener("input", filterRecords);
  filters.forEach((filter) => filter.addEventListener("change", filterRecords));
  const reset = document.querySelector("[data-reset-filters]");
  if (reset) reset.addEventListener("click", () => {
    if (search) search.value = "";
    filters.forEach((filter) => { filter.value = ""; });
    filterRecords();
  });

  const searchButton = document.querySelector("[data-search-submit]");
  if (searchButton) searchButton.addEventListener("click", () => {
    filterRecords();
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
