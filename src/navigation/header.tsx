/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

import { useMe } from "hooks/users";
import Logo from "components/logo";
import CTA from "components/cta";

import { BrandGithub } from "tabler-icons-react";

/*****************************************************************************
 * Component
 *****************************************************************************/
export default function Header () {
  const me = useMe();
  
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  
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
      <Box display="flex" alignItems="center" height="40px" style={{ gap: "16px" }}>
        {me && (
          <CTA title="logout" variant="body2" onClick={handleLogout} />
        )}
        {/* <BrandGithub
            size="32px"
            onClick={() => window.open("https://github.com/mauzybwy/producto-web")}
            className="interact"
            /> */}
      </Box>
    </Box>
  )
}
