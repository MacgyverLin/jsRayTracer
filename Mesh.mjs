import {Graphics} from "./Graphics.mjs"
import {VertexIndexBuffer} from "./VertexIndexBuffer.mjs"

export class Mesh extends Graphics {
  constructor() {
    super();

    this.vertexIndexBuffer = null;
    this.shaderProgram = null;
    this.texture = null;
  }

  setVertexIndex(positions, normals, texcoords, indices) {
    this.vertexIndexBuffer = new VertexIndexBuffer();
    this.vertexIndexBuffer.setPositions(positions);
    this.vertexIndexBuffer.setNormals(normals);
    this.vertexIndexBuffer.setTexcoords(0, texcoords);
    this.vertexIndexBuffer.setIndices(indices);
  }

  setShaderProgram(shaderProgram) {
    this.shaderProgram = shaderProgram;
  }

  setTexture(texture) {
    this.texture = texture;
  }

  render() {
    this.shaderProgram.bind(this.vertexIndexBuffer);
    this.shaderProgram.setUniformMatrix4fv('uNormalMatrix', this.getInverseWorldTransform());
    this.shaderProgram.setUniformMatrix4fv('uModelViewMatrix', this.getWorldTransform());

    this.texture.update();
    this.texture.bind(0);

    this.vertexIndexBuffer.draw(36, 0);
  }
}