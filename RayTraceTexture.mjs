import {gl} from "./global.mjs"
import {Texture2D} from "./Texture2D.mjs"
import {RayTracer} from "./RayTracer.mjs"

export class RayTraceTexture extends Texture2D {
  constructor() {
    super();
    this.rayTracer = new RayTracer(200, 100);
  }

  update() {
    this.rayTracer.render();
    super.update1(this.rayTracer.getWidth(), this.rayTracer.getHeight(), this.rayTracer.getBuffer());
  }
}