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
        return {
            cells : {},
            orientation : Orientation.SHARP,

            add : function(layout) {

            },

            get_cells : function() {
                return cells;
            },

            set_cell_radius : function(value) {

            },
        
            set_orientation : function(value) {
                switch(value) {
                    case Orientation.SHARP:
                    case Orientation.FLAT:
                        orientation = value;
                    default:
                        break;
                }
            }
        }
    }

    return {
        Cell : Cell,

        Grid : Grid, 

        

        Layout : function() {
            return {

            }
        },

        Orientation : Orientation, 

        Renderer : function() {
            return {

            }
        }
    }
}
