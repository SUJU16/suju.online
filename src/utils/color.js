module.exports = (() => new (class {
    getColorString(id, s, b) {
        let c = this.getColor(id, s, b);
        return 'hsl('+c.h+','+c.s+'%,'+c.l+'%)';
    }

    getColor(id, s, l) {
        if (s === undefined) s = this.random(id)*0.5+0.5;
        if (l === undefined) l = 0.7;
        return {h: Math.round(this.random(id)*360),
            s: Math.round(s*100),
            l: Math.round(l*100)};
    }

    random(seed) {
        let x = Math.sin(seed*seed) * 100000;
        return x - Math.floor(x);
    }
}))()
