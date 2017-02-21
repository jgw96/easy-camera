# easy-camera

easy-camera is a V1 Web Component that provides a nice wrapper around the getUserMedia api to give you
camera like functionality in the browser. Because easy-camera is a vanilla V1 Web Component it is entirely framework
agnostic.

### How do I use it
With my current setup to use easy-camera simply install it, include a link to the `node_modules/easy-camera.js` file
and then put `<easy-camera></easy-camera` where you need it in your app. To trigger easy-camera to take a picture just
pass it the `snap` attribute.