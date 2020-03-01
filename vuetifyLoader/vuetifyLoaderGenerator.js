const fs = require("fs");
const lib = require("../lib");

const VUETIFY_LOADER_CMP_DIR = "./vuetifyLoaderCmp/";

if (!fs.existsSync(VUETIFY_LOADER_CMP_DIR)) {
  fs.mkdirSync(VUETIFY_LOADER_CMP_DIR);
}

lib.getComponents().forEach(cmp => {
  let file = `
    import('leaflet/dist/leaflet.css')

    let tmpCmp = {
      render(h){return h('p', ['Fehler im SSR'])}
    }

    module.exports = async () => {
      if(process.client) {
        import('leaflet-nuxt-async/vuetifyLoader/vuetifyLoaderFix.js')
        return import('vue2-leaflet/dist/components/${cmp}.js').then(cmp=>cmp.default || cmp)
      } else {
        return tmpCmp
      }
    }
  `;

  fs.writeFileSync(VUETIFY_LOADER_CMP_DIR + cmp + ".js", file);
});
