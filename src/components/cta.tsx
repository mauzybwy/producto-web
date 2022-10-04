/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";

import { DefaultColors } from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function CTA ({
  onClick,
  title,
  style,
  disable,
  variant,
} : {
  onClick?: any,
  title?: string,
  style?: any,
  disable?: boolean,
  variant?: any,
}) {
  return (
    <Box
      p="8px"
      display="flex"
      justifyContent="center"
      sx={{
        border: "2px solid",
        borderColor: DefaultColors.mid,
        boxSizing: "border-box",
        opacity: disable ? "50%" : "",
        ...style,
      }}
      className={!disable ? "interact" : ""}
      onClick={!disable ? onClick : () => {}}
    >
      <Typography className="disable-select" variant={variant || "h6"}>
        {title}
      </Typography>
    </Box>
  );
}
