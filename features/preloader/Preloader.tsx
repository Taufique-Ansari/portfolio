import './preloader.css'

// Intro preloader: the name builds up here then settles into the hero. The engine
// splits these into per-character spans and animates them.
export default function Preloader() {
  return (
    <>
      <div className="intro-bg" id="intro-bg" />

      <div className="name-layer" id="name-layer">
        <div className="preloader-content" id="preloader-content">
          <div id="preloader-logo">T</div>
          <span id="preloader-taufique">aufique</span>
          <span id="preloader-ansari"> Ansari</span>
          <span id="preloader-dot">.</span>
        </div>
      </div>

      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark" />
        <div className="t-panel-red" id="t-panel-red" />
      </div>
    </>
  )
}
