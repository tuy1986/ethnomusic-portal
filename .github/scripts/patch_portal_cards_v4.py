from pathlib import Path
import re

path = Path("portal-prototype.html")
html = path.read_text(encoding="utf-8")

css = r"""
/* portal-direction-cards-v4 */
.directionGrid {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:14px;
  margin-top:18px;
  margin-bottom:18px;
}
.directionCard {
  position:relative;
  min-height:258px;
  display:block;
  overflow:hidden;
  isolation:isolate;
  padding:26px 24px 0;
  border:1px solid rgba(255,255,255,.42);
  border-radius:22px;
  background:#f3f3f3;
  box-shadow:none;
  text-decoration:none;
  transform:none;
  transition:border-color .25s ease,box-shadow .25s ease,transform .2s ease;
}
.directionCard::before,
.directionCard::after { display:none !important; }
.directionCardTop,
.directionIcon,
.directionKicker,
.directionCta { display:none !important; }
.directionCopy {
  position:relative;
  z-index:3;
  max-width:100%;
}
.directionCard h2 {
  max-width:360px;
  margin:0;
  color:#2d2d2d;
  font-size:21px;
  line-height:1.02;
  letter-spacing:-.03em;
  font-weight:760;
  text-transform:uppercase;
  transition:color .25s ease,text-shadow .25s ease;
}
.directionCard p {
  position:relative;
  z-index:3;
  max-width:370px;
  margin:10px 0 0;
  color:#727272;
  font-size:16px;
  line-height:1.25;
}
.directionArtwork {
  position:absolute;
  z-index:1;
  display:block;
  max-width:none;
  pointer-events:none;
  user-select:none;
  transition:transform .28s ease,filter .28s ease;
}
.directionCard-archive .directionCopy { max-width:100%; }
.directionArtwork-archive {
  right:-58px;
  bottom:-30px;
  width:345px;
  height:150px;
  object-fit:contain;
  object-position:right bottom;
  transform:rotate(-10deg);
  transform-origin:center;
  opacity:.9;
  mix-blend-mode:multiply;
}
.directionCard-museum .directionCopy { max-width:260px; }
.directionArtwork-museum {
  right:-6px;
  bottom:-4px;
  width:78%;
  height:88%;
  object-fit:contain;
  object-position:right bottom;
  filter:drop-shadow(0 8px 10px rgba(40,40,40,.08));
}
.directionCard-science .directionCopy { max-width:285px; }
.directionArtwork-science {
  right:10px;
  bottom:0;
  width:44%;
  height:76%;
  object-fit:contain;
  object-position:right bottom;
  filter:drop-shadow(0 8px 12px rgba(34,39,45,.08));
}
.directionCard:hover,
.directionCard:focus-visible {
  transform:translateY(-2px);
  border-color:rgba(74,141,231,.72);
  box-shadow:0 0 0 1px rgba(100,209,226,.2),0 0 22px rgba(82,133,230,.22),0 14px 30px rgba(21,36,48,.08);
}
.directionCard:hover h2,
.directionCard:focus-visible h2 {
  color:#3c84da;
  text-shadow:0 0 16px rgba(60,132,218,.18);
}
.directionCard:hover .directionArtwork-museum,
.directionCard:hover .directionArtwork-science,
.directionCard:focus-visible .directionArtwork-museum,
.directionCard:focus-visible .directionArtwork-science { transform:translateY(-2px); }
.directionCard:hover .directionArtwork-archive,
.directionCard:focus-visible .directionArtwork-archive { transform:rotate(-10deg) translateY(-2px); }

@media (max-width:980px) {
  .directionGrid { grid-template-columns:1fr; gap:12px; }
  .directionCard { min-height:230px; }
  .directionCard h2 { font-size:20px; }
  .directionCard p { font-size:15px; }
  .directionArtwork-archive { right:-34px; bottom:-18px; width:300px; height:128px; }
  .directionArtwork-museum { width:66%; height:82%; }
  .directionArtwork-science { width:34%; height:72%; }
}
@media (max-width:560px) {
  .directionCard { min-height:214px; padding:22px 20px 0; border-radius:18px; }
  .directionCard h2 { max-width:290px; font-size:18px; }
  .directionCard p { max-width:290px; margin-top:8px; font-size:13px; }
  .directionArtwork-archive {
    right:-52px;
    bottom:-24px;
    width:270px;
    height:114px;
    transform:rotate(-11deg);
  }
  .directionCard:hover .directionArtwork-archive,
  .directionCard:focus-visible .directionArtwork-archive { transform:rotate(-11deg) translateY(-2px); }
  .directionArtwork-museum { right:0; bottom:0; width:70%; height:76%; }
  .directionArtwork-science { right:6px; bottom:0; width:38%; height:66%; }
}
"""

if "/* portal-direction-cards-v4 */" not in html:
    html = html.replace("</style>\n</head>", css + "\n</style>\n</head>", 1)

cards = """<section class="pageWidth directionGrid" aria-label="Разделы портала">
      <a class="directionCard directionCard-archive" id="archive" href="#archive-content">
        <div class="directionCopy"><h2>Электронный фонограммархив</h2><p>Полевые записи 1966-2023 годов</p></div>
        <img class="directionArtwork directionArtwork-archive" src="public/museum/notation-divider.svg" alt="" aria-hidden="true">
      </a>
      <a class="directionCard directionCard-museum" id="museum" href="museum-prototype.html">
        <div class="directionCopy"><h2>Музей музыкальных инструментов</h2><p>Каталог инструментов, 3D-модели</p></div>
        <img class="directionArtwork directionArtwork-museum" src="public/museum/hero-harp-poster-transparent.webp" alt="" aria-hidden="true">
      </a>
      <a class="directionCard directionCard-science" id="science" href="#">
        <div class="directionCopy"><h2>Научная деятельность</h2><p>Публикации, исследователи, экспедиции</p></div>
        <img class="directionArtwork directionArtwork-science" src="public/portal/science-card-book.png" alt="" aria-hidden="true">
      </a>
    </section>"""

pattern = r'<section class="pageWidth directionGrid" aria-label="Разделы портала">.*?</section>'
html, count = re.subn(pattern, cards, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit(f"direction section replacement count={count}")

path.write_text(html, encoding="utf-8")
