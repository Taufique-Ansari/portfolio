import './scroll-ui.css'

// Scroll progress percentage + the segmented timeline rail (engine-built/driven).
export default function ScrollUI() {
  return (
    <>
      <div className="scroll-pct" id="scroll-pct">(0)</div>
      <div className="scroll-timeline" id="scroll-timeline">
        <span className="st-label" id="st-label" />
        <div className="st-bar" id="st-bar" />
      </div>
    </>
  )
}
