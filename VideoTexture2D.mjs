import {gl} from "./global.mjs"
import {Texture2D} from "./Texture2D.mjs"

export class VideoTexture2D extends Texture2D {
  constructor() {
    super();
    this.video = null;
    this.copyVideo = false;
    this.playing = false;
    this.timeupdate = false;

    this.video = null;
  }

  update() {
    if (this.copyVideo)
      super.update(this.video);
  }

  load(url) {
    this.video = document.createElement('video');

    this.video.autoplay = true;
    this.video.muted = true;
    this.video.loop = true;

    this.video.addEventListener('playing', function (p) {
      this.playing = true;
      this.checkReady();
    }.bind(this), true);

    this.video.addEventListener('timeupdate', function (p) {
      this.timeupdate = true;
      this.checkReady();
    }.bind(this), true);

    this.video.src = url;
    this.video.play();
  }

  checkReady() {
    if (this.playing && this.timeupdate) {
      this.copyVideo = true;
    }
  }
}