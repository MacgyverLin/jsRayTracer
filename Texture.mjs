import {gl} from "./global.mjs"

export class Texture {
  constructor(textureType) {
    this.texture = gl.createTexture();
    gl.bindTexture(textureType, this.texture);
  }

  bind(textureType, textureChannel) {
    gl.activeTexture(gl.TEXTURE0 + textureChannel);
    gl.bindTexture(textureType, this.texture);
  }

  isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }
}