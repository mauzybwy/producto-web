/*****************************************************************************
 * Import
 *****************************************************************************/
import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { PageContainer } from "components/containers";
import CTA from "components/cta";
/* import GoogleSignup from "screens/login/google"; */
import EmailSignup from "screens/login/email";

import { ArrowLeft } from "tabler-icons-react"

/*****************************************************************************
 * Default Component
 *****************************************************************************/

export default function Login() {
  const [phase, setPhase] = useState<"init"|"email">("init");

  const handleCancel = () => {
    setPhase("init")
  }

  const handleFinish = () => {
    
  }

  const screen = {
    init: <LoginScreen setPhase={setPhase} />,
    //google: <GoogleSignup onCancel={handleCancel} onFinish={handleFinish} email={email} />,
    email: <EmailSignup onCancel={handleCancel} onFinish={handleFinish}/>,
  }[phase];

  return (
    <PageContainer>
      <Box display="flex" flexDirection="column" width="400px" style={{ gap: "16px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h2">
            login
          </Typography>
          {phase !== "init" && (
            <ArrowLeft
              size="32"
              style={{ marginTop: "8px", cursor: "pointer" }}
              onClick={() => setPhase("init")}
            />
          )} 
        </Box>
        {screen}
      </Box>
    </PageContainer>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const LoginScreen = ({ setPhase }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ gap: "24px" }}
    >
      <Box
        width="100%"
        maxWidth="420px"
        display="flex"
        flexDirection="column"
        style={{ gap: "12px" }}
      >
        <CTA
          fullWidth
          //variant="outline"
          title="Continue with Google"
        />
        <CTA
          fullWidth
          //variant="outline"
          title="Continue with Email"
          onClick={() => setPhase("email")}
        />
        {/* <CTA
            fullWidth
            variant="outline"
            text="Continue with Phone"
            icon={<PhoneOutgoing />}
            onClick={() => setPhase("phone")}
            /> */}
      </Box>
    </Box>
  );
}
