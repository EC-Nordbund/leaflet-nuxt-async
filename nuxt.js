export default function nuxtModule() {
  this.options.css.push("leaflet/dist/leaflet.css");

  this.addPlugin(path.resolve(__dirname, "nuxt-plugin.js"));
}
