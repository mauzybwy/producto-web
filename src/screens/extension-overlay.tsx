/*****************************************************************************
 * Import
 *****************************************************************************/
import { useActivity } from "hooks/activity";
import { useTimers } from "hooks/timers";
import { useBlocklist } from "hooks/blocklist";
import { DefaultColors } from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ExtensionOverlay () {
  const { activity } = useActivity();
  const { blocklist } = useBlocklist();
  const blocked = blocklist.find(block => window.location.hostname.includes(block.url));
  
  return activity?.timer && blocked ? (
    <Overlay activity={activity} />
  ) : (
    <div />
  )
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Overlay = ({ activity }) => {
  const { timers } = useTimers();
  const activeTimer = timers.find(timer => timer.id === activity.timer);
  
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 100000,
        top: 0,
        left: 0,
        backgroundColor: "#0c1b31E0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          color: "white",
          fontSize: "46px",
          margin: 0,
        }}
      >
        blocked by
      </p>
      <p
        style={{
          fontFamily: "monospace",
          color: "white",
          fontSize: "72px",
          margin: 0,
          backgroundColor: DefaultColors.accent,
        }}
      >
        producto
      </p>
      <p
        style={{
          fontFamily: "monospace",
          color: "white",
          fontSize: "24px",
          margin: 0,
        }}
      >
        shouldn't you be working on{" "}
        <span style={{ border: "2px solid white" }}>
          {activeTimer?.name || ""}
        </span>
        {" "}?
      </p>
    </div>
  );
}
