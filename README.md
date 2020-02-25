# leaflet-nuxt-async

## Installation

1. Install Module via `yarn add leaflet-nuxt-async`
2. Require Module in main file `import 'leaflet-nuxt-async';`

## Usage in Nuxt:
In nuxt.config.js add 
```
{
  plugins: [
    { src: '~/node_modules/leaflet-nuxt-async', mode: 'client' }
  ]
}
```

## What does it do?

With this Module all Components from vue2-leaflet get registerd as async components with codesspliting in webpack.

## How to get access to window.L

Just use `import * as L from 'leaflet'`. Typescript users shoud add `@types/leaflet` to their dependencies.

## Next Steps

In the future I plan to add options and change it to an nuxt module...