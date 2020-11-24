import {gl} from "./global.mjs"
import {initGL} from "./global.mjs"
import {Mesh} from "./Mesh.mjs"
import {Camera} from "./Camera.mjs"

export class Renderer {
  constructor() {
    initGL();

    this.meshes = []
    this.cameras = []
  }

  addMesh(mesh) {
    this.meshes.push(mesh);
  }

  removeMesh(mesh) {
    this.meshes.remove(mesh);
  }

  addCamera(camera) {
    this.cameras.push(camera);
  }

  removeCamera(camera) {
    this.cameras.remove(camera);
  }

  start() {
    this.render();
  }

  render() {
    let mesh = this.meshes[0];

    for (var i = 0; i < this.cameras.length; i++) {
      let camera = this.cameras[i];

      camera.render();

      for (var j = 0; j < this.meshes.length; j++) {
        let mesh = this.meshes[j];

        mesh.render();
        mesh.shaderProgram.setUniformMatrix4fv('uProjectionMatrix', camera.getProjectionMatrix());
        mesh.shaderProgram.setUniform1i('uSampler', 0);
      }
    }

    requestAnimationFrame(this.render.bind(this));
  }
}