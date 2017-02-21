'use strict';

customElements.define('easy-camera', class extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'});

    this.root.innerHTML = `
      <style>
        :host {
          display: block;
          width: 75%;
          margin: 0 auto;
        }

        :host video {
          width: var(--easy-camera-video-width, 100%);
        }

        :host canvas {
          width: var(--easy-camera-canvas-width, 100%);
          height: var(--easy-camera-canvas-height, 20em);
        }
      </style>

      <div>
        <canvas></canvas>
        <video autoplay></video>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['snap'];
  }

  // handle snap attribute
  get snap() {
    return this.hasAttribute('snap');
  }

  set snap(val) {
    if (val) {
      this.setAttribute('snap', '');
    } else {
      this.removeAttribute('snap');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.snap) {
      this.snapShot();
    }
  }

  connectedCallback() {
    const constraints = {
      video: true,
      audio: false,
    };

    if ('requestIdleCallback' in window) {
      // lazily do this for perf
      requestIdleCallback(() => {
        navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
          let video = this.root.querySelector('video');
          video.src = window.URL.createObjectURL(mediaStream);
        }).catch((err) => {
          return err;
        });
      }, {timeout: 2000});
    } else {
      // just do things for browsers with no requestIdleCallback
      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        let video = this.root.querySelector('video');
        video.src = window.URL.createObjectURL(mediaStream);
      }).catch((err) => {
        return err;
      });
    }
  }

  snapShot() {
    const canvas = this.root.querySelector('canvas');
    const context = canvas.getContext('2d');
    const video = this.root.querySelector('video');

    // lazily do this for perf
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }, {timeout: 2000});
    } else {
      // just do things for browsers with no requestIdleCallback
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  }
});
