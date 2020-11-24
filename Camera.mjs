import { gl } from "./global.mjs"
import { Graphics } from "./Graphics.mjs"

export class Camera extends Graphics {
  constructor() {
    super();

    this.clearColor = [0.0, 0.0, 0.0, 1.0];
    this.clearDepth = 1.0;
    this.clearStencil = 0;
    this.clearBit = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT;

    this.viewport = [0.0, 0.0, 1.0, 1.0];

    this.enableDepthTest = true;
    this.depthFunc = gl.LEQUAL;

    this.fov = 90;
    this.aspect = 100.0 / 100.0;
    this.zNear = 1.0;
    this.zFar = 1000.0;
    this.projectionMatrix = mat4.create();
    this.projectionMatrixValid = false;
  }

  invalidateProjection() {
    this.projectionMatrixValid = false;
  }

  validateProjection() {
    if (!this.projectionMatrixValid) {
      this.projectionMatrix = mat4.create();
      mat4.perspective(this.projectionMatrix, this.fov * Math.PI / 180, this.aspect, this.zNear, this.zFar);

      this.projectionMatrixValid = true;
    }
  }

  setPerspective(fov, aspect, zNear, zFar) {
    this.fov = fov;
    this.aspect = aspect;
    this.zNear = zNear;
    this.zFar = zFar;

    this.invalidateProjection();
  }

  getProjectionMatrix() {
    this.validateProjection();

    return this.projectionMatrix;
  }

  setViewport(viewport) {
    this.viewport = viewport;
  }

  getViewport() {
    return this.viewport;
  }

  render() {
    if (this.enableDepthTest)
      gl.enable(gl.DEPTH_TEST);
    else
      gl.disable(gl.DEPTH_TEST);
    gl.depthFunc(this.depthFunc);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.SCISSOR_TEST);
    gl.viewport(this.viewport[0] * gl.canvas.width, this.viewport[1] * gl.canvas.height, this.viewport[2] * gl.canvas.width, this.viewport[3] * gl.canvas.height);
    gl.scissor(this.viewport[0] * gl.canvas.width, this.viewport[1] * gl.canvas.height, this.viewport[2] * gl.canvas.width, this.viewport[3] * gl.canvas.height);

    gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
    gl.clearDepth(this.clearDepth);
    gl.clearStencil(this.clearStencil);
    gl.clear(this.clearBit);
  }
}