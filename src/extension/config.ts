import { checkIsExtension } from "./services/environment-service";

let ExtensionConfig = {
  browser: undefined,
  id: undefined,
  browserBase: undefined,
}

if (checkIsExtension()) {
  const EXTENSION_KIND = "firefox"; //  "firefox"; //
  const EXTENSION_ID =
    //@ts-ignore
    EXTENSION_KIND === "firefox"
    ? "8eb2c43d05b13d3764b2733dd118a833e5c86d4d@temporary-addon"
    : "jlocmelkpbekapkplfohppkmolgcfgcc";

  //@ts-ignore
  let BROWSER_BASE = EXTENSION_KIND === "firefox" ? browser : chrome;

  ExtensionConfig = {
    browser: EXTENSION_KIND,
    id: EXTENSION_ID,
    browserBase: BROWSER_BASE,
  }
}

export default ExtensionConfig;
