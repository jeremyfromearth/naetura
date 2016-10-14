function Hex() {
    var FLAT = 'flat';
    var SHARP = 'sharp'

    var Orientation = {
        SHARP : 'sharp',
        FLAT  : 'flat'
    }

    return {

        Grid : function() {
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
        },

        Point : function(x, y, z) {
            return {
                x : x || 0,
                y : y || 0,
                z : z || 0
            }
        },

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
