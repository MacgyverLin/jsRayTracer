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
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.buffer = new Uint8Array(width * height * 4);

        for (var i = 0; i < width * height * 4; i += 4) {
            this.buffer[i + 0] = 0;
            this.buffer[i + 1] = 0;
            this.buffer[i + 2] = 255;
            this.buffer[i + 3] = 255;
        }
        /*
        // From a length
        var uint8 = new Uint8Array(2);
        uint8[0] = 42;
        console.log(uint8[0]); // 42
        console.log(uint8.length); // 2
        console.log(uint8.BYTES_PER_ELEMENT); // 1
    
        // From an array
        var arr = new Uint8Array([21,31]);
        console.log(arr[1]); // 31
        
        // From another TypedArray
        var x = new Uint8Array([21, 31]);
        var y = new Uint8Array(x);
        console.log(y[0]); // 21
    
        // From an ArrayBuffer
        var buffer = new ArrayBuffer(8);
        var z = new Uint8Array(buffer, 1, 4);
    
        // From an iterable
        var iterable = function*(){ yield* [1,2,3]; }();
        var uint8 = new Uint8Array(iterable);
        // Uint8Array[1, 2, 3]    
        */
    }

    setPixel(x, y, color)
    {
        var idx = (y* this.width + x) * 4 + 0;
        this.buffer[idx + 0] = color.r;
        this.buffer[idx + 1] = color.g;
        this.buffer[idx + 2] = color.b;
        this.buffer[idx + 3] = color.a;
    }

    render() {
        var nx = this.width;
        var ny = this.height;
        for (var j = ny - 1; j >= 0; j--) {
            for (var i = 0; i < nx; i++) {
                var r = i / nx;
                var g = j / ny;
                var b = 0.2;

                var color = new Color(256* r, 256* g, 256* b, 255);
                this.setPixel(i, j, color);
            }
        }
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBuffer() {
        return this.buffer;
    }
}