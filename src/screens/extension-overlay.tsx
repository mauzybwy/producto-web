/*****************************************************************************
 * Import
 *****************************************************************************/
import { useState, useEffect } from "react";

import { useUserActivity } from "hooks/activity";
import { useUserTimers } from "hooks/timers";
import { useUserBlocklist } from "hooks/blocklist";
import LoginScreen from "screens/login/login";
import colors from "style/colors";
import ExtensionConfig from "extension/config";

const browser = ExtensionConfig.browserBase;

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function ExtensionOverlay () {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    browser.runtime.sendMessage({type: "fetchUser"}, (response) => {
      console.log("callback", response);
      setUid(response)
    });
  }, []);
  
  const { activity } = useUserActivity(uid);
  const { blocklist } = useUserBlocklist(uid);
  const blocked = blocklist.find(url => window.location.hostname.includes(url));

  console.log("overlay", activity, blocklist);

  return activity?.timer && blocked ? (
    <Overlay activity={activity} uid={uid} />
  ) : (
    <div />
  )
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Overlay = ({ activity, uid }) => {
  const { timers } = useUserTimers(uid);
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
          backgroundColor: colors.accent,
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
