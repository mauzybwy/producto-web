/*****************************************************************************
 * Import
 *****************************************************************************/
import { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

import ExtensionConfig from "extension/config";
import colors from "style/colors";
import { handleEmailLogin, handleCreateEmailUser, checkSignInMethods } from "utils/auth";
import { StyledTextField } from "components/input";
import CTA from "components/cta";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function EmailSignup({ onCancel, onFinish }) {
  const [phase, setPhase] = useState<
  "enter-email" | "create-account" | "enter-password" | "google"
  >("enter-email");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const title = {
    'enter-email': "Continue with Email",
    'enter-password': "Enter your Password",
    'create-account': "Create Account",
    'google' : "Account exists!"
  }[phase];

  const body = {
    'enter-email': "We need to check if you already have an account or to create a new one.",
    'enter-password': (
      <>
        We detected an account for{"\n"}
        <span style={{ fontWeight: 700 }}>
          {email}
        </span>
      </>
    ),
    'create-account': (
      <>
        You don’t have an account with us... yet! Create a
        password to join Murmur.
      </>
    ),
    'google': (
      <>
        Please login with Google!
      </>
    ),
  }[phase];
  
  const submitEmail = async () => {
    setLoading(true);
    const methods = await checkSignInMethods(email);
    setLoading(false);

    if (methods.error) {
      setErrorMessage(methods.error.message);
    } else if (methods.list.includes("password")) {
      setPhase("enter-password");
    } else if (methods.list.includes("google.com")) {
      setPhase("google");
    } else {
      setPhase("create-account");
    }
  };

  const submitPassword = async () => {
    /* setLoading(true);
     * await ExtensionConfig.browserBase.runtime.sendMessage(
     *   ExtensionConfig.id,
     *   { type: "login", email: email, password: password },
     *   (resp) => console.log(resp)
     * );
     * return; */
    
    const result = await handleEmailLogin(email, password);
    if (result.error) {
      setErrorMessage(result.error.message);
    }
    setLoading(false);
  };

  const createAccount = async () => {
    setLoading(true);
    const result = await handleCreateEmailUser(email, password);
    if (result.error) {
      setErrorMessage(result.error.message);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ({
      "enter-email": submitEmail,
      "enter-password": submitPassword,
      "create-account": createAccount,
    }[phase])();
  }
  
  return (
    <Box display="flex" flexDirection="column">
      {/* <LoginHeader title={title} onClose={onCancel} /> */}
      <form onSubmit={handleSubmit}>
        <input type="submit" style={{ display: "none" }} />
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          style={{ gap: "24px" }}
        >
          <Typography>
            {body}
          </Typography>
          {phase !== "google" && (
            <Fragment>
              <StyledTextField
                label={{
                  'enter-email': "Email",
                  'enter-password': "Password",
                  'create-account': "Password",
                }[phase]}
                placeholder={{
                  'enter-email': "johndoe@email.com",
                  'enter-password': "password",
                  'create-account': "password",
                }[phase]}
                value={{
                  'enter-email': email,
                  'enter-password': password,
                  'create-account': password,
                }[phase]}
                onChange={(e) => ({
                  'enter-email': setEmail,
                  'enter-password': setPassword,
                  'create-account': setPassword,
                }[phase](e.target.value))}
              />
              <CTA
                type="submit"
                title={{
                  "enter-email": "Continue",
                  "enter-password": "Continue",
                  "create-account": "Continue and create account",
                }[phase]}
                disable={{
                  "enter-email": !email,
                  "enter-password": !password,
                  "create-account": !password,
                }[phase]}
              />
            </Fragment>
          )}
          <Typography style={{ color: colors.error }}>
            {errorMessage}
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
