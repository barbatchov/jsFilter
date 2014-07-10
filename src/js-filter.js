
var Filter = function(obj){

    var filtered = (typeof(obj, 'array')) ? [] : {},
        fcList = [],
        filters = [],
        gotObj = obj,

        push = function(obj, value, key) {
            if (typeof(obj, 'array')) {
                obj.push(value);
                return obj;
            }

            obj[key] = value;
            return obj;
        },

        doFilter = function(obj, key){
            var isFiltered = 0;
            for (var i in filters) {
                if (filters[i](obj) === true) isFiltered++;
            }

            if ((filters.length) === isFiltered) {
                push(filtered, obj, key);
            }
        };

    var p = {

        Where : function(lambda) {
            filters.push(lambda);
            return p;
        },

        First : function() {
            for (var i in gotObj) {
                doFilter(gotObj[i], i);
            }

            return filtered;
        }
    }

    return p;
}