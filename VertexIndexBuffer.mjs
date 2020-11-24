import { gl } from "./global.mjs"

export class VertexIndexBuffer {
  constructor() {
    this.positions = null;
    this.normals = null;
    this.texcoords = [null, null, null, null, null, null, null, null];
    this.indices = null;
  }

  setPositions(positions) {
    this.positions = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  }

  setNormals(normals) {
    this.normals = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  }

  setTexcoords(i, texcoords) {
    this.texcoords[i] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoords[i]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
  }

  setIndices(indices) {
    this.indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }

  draw(vertexCount, offset) {
    const type = gl.UNSIGNED_SHORT;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}