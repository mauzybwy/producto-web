import { checkIsExtension } from "./services/environment-service";

let ExtensionConfig = {
  browser: undefined,
  id: undefined,
  browserBase: undefined,
}

if (checkIsExtension()) {
  const EXTENSION_KIND = "google"; //  "firefox"; //
  const EXTENSION_ID =
    //@ts-ignore
    EXTENSION_KIND === "firefox"
    ? "333cd29b4b960c74b5cedeb2c196dd2f09150009@temporary-addon"
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
