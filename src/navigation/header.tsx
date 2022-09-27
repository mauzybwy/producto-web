/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";
import { DefaultColors } from "style/colors";
import { useNavigate } from "react-router-dom";

import { BrandGithub } from "tabler-icons-react";

/*****************************************************************************
 * Component
 *****************************************************************************/
export default function Header () {
  return (
    <Box
      top="0px"
      left="0px"
      position="absolute"
      px="16px"
      height="64px"
      width="100vw"
      boxSizing="border-box"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo />
      <BrandGithub
        size="32px"
        onClick={() => window.open("https://github.com/mauzybwy/producto-web")}
        className="interact"
      />
    </Box>
  )
}

/****************************************************************************/

const Logo = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        height: "32px",
        width: "32px",
        backgroundColor: DefaultColors.accent,
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
          //color: DefaultColors.light,
        }}
      >
        producto
      </Typography>
    </Box>
  );
}
