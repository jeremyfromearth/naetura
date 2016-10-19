function Hex() {
    
    function Canvas(ctx) {
        var ctx = ctx;
        var theta = 0;
        var flat_vertices = [];
        var sharp_vertices = [];
        var increment = Math.PI / 3.0;
        var sharp_offset = increment * 0.5;

        // Initialize vertices for both orientation types
        // These are "unit" coords and can be scaled and translated as needed
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

    function Cell(q, r, s) {
        if(q + r + s != 0) 
            throw 'Error creating HexCell. q+r+s != 0. Invalid values: (' + q + ', ' + r + ', ' + s + ')';

        var q = q || 0,
            r = r || 0,
            s = s || 0;

        return {
            plus : function(cell) {
                return Cell(
                    q + cell.q(),
                    r + cell.r(),
                    s + cell.s());
            },

            distance : function(cell) {
                return Math.floor((
                    Math.abs(q - cell.q()) + 
                    Math.abs(r - cell.r()) + 
                    Math.abs(s - cell.s())) / 2);
            },

            equals : function(cell) { 
                return q == cell.q()
                    && r == cell.r()
                    && s == cell.s();
            },

	    minus : function(cell) {
                return Cell(
                    q - cell.q(),
                    r - cell.r(),
                    s - cell.s());
            },

            q : function() { 
                return q; 
            }, 

            r : function() { 
                return r; 
            }, 

            s : function() { 
                return s; 
            }, 

            scale : function(scalar) {
                return Cell(
                    q * scalar, 
                    r * scalar, 
                    s * scalar);
            },
		
	    string : function() {
                return 'Cell(' + q + ', ' + r + ', ' + s + ')';
            }
            
        }
    }

    function Grid() {

        var cells = [];
        var lookup = {};
        var cell_radius = 10;
        var orientation = Orientation.FLAT;

        var neighbors = [
            Cell(1, 0, -1), Cell(1, -1, 0), Cell(0, -1, 1),
	    Cell(-1, 0, 1), Cell(-1, 1, 0), Cell(0, 1, -1) 
        ];

        function round_cell(q, r, s) {
            var qr = Math.round(q);
            var rr = Math.round(r);
            var sr = Math.round(s);

            var qd = Math.abs(q, qr);
            var rd = Math.abs(r, rr);
            var sd = Math.abs(s, sr);

            if(qd > rd && qd > sd) {
                qr = -rr - sr;
            } else if(rd > sd) {
                rr = -qr - sr;
            } else {
                sr = -qr - rr;
            }

            return Cell(qr, rr, sr);
        }

        return {

           add : function(new_cells) {
                for(var i = 0; i < new_cells.length; i++) {
                    var cell = new_cells[i];
                    var q = cell.q();
                    var r = cell.r();
                    var s = cell.s();
                    if(!lookup[q]) lookup[q] = {};
                    if(!lookup[q][r]) lookup[q][r] = {};
                    if(!lookup[q][r][s]) {
                        cells.push(cell);
                        lookup[q][r][s] = cell;
                    }
                }
            },

            cells : function() {
                return cells;
            },

            contains : function(cell) {
                if(lookup[cell.q()] != null) {
                    if(lookup[cell.q()][cell.r()] != null) {
                        return true;
                    }
                }
                return false;
            },

            neighbor : function(cell, side) {
                if(side < 0 || side > neighbors.length-1) return null;
                return cell.plus(neighbors[side]);
            },

            neighbors : function(cell) {
                var cells = [];
                for(var i = 0; i < neighbors.length; i++) {
                    cells.push(cell.plus(neighbors[i]))
                }
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

            hex_to_point : function(cell) {
                var x = 0;
                var y = 0;
                switch(orientation) {
                    case Orientation.FLAT:
                        x = cell_radius * 3/2 * cell.q();
                        y = cell_radius * Math.sqrt(3) * (cell.r() + cell.q() * 0.5);
                        break;
                    case Orientation.SHARP:
                        x = cell_radius * Math.sqrt(3) * (cell.q() + cell.r() * 0.5);
                        y = cell_radius * 3/2 * cell.r();
                        break;
                }

                return {x: x, y: y};
            }, 

            point_to_hex : function(point) {
                var q = 0;
                var r = 0;
                switch(orientation) {
                    case Orientation.FLAT:
                        q = point.x * 2/3 / cell_radius;
                        r = (-point.x / 3 + Math.sqrt(3)/3 * point.y) / cell_radius;
                        break;
                    case Orientation.SHARP:
                        q = (point.x * Math.sqrt(3)/3 - point.y / 3) / cell_radius;
                        r = point.y * 2/3 / cell_radius;
                        break;
                }
                return round_cell(q, r, -q-r);
            }, 

            round_cell : round_cell, 
        }
    }

    var Layout = {
        Hexagonal : function(radius) {
            var cells = [];	
	    for (var q = -radius; q <= radius; q++) {
		var r1 = Math.max(-radius, -q - radius);
		var r2 = Math.min(radius, -q + radius);
		for (var r = r1; r <= r2; r++) {
		    cells.push(Cell(q, r, -q-r));
		}
	    }
            return cells;
        },
    
        Triangular : function(size) {
            var cells = [];
            var h = Math.round(size / 2);
            var hh = Math.floor(h / 2);
            if((hh % 2) != 0) hh++;
            console.log(h, hh);
	    for (var q = 0; q <= size; q++) {
                for (var r = 0; r <= size - q; r++) {
                    cells.push(Cell(q-h+hh, r-hh*2, -q-r+h+hh));
                }
            }
            return cells;
        }
    }

    var Orientation = {
        SHARP : 'sharp',
        FLAT  : 'flat'
    }

    return {
        Canvas : Canvas,
        Cell : Cell,
        Grid : Grid, 
        Orientation : Orientation,
        Layout : Layout
    }
}
