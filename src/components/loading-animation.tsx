/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box, Typography } from "@mui/material";
import { Rings } from "react-loader-spinner";

import { useMobileCheck } from "hooks/mobile";

import { DefaultColors } from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function LoadingAnimation() {
  const isMobile = useMobileCheck();
  
  return (
    <Box
      display="flex"
      width={isMobile ? "100%" : "100vw"}
      height={isMobile ? "100vh" : "100vh"}
      justifyContent="center"
      alignItems="center"
    >
      <Rings
        height="160px"
        width="160px"
        color={DefaultColors.accent}
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </Box>
  );
}
