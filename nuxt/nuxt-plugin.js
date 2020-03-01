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

<%=options.componentsJS%>