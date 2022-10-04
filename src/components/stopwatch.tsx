/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { useActivity } from "hooks/activity";
import { toTimestring } from "utils/strutils";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Stopwatch ({
  size,
  offset,
  active,
  countdown,
  onCountdownFinish,
}: {
  size?: "sm"|"md"|"lg"|"xl",
  offset: number,
  active?: boolean,
  countdown?: boolean,
  onCountdownFinish?: Function,
}) {
  const [forceRender, setForceRender] = useState(false);
  const { activity } = useActivity();

  const variant = {
    "sm": "h6",
    "md": "h3",
    "lg": "h2",
    "xl": "h1",
  }[size] || "h3";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setForceRender(!forceRender);
      if (runtime <= 0) {
        onCountdownFinish();
      }
    }, 200);
    
    return () => {
      clearTimeout(timeout);
    };
  })

  let runtime = offset;
  if (active && activity?.timer) {
    const diff = (Date.now() / 1000) - activity.timeUpdated.seconds;
    runtime += (countdown ? -1 : 1) * diff;
  }
  
  return (
    //@ts-ignore
    <Typography className="disable-select" variant={variant}>
      {toTimestring(runtime)}
    </Typography>
  );
}
