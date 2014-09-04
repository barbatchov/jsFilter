QUnit.test("Test where filter", function( assert ) {
    var toFilter = [
        {id:1, name:'test a'},
        {id:2, name:'test b'},
        {id:3, name:'test c'}
    ];

    var expexts = [
        {id:1, name:'test a'}
    ];

    var result = Filter(toFilter)
        .Where(function(x){ return x.id == 1; })
        .First();

    assert.deepEqual(result, expexts);
});

QUnit.test("Test join two array", function( assert ) {
    var users = [
        {id:1, name:'test a'},
        {id:2, name:'test b'},
        {id:3, name:'test c'}
    ];

    var addresses = [
        {id:10, fk:1, name:'street 1'},
        {id:20, fk:2, name:'street 2'},
        {id:30, fk:3, name:'street 3'}
    ];

    var expexts = [
        {'a.id':1, 'a.name':'test a', 'b.id':10, 'b.fk':1, 'b.name':'street 1'},
        {'a.id':2, 'a.name':'test b', 'b.id':20, 'b.fk':2, 'b.name':'street 2'},
        {'a.id':3, 'a.name':'test c', 'b.id':30, 'b.fk':3, 'b.name':'street 3'},
    ];

    var result = Filter(users)
        .Join(addresses, function(a, b){ return a.id === b.fk; })
        .First();

    assert.deepEqual(result, expexts);
});


QUnit.test("Test inner join two array", function( assert ) {
    var users = [
        {id:1, name:'test a'},
        {id:2, name:'test b'},
        {id:3, name:'test c'}
    ];

    var addresses = [
        {id:10, fk:1, name:'street 1'},
        {id:20, fk:5, name:'street 2'},
        {id:30, fk:3, name:'street 3'}
    ];

    var expexts = [
        {'a.id':1, 'a.name':'test a', 'b.id':10, 'b.fk':1, 'b.name':'street 1'},
        {'a.id':3, 'a.name':'test c', 'b.id':30, 'b.fk':3, 'b.name':'street 3'},
    ];

    var result = Filter(users)
        .Join(addresses, function(a, b){ return a.id === b.fk; })
        .First();

    assert.deepEqual(result, expexts);
});


QUnit.test("Test where filter with or condition", function( assert ) {
    var toFilter = [
        {id:1, name:'test a'},
        {id:2, name:'test b'},
        {id:3, name:'test c'}
    ];

    var expexts = [
        {id:1, name:'test a'},
        {id:3, name:'test c'}
    ];

    var result = Filter(toFilter)
        .Where(function(x){ return (x.id == 1 || x.name == 'test c'); })
        .First();

    assert.deepEqual(result, expexts);
});
/*
QUnit.test("Test where filter with more than where", function( assert ) {
    var toFilter = [
        {id:1, name:'test a'},
        {id:2, name:'test b'},
        {id:3, name:'test c'}
    ];

    var expexts = [
        {id:1, name:'test a'},
        {id:3, name:'test c'}
    ];

    var result = Filter(toFilter)
        .Where(function(x){ return x.id == 1; })
        .Where(function(x){ return x.name == 'test c'; })
        .First();

    assert.deepEqual(result, expexts);
});
*/