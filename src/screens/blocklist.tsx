/*****************************************************************************
 * Import
 *****************************************************************************/
import { useState } from "react";
import { Box, Typography, TextField, Input } from "@mui/material";

import { PageContainer } from "components/containers";
import { useBlocklist } from "hooks/blocklist";
import CTA from "components/cta";

import colors from "style/colors";

import { X } from "tabler-icons-react";

/*****************************************************************************
 * Default Component
 *****************************************************************************/

export default function BlocklistScreen () {
  const { blocklist, blockUrl, unblockUrl } = useBlocklist();
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      blockUrl(url);
      setUrl("");
    }
  }

  const formValid = url && url.match(/^(?:(ftp|http|https)?:\/\/)?(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}$/gi)
  
  return (
    <PageContainer>
      <Box display="flex" flexDirection="column" style={{ gap: "8px" }}>
        <Typography variant="h4">blocklist</Typography>
        <form onSubmit={handleSubmit}>
          <input type="submit" style={{ display: "none" }} />
          <Box display="flex" style={{ gap: "16px" }}>
            <Box
              p="8px"
              px="16px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                border: "2px solid",
                boxSizing: "border-box",
              }}
            >
              <Input
                autoFocus
                value={url}
                placeholder="blocked.com"
                onChange={(evt) => setUrl(evt.target.value)}
                sx={{ input: { color: colors.text, fontSize: "1.5rem", margin: 0, padding: 0 } }}
              />
            </Box>
            <CTA
              disable={!formValid}
              title="+"
              type="submit"
            />
          </Box>
        </form>
        <Box display="flex" flexDirection="column">
          {blocklist.map((url, idx) => (
            <Box display="flex" alignItems="center" style={{ gap: "8px" }}>
              <X
                className="interact"
                onClick={() => unblockUrl(url)}
                size={18}
                style={{ marginTop: "3px"}}
              />
              <Typography variant="h6" key={idx}>
                {url}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </PageContainer>
  );
}
