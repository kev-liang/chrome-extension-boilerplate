import _ from "lodash";

const manifest = chrome.runtime.getManifest();

const configs = _.pickBy(manifest, (value, key) =>
  _.startsWith(key, "REACT_APP_")
);

export default { ...configs };
