class VertexIndexBuffer {
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

gl = null;

class ShaderProgram {
  constructor(vsSource, fsSource) {
    this.shaderProgram = this.initShaderProgram(gl, vsSource, fsSource);

    this.programInfo =
    {
      program: this.shaderProgram,
      attribLocations:
      {
        vertexPosition: gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
        vertexNormal: gl.getAttribLocation(this.shaderProgram, 'aVertexNormal'),
        textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord'),
      }
    };
  }

  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  bind(vertexIndexBuffer) {
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute

    if (vertexIndexBuffer.positions) {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexIndexBuffer.positions);
      gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }

    if (vertexIndexBuffer.normals) {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexIndexBuffer.normals);
      gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexNormal);
    }

    for (var i = 0; i < 8; i++) {
      if (vertexIndexBuffer.texcoords[i]) {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexIndexBuffer.texcoords[i]);
        gl.vertexAttribPointer(
          this.programInfo.attribLocations.textureCoord,
          numComponents,
          type,
          normalize,
          stride,
          offset);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
      }
    }

    if (vertexIndexBuffer.indices) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer.indices);
    }

    gl.useProgram(this.programInfo.program);
  }

  setUniform1i(name, value0) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform1i(location, value0);
  }

  setUniform2i(name, value0, value1) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform2i(location, value0, value1);
  }

  setUniform3i(name, value0, value1, value2) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform3i(location, value0, value1, value2);
  }

  setUniform4i(name, value0, value1, value2, value3) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform4i(location, value0, value1, value2, value3);
  }

  setUniform1iv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform1iv(location, value);
  }

  setUniform2iv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform2iv(location, value);
  }

  setUniform3iv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform3iv(location, value);
  }

  setUniform4iv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform4iv(location, value);
  }

  setUniform1f(name, value0) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform1f(location, value0);
  }

  setUniform2f(name, value0, value1) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform2f(location, value0, value1);
  }

  setUniform3f(name, value0, value1, value2) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform3f(location, value0, value1, value2);
  }

  setUniform4f(name, value0, value1, value2, value3) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform4f(location, value0, value1, value2, value3);
  }

  setUniform1fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform1fv(location, value);
  }

  setUniform2fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform2fv(location, value);
  }

  setUniform3fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform3fv(location, value);
  }

  setUniform4fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    gl.uniform4fv(location, value);
  }

  setUniformMatrix2fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    if (location != null)
      gl.uniformMatrix2fv(location, false, value);
  }

  setUniformMatrix3fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    if (location != null)
      gl.uniformMatrix3fv(location, false, value);
  }

  setUniformMatrix4fv(name, value) {
    let location = gl.getUniformLocation(this.shaderProgram, name);
    if (location != null)
      gl.uniformMatrix4fv(location, false, value);
  }
}

class Texture {
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

class Texture2D extends Texture {
  constructor() {
    super(gl.TEXTURE_2D);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([255, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  update1(width, height, data) {
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, data);
  }

  update(data) {
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, data);
  }


  bind(textureChannel) {
    super.bind(gl.TEXTURE_2D, textureChannel);
  }
}

class VideoTexture2D extends Texture2D {
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

class RayTraceSceneTexture2D extends Texture2D {
  constructor() {
    super();

    this.buffer = new Uint8Array([255, 255, 255, 255]);
  }

  update() {
    super.update1(1, 1, this.buffer);
  }
}

class Graphics {
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
      mat4.translate(this.worldTransform, this.worldTransform, [-0.0, 0.0, -6.0]);
      mat4.rotate(this.worldTransform, this.worldTransform, this.rotation, [0, 0, 1]);
      mat4.rotate(this.worldTransform, this.worldTransform, this.rotation * .7, [0, 1, 0]);

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

class Mesh extends Graphics {
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

class Camera extends Graphics {
  constructor() {
    super();

    this.clearColor = [0.0, 0.0, 0.2, 1.0];
    this.clearDepth = 1.0;
    this.clearStencil = 0;
    this.clearBit = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT;

    this.viewport = [0.0, 0.0, 1.0, 1.0];

    this.enableDepthTest = true;
    this.depthFunc = gl.LEQUAL;

    this.fov = 45;
    this.aspect = 1.0;
    this.zNear = 0.1;
    this.zFar = 100.0;
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

  setViewport(viewport) {
    this.viewport = viewport;
  }

  getViewport() {
    return this.viewport;
  }

  getProjectionMatrix() {
    this.validateProjection();

    return this.projectionMatrix;
  }

  render() {
    if (this.enableDepthTest)
      gl.enable(gl.DEPTH_TEST);
    else
      gl.disable(gl.DEPTH_TEST);
    gl.depthFunc(this.depthFunc);

    gl.enable(gl.SCISSOR_TEST);
    gl.viewport(this.viewport[0] * gl.canvas.width, this.viewport[1] * gl.canvas.height, this.viewport[2] * gl.canvas.width, this.viewport[3] * gl.canvas.height);
    gl.scissor(this.viewport[0] * gl.canvas.width, this.viewport[1] * gl.canvas.height, this.viewport[2] * gl.canvas.width, this.viewport[3] * gl.canvas.height);

    gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
    gl.clearDepth(this.clearDepth);
    gl.clearStencil(this.clearStencil);
    gl.clear(this.clearBit);
  }
}

class Renderer {
  constructor() {
    let canvas = document.querySelector('#glcanvas');
    gl = canvas.getContext('webgl');

    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

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
    mesh.setRotation(mesh.getRotation() + 0.016);

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

class Application {
  constructor() {
  }

  start() {
    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

    const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

    const positions = [
      // Front face
      -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,
      -1.0, 1.0, 1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,

      // Top face
      -1.0, 1.0, -1.0,
      -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0,

      // Right face
      1.0, -1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0,
    ];

    const normals = [
      // Front
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

      // Back
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,

      // Top
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      // Bottom
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,

      // Right
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

      // Left
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
    ];

    const texcoords = [
      // Front
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Back
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Top
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Bottom
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Right
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Left
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];

    const indices = [
      0, 1, 2, 0, 2, 3,    // front
      4, 5, 6, 4, 6, 7,    // back
      8, 9, 10, 8, 10, 11,   // top
      12, 13, 14, 12, 14, 15,   // bottom
      16, 17, 18, 16, 18, 19,   // right
      20, 21, 22, 20, 22, 23,   // left
    ];

    let renderer = new Renderer();

    this.shaderProgram = new ShaderProgram(vsSource, fsSource);

    //this.texture = new VideoTexture2D();
    //this.texture.load('Firefox.mp4');
    this.texture = new RayTraceSceneTexture2D();

    this.mesh = new Mesh();
    this.mesh.setVertexIndex(positions, normals, texcoords, indices);
    this.mesh.setTexture(this.texture);
    this.mesh.setShaderProgram(this.shaderProgram);
    renderer.addMesh(this.mesh);

    let dx = 0.25;
    let dy = 0.25;
    for (var y = 0; y < 1.0; y += dy) {
      for (var x = 0; x < 1.0; x += dx) {
        let camera = new Camera();
        camera.setViewport([x, y, dx, dy]);
        renderer.addCamera(camera);
      }
    }

    renderer.start();
  }
}

let application = new Application();
application.start();