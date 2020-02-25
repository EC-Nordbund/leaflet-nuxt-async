const fs = require("fs");

const components = fs
  .readdirSync("./node_modules/vue2-leaflet/dist/components")
  .map(file => file.split(".")[0]);

const fixFunction = `
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
}`;

const header = `import Vue from 'vue'`;

function handleComponent(cmp) {
  return `
Vue.component("${cmp}", resolve => {
  fixLeaflet();
  import("vue2-leaflet/dist/components/${cmp}.js")
    .then(component => component.default || component)
    .then(resolve);
});`;
}

const file = `${header}
${fixFunction}
${components.map(handleComponent).join("\n")}
`;

fs.writeFileSync("./index.js", file);
