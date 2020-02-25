# leaflet-nuxt-async

## Installation

1. Install Module via `yarn add leaflet-nuxt-async`
2. Require Module in main file `import 'leaflet-nuxt-async';`
3. Import css in main file `import 'leaflet/dist/leaflet.css'`

## Usage in Nuxt:
In nuxt.config.js add 
```
{
  modules: [
    'leaflet-nuxt-async/nuxt'
  ]
}
```

## What does it do?

With this Module all Components from vue2-leaflet get registerd as async components with codesspliting in webpack.

## How to get access to window.L

Just use `import * as L from 'leaflet'`. Typescript users shoud add `@types/leaflet` to their dependencies.
