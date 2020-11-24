class Color{
    constructor(r, g, b, a)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export class RayTracer {
    constructor() {
    }

    render() {
        var nx = 200;
        var ny = 100;
        
        this.buffer = new Uint8Array(nx * ny * 4);
        var idx = 0;

        for (var j = ny - 1; j >= 0; j--) {
            for (var i = 0; i < nx; i++) {
                var r = i / nx;
                var g = j / ny;
                var b = 0.2;
                this.buffer[idx++] = 256 * r;
                this.buffer[idx++] = 256 * g;
                this.buffer[idx++] = 256 * b;
                this.buffer[idx++] = 255;
            }
        }
    }
}