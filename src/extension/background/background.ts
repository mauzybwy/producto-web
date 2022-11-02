/*****************************************************************************
 * Import
 *****************************************************************************/
import ExtensionConfig from "extension/config";

const browser = ExtensionConfig.browserBase;

/*****************************************************************************
 * Background
 *****************************************************************************/
browser.runtime.onInstalled.addListener(() => {
  console.log("INSTALLED");
});
