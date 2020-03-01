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

module.exports = { getComponents };
