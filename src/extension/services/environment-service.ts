export const checkIsExtension = () => {
  try {
    return process.env.REACT_APP_BUILD_TARGET === "extension";
  } catch (e) {
    return false;
  }
};

export const extensionKind = () => {
  if (checkIsExtension()) {
    return process.env.EXTENSION_KIND;
  } else {
    return false;
  }
}

export const checkIsLocalhost = () => {
  let url = window.location.href;
  return url.match(/:\/\/localhost(:[0-9]+)?\//);
}
