const { writeFileSync } = require("fs");
const { getComponents } = require("../lib");

function handleComponent(cmp) {
  return `
Vue.component("${cmp}", resolve => {
  fixLeaflet();
  import('leaflet/dist/leaflet.css');
  import("vue2-leaflet/dist/components/${cmp}.js")
    .then(component => component.default || component)
    .then(resolve);
});`;
}

function generateComponentJS() {
  return getComponents()
    .map(handleComponent)
    .join("\n");
}

const header = `
import Vue from 'vue'

let fixed = false

async function fixLeaflet() {
  if (fixed) {
    return
  }
  fixed = true
  const L = await import('leaflet')

  delete (L.Icon.Default.prototype)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
}
`;

const file = `${header}
${generateComponentJS()}
`;

writeFileSync("./standard/index.js", file);
