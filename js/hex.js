function Hex() {
    var FLAT = 'flat';
    var SHARP = 'sharp'

    var Orientation = {
        SHARP : 'sharp',
        FLAT  : 'flat'
    }

    return {
        Orientation : Orientation, 

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
                            console.log('Setting orientation:', orientation);
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
