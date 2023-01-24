/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";
import colors from "style/colors";
import { useNavigate } from "react-router-dom";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Logo () {
  const navigate = useNavigate();
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        height: "32px",
        width: "32px",
        backgroundColor: colors.accent,
      }}
      onClick={() => navigate("/")}
      className="interact"
    >
      <Typography
        className="disable-select"
        style={{
          fontSize: "46px",
          lineHeight: "0px",
          paddingTop: "13px",
          paddingLeft: "5px",
          //color: colors.light,
        }}
      >
        producto
      </Typography>
    </Box>
  );
}
