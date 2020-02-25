<%
const fs = require("fs");

let components = [];

if (fs.existsSync("./node_modules")) {
  components = fs
    .readdirSync("./node_modules/vue2-leaflet/dist/components")
    .map(file => file.split(".")[0]);
} else {
  components = fs
    .readdirSync("../vue2-leaflet/dist/components")
    .map(file => file.split(".")[0]);
}

%>

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

<%

function handleComponent(cmp) {
  return `
Vue.component("${cmp}", resolve => {
  fixLeaflet();
  import("vue2-leaflet/dist/components/${cmp}.js")
    .then(component => component.default || component)
    .then(resolve);
});`;
}

%>

<%=components.map(handleComponent).join("\n")%>
