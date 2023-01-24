/*****************************************************************************
 * Import
 *****************************************************************************/
import { Button, Typography } from "@mui/material";

import colors from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function CTA ({
  onClick,
  title,
  style,
  disable,
  variant,
  fullWidth,
  type,
} : {
  onClick?: any,
  title?: string,
  style?: any,
  disable?: boolean,
  variant?: any,
  fullWidth?: boolean,
  type?: any,
}) {
  return (
    <Button
      type={type}
      sx={{
        color: colors.text,
        padding: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid",
        borderColor: colors.mid,
        boxSizing: "border-box",
        opacity: disable ? "50%" : "",
        width: fullWidth ? "100%" : undefined,
        textTransform: "lowercase",
        ...style,
      }}
      className={!disable ? "interact" : ""}
      onClick={!disable ? onClick : () => {}}
    >
      <Typography className="disable-select" variant={variant || "h6"}>
        {title}
      </Typography>
    </Button>
  );
}
