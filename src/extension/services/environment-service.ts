export const checkIsExtension = () => {
  try {
    return process.env.REACT_APP_BUILD_TARGET === "extension";
  } catch (e) {
    return false;
  }
};

export const checkIsLocalhost = () => {
  let url = window.location.href;
  return url.match(/:\/\/localhost(:[0-9]+)?\//);
}
