/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box } from "@mui/material";

import Logo from "components/logo";

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
