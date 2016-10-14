function Vec2(x, y) {
    return {
        x : x || 0,
        y : y || 0,

        add : function(v) {
            return Vec2(this.x + v.x, this.y + v.y);
        },

        distance : function(v) {
            var dx, dy;
            dx = this.x - v.x;
            dy = this.y - v.y;
            return Math.sqrt(dx * dx + dy * dy);
        },

        divide : function(n) {
            return Vec2(this.x / n, this.y / n);
        },

        dot : function(v) {
            return this.x * v.x + this.y * v.y;
        },

        length : function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },

        magnitude : function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },

        normalized : function() {
            var len = this.length();
            if (len === 0.0) {
                return Vec2();
            } else {
                return this.divide(len);
            }
        },

        scale : function(n) {
            return Vec2(x * n, y * n);
        },

        subtract : function(v) {
            return Vec2(this.x - v.x, this.y - v.y);
        } 
    }
}

function Vec3(x, y, z) {
    return {
        x : x || 0,
        y : y || 0,
        z : z || 0,

        add : function(v) {
            return Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
        },

        distance : function(v) {
            var dx, dy, dz;
            dx = this.x - v.x;
            dy = this.y - v.y;
            dz = this.z - v.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        },

        divide : function(n) {
            return Vec3(this.x / n, this.y / n, this.z / n);
        },

        dot : function(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        },

        length : function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },

        magnitude : function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },

        normalized : function() {
            var len = this.length();
            if (len === 0.0) {
                return Vec3();
            } else {
                return this.divide(len);
            }
        },

        scale : function(n) {
            return Vec3(x * n, y * n, z * n);
        },

        subtract : function(v) {
            return Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
        } 
    }
}

