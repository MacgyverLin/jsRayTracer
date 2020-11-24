import {gl} from "./global.mjs"
import {Texture2D} from "./Texture2D.mjs"
import {RayTracer} from "./RayTracer.mjs"

export class RayTraceTexture extends Texture2D {
  constructor() {
    super();
    this.rayTracer = new RayTracer();
  }

  update() {
    this.rayTracer.render();
    super.update1(200, 100, this.rayTracer.buffer);
  }
}