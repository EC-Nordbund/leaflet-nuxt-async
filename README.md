# leaflet-nuxt-async

## Used Packages
This helper Package uses vue2-leaflet. Please check the vue2-leaflet Docs for more Infos.

## Usage in Vue:

1. Install Module via `yarn add leaflet-nuxt-async`
2. Require Module in main file `import 'leaflet-nuxt-async';`

## Usage in Nuxt:
In nuxt.config.js add 
```js
{
  modules: [
    'leaflet-nuxt-async/nuxt'
  ]
}
```

## Usage in Nuxt witch vuetify-loader:
```js
// Import on Top:
const matcherLeaflet = require('leaflet-nuxt-async/vuetifyLoader')

match(_originalTag, { camelTag }) {
  const checkLeaflet = matcherLeaflet(camelTag)
  if (checkLeaflet) {
    return checkLeaflet
  }
}

```

You can use this module with vuetify loader also without nuxt. But `process.client` has to be true only on client and not while SSR. 

## Useing SSR
You should wrap your maps in `<no-ssr>` or `<client-only>` when useing SSR.

## What does it do?

With this Module all Components from vue2-leaflet get registerd as async components with codesspliting in webpack.

## How to get access to window.L

### Normal Vue
Just use `import * as L from 'leaflet'` in normal Vue.

### With SSR
```js
let L = null;

if(process.client) {
  L = require('leaflet');
}

// Use L witch check for null (for example with Babel or Typescript useing L?.Icon?.default)

```

In Nuxt you can savely use `require('leaflet')` in methods and in the mounted hoock.

## Treeshaking
This Package is build with Treeshaking in Mind so not used Components are in extra chunks or removed. For leaflet consider useing our Fork EC-Nordbund/leaflet for treeshaking leaflet.
