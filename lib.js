const { existsSync, readdirSync } = require("fs");

function getComponents() {
  let components = [];
  if (existsSync("./node_modules")) {
    components = readdirSync("./node_modules/vue2-leaflet/dist/components").map(
      file => file.split(".")[0]
    );
  } else {
    components = readdirSync("../vue2-leaflet/dist/components").map(
      file => file.split(".")[0]
    );
  }

  return components;
}

function handleComponent(cmp) {
  return `
Vue.component("${cmp}", resolve => {
  fixLeaflet();
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

module.exports = { generateComponentJS, getComponents };
