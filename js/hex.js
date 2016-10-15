function Hex() {
    var FLAT = 'flat';
    var SHARP = 'sharp'

    var Orientation = {
        SHARP : 'sharp',
        FLAT  : 'flat'
    }

    function Cell(q, r, s) {
        if(q + r + s != 0) 
            throw 'Error creating HexCell. q+r+s != 0. Invalid values: (' + q + ', ' + r + ', ' + s + ')';

        var q = q || 0,
            r = r || 0,
            s = s || 0;

        return {
            add : function(cell) {
                return Cell(
                    q + cell.get_q(),
                    r + cell.get_r(),
                    s + cell.get_s());
            },

            distance : function(cell) {
                return Math.floor((
                    Math.abs(q - cell.get_q()) + 
                    Math.abs(r - cell.get_r()) + 
                    Math.abs(s - cell.get_s())) / 2);
            },

            equals : function(cell) { 
                return q == cell.get_q()
                    && r == cell.get_r()
                    && s == cell.get_s();
            },

            get_q : function() { 
                return q; 
            }, 

            get_r : function() { 
                return r; 
            }, 

            get_s : function() { 
                return s; 
            }, 

            scale : function(scalar) {
                return Cell(
                    q * scalar, 
                    r * scalar, 
                    s * scalar);
            },

            sub : function(cell) {
                return Cell(
                    q - cell.get_q(),
                    r - cell.get_r(),
                    s - cell.get_s());
            }
        }
    }

    function Grid() {
        var cell_radius = 10;
        var orientation = Orientation.FLAT;

        return {
            cells : {},

            add : function(layout) {

            },

            cells : function() {
                return cells;
            },

            orientation : function(value) {
                if(value) {
                    orientation = value;
                    switch(value) {
                    case Orientation.SHARP:
                    case Orientation.FLAT:
                        orientation = value;
                    default:
                        break;
                    }
                }
                return orientation;
            },

            cell_radius : function(value) {
                if(value) {
                    cell_radius = value;
                }
                return cell_radius;
            },
        }
    }

    function Canvas(ctx) {
        var ctx = ctx;
        var theta = 0;
        var flat_vertices = [];
        var sharp_vertices = [];
        var increment = Math.PI / 3.0;
        var sharp_offset = increment * 0.5;

        for(var i = 0; i < 6; i++) {
            flat_vertices.push({
                x : Math.cos(theta),
                y : Math.sin(theta)
            });

            sharp_vertices.push({
                x : Math.cos(theta + sharp_offset),
                y : Math.sin(theta + sharp_offset)
            });

            theta += increment;
        }

        return {
            draw_hexagon : function(pixel_coords, radius, orientation, solid, stroke) {
                if(!ctx) return; 

                var vertices = orientation == 
                    Orientation.FLAT ? flat_vertices : sharp_vertices;

                ctx.beginPath();
                ctx.moveTo(pixel_coords[0], pixel_coords[1]);

                for(var i = 0; i < vertices.length; i++) {
                    var vertex = vertices[i];
                    var x = pixel_coords.x + vertex.x * radius;
                    var y = pixel_coords.y + vertex.y * radius;
                    if(i == 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.closePath();
                if(solid) ctx.fill();
                if(stroke) ctx.stroke();
            }
        }
    }

    return {
        Canvas : Canvas,
        Cell : Cell,
        Grid : Grid, 
        Orientation : Orientation,
        Layout : function() {
            return {

            }
        }
    }
}
