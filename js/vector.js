function Vector(x, y, z) {
    return {
        x : x != null ? x : 0,
        y : y != null ? y : 0,
        z : z != null ? z : 0,

        add : function(v) {
            return Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        },

        distance : function(v) {
            var dx, dy, dz;
            dx = this.x - v.x;
            dy = this.y - v.y;
            dz = this.z - v.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        },

        divide : function(n) {
            return Vector(this.x / n, this.y / n, this.z / n);
        },

        dot : function(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        },

        length : function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z + this.z);
        },

        magnitude : function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },

        normalized : function() {
            var len = this.length();
            if (len === 0.0) {
                return Vector();
            } else {
                return this.divide(len);
            }
        },

        scale : function(n) {
            return Vector(x * n, y * n, z * n);
        },

        subtract : function(v) {
            return Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        } 
    }
}

