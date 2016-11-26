module.exports = () => new (class {
    constructor() {
    }

    getColorString(id, s, b) {
        let c = this.getColor(id, s, b);
        return 'rgb('+c.r+','+c.g+','+c.b+')';
    }

    getColor(id, s, b) {
        if (s === undefined) s = 1.0;
        if (b === undefined) b = 0.7;
        return this.HSBtoRGB(this.random(id), 1.0, 0.7);
    }

    HSBtoRGB(h, s, b) {
        var i = Math.floor(h * 6);
        var f = h * 6  - i;
        var p = b * (1 - s);
        var q = b * (1 - f * s);
        var t = b * (1 - (1 - f) * s);

        switch(i % 6) {
            case 0: return this.round({r: b, g: t, b: p});
            case 1: return this.round({r: q, g: b, b: p});
            case 2: return this.round({r: p, g: b, b: t});
            case 3: return this.round({r: p, g: q, b: b});
            case 4: return this.round({r: t, g: p, b: b});
            case 5: return this.round({r: b, g: p, b: q});
        }
    }

    round(a) {
        var keys = Object.keys(a);
        for (let i in keys) {
            a[keys[i]] = Math.round(a[keys[i]] * 255);
        }
        return a;
    }

    random(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }
})
