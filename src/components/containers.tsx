/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box } from "@mui/material";
import { useMobileCheck } from "hooks/mobile";
import { checkIsExtension } from "extension/services/environment-service";

/*****************************************************************************
 * Public Components
 *****************************************************************************/

export const PageContainer = ({ children, style } : { children: any, style?: any }) => {
  const isMobile = useMobileCheck();
  const isExtension = checkIsExtension();
  
  return (
    <Box
      pt={(isMobile && !isExtension) ? "96px" : isExtension ? "16px" : undefined}
      pb={isExtension ? "16px" : undefined}
      width={isMobile ? "100%" : "100vw"}
      height={isMobile ? "100%" : "100vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={style}
    >
      { children }
    </Box>
  );
}
