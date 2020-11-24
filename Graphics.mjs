import {gl} from "./global.mjs"

export class Graphics {
  constructor() {
    this.rotation = 0.0;

    this.transformValid = false;
    this.worldTransform = mat4.create();
    this.inverseWorldTransform = mat4.create();
  }

  invalidate() {
    this.transformValid = false;
  }

  validate() {
    if (!this.transformValid) {
      this.worldTransform = mat4.create();
      mat4.translate(this.worldTransform, this.worldTransform, [-0.0, 0.0, -1.0]);
      //mat4.rotate(this.worldTransform, this.worldTransform, this.rotation, [0, 0, 1]);
      //mat4.rotate(this.worldTransform, this.worldTransform, this.rotation * .7, [0, 1, 0]);

      mat4.invert(this.inverseWorldTransform, this.worldTransform);
      mat4.transpose(this.inverseWorldTransform, this.inverseWorldTransform);

      this.transformValid = true;
    }
  }

  setWorldTransform(worldTransform) {
    this.invalidate();

    this.worldTransform = worldTransform;
  }

  getWorldTransform() {
    this.validate();

    return this.worldTransform;
  }

  getInverseWorldTransform() {
    this.validate();

    return this.inverseWorldTransform;
  }

  setRotation(rotation) {
    this.invalidate();

    this.rotation = rotation;
  }

  getRotation() {
    this.validate();

    return this.rotation;
  }
}