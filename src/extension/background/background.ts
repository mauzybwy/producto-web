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

browser.browserAction.onClicked.addListener((activeTab) => {
  let url = browser.runtime.getURL("cinemetrics.html");
  browser.tabs.create({ url });
});
