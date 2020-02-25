import * as path from "path";
import { generateComponentJS } from "./lib";

export default function nuxtModule() {
  this.options.css.push("leaflet/dist/leaflet.css");

  this.addPlugin({
    src: path.resolve(__dirname, "nuxt-plugin.js"),
    options: { componentsJS: generateComponentJS() }
  });
}
