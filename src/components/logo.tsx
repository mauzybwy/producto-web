/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";
import colors from "style/colors";
import { useNavigate } from "react-router-dom";

import { checkIsExtension } from "../extension/services/environment-service";
import ExtensionConfig from "extension/config";

const browser = ExtensionConfig.browserBase;

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Logo () {
  const navigate = useNavigate();

  const handleClick = () => {
    if (checkIsExtension()) {
      browser.tabs.create({ url: "https://producto-1cba1.web.app/" })
    } else {
      navigate("/")
    }
  }
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        height: "32px",
        width: "32px",
        backgroundColor: colors.accent,
      }}
      onClick={handleClick}
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
