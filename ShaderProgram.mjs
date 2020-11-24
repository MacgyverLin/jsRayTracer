import { gl } from "./global.mjs"

export class ShaderProgram {
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