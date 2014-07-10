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