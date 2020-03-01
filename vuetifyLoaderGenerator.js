const fs = require("fs");
const lib = require("./lib");

if (!fs.existsSync("./vuetifyLoaderCmp")) {
  fs.mkdirSync("./vuetifyLoaderCmp");
}

lib.getComponents().forEach(cmp => {
  let file = `
    import('leaflet/dist/leaflet.css')

    let tmpCmp = {
      render(h){return h('p', ['Fehler im SSR'])}
    }

    module.exports = async () => {
      if(process.client) {
        import('leaflet-nuxt-async/vuetifyLoaderFix.js')
        return import('vue2-leaflet/dist/components/${cmp}.js').then(cmp=>cmp.default || cmp)
      } else {
        return tmpCmp
      }
    }
  `;

  fs.writeFileSync("./vuetifyLoaderCmp/" + cmp + ".js", file);
});
