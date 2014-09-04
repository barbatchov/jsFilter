
var Filter = function(obj) {
    var joined   = (obj instanceof Array) ? [] : {},
        filtered = (obj instanceof Array) ? [] : {},
        fcList   = [],
        filters  = [],
        joins    = [],
        gotObj   = obj,

        push     = function(obj, value, key) { if (obj instanceof Array) { obj.push(value); return obj; } obj[key] = value; return obj; },
        size     = function(obj) { if (obj instanceof Array) { return obj.length; } var s = 0, i; for (i in obj) { s++; } return s; },

        _do      = {

            Filter : function(obj, key) {
                if (filters.length === 0) {
                    filtered = joined;
                    return;
                }

                var isFiltered = 0;
                for (var i in filters) {
                    if (filters[i](obj) === true) isFiltered++;
                }

                if ((filters.length) === isFiltered) {
                    push(filtered, obj, key);
                }
            },

            Join : function(givenObj, givenKey) {
                if (joins.length === 0) {
                    joined = gotObj;
                    return ;
                }

                var count = 1;

                for (var i in joins) {
                    var item = String.fromCharCode(97 + count),
                        obj  = joins[i].obj,
                        lbd  = joins[i].lambda,
                        typ  = joins[i].type,
                        aux  = {};


                    for (var j in obj) {
                        if (lbd(givenObj, obj[j])) {
                            for (var a in givenObj) {
                                aux['a.' + a] =  givenObj[a];
                            }

                            for (var b in obj[j]) {
                                aux[item + '.' + b] =  obj[j][b];
                            }
                        }
                    }

                    count++;
                }

                if (size(aux) > 0) { push(joined, aux, givenKey) };
            }

        };

    var p = {

        Join : function(obj, lambda, type) {
            joins.push({obj:obj, lambda:lambda, type:type});
            return p;
        },

        Where : function(lambda) {
            filters.push(lambda);
            return p;
        },

        OrderBy : function(lambda, type) {

        },

        Group : function(name, lambda) {

        },

        First : function() {

            for (var i in gotObj) {
                _do.Join(gotObj[i], i);
            }

            for (var i in gotObj) {
                _do.Filter(gotObj[i], i);
            }

            return filtered;
        }
    };

    return p;
}