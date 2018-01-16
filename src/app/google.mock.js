var google = {
    maps: {
        Map: function(){
            var _center;

            return {                
                setCenter: function(center) {
                    _center = center;
                },
                getCenter: function() {
                    return _center;
                },
                setZoom: function() {}
            };
        },
        Marker: function() {
            return {
                addListener: function() {},
                getPosition: function() {}
            }
        }
    }
};
