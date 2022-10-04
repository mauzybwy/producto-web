document.addEventListener('DOMContentLoaded', function () {
  console.log("ALIVE");

  // Listen for any changes to the URL of any tab.
  ExtensionConfig.browserBase.tabs.onUpdated.addListener(checkForValidUrl);
  
  var button = document.getElementById("add-youtube");
  button.addEventListener("click", addYoutube);
});
