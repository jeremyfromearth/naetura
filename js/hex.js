function Hex() {
    var FLAT = 'flat';
    var SHARP = 'sharp'

    return {
        FLAT : function() {
            return FLAT;
        },

        SHARP : function() {
            return SHARP;
        },

        Grid : function() {
            return {
                cells : {},
                orientation : 'sharp',

                add : function(layout) {

                },

                get_cells : function() {
                    return cells;
                },

                set_cell_radius : function(value) {

                },
            
                set_orientation : function(value) {
                    switch(value) {
                        case SHARP:
                        case FLAT:
                            orientation = value;
                        default:
                            break;
                    }
                }
            }
        },

        Renderer : function() {
            return {

            }
        },

        Layout : function() {
            return {

            }
        }
    }
}
