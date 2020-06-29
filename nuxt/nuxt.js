import * as path from "path";
const { getComponents } = require("../lib");

function handleComponent(cmp) {
  return `
Vue.component("${cmp}", resolve => {
  if(!process.client) { return resolve(noOpCmp) }
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

export default function nuxtModule() {
  this.addPlugin({
    src: path.resolve(__dirname, "nuxt-plugin.js"),
    options: { componentsJS: generateComponentJS() }
  });
}
