import { checkIsExtension, extensionKind } from "./services/environment-service";

let ExtensionConfig = {
  browser: undefined,
  id: undefined,
  browserBase: undefined,
}

if (checkIsExtension()) {
  const EXTENSION_KIND = extensionKind();
  const EXTENSION_ID =
    //@ts-ignore
    EXTENSION_KIND === "firefox"
    ? "f48e108e1d643931e99afb31bbd70b4a5f9bd739"
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
