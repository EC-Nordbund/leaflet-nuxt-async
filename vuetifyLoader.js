const lib = require("./lib");

const cmps = lib.getComponents();

function match(cmp) {
  if (cmps.includes(cmp)) {
    return [cmp, `import ${cmp} from 'leaflet-nuxt-async/vuetifyLoaderCmp/${cmp}.js'`];
  }
  return false;
}

module.exports = match;
