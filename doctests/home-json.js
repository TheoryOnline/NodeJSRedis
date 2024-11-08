// EXAMPLE: js_home_json
// REMOVE_START
import assert from 'assert';
// REMOVE_END
// STEP_START import
import {
    createClient,
    SchemaFieldTypes,
    AggregateGroupByReducers,
    AggregateSteps,
} from 'redis';
// STEP_END

// STEP_START connect
const client = await createClient();
await client.connect();
// STEP_END
// REMOVE_START
await client.ft.dropIndex('idx:users', { DD: true });
await client.del('user:1', 'user:2', 'user:3');
// REMOVE_END

// STEP_START create_data
var user1 = {
    name: "Paul John",
    email: "paul.john@example.com",
    age: 42,
    city: "London"
}

var user2 = {
    name: "Eden Zamir",
    email: "eden.zamir@example.com",
    age: 29,
    city: "Tel Aviv"
}

var user3 = {
    name: "Paul Zamir",
    email: "paul.zamir@example.com",
    age: 35,
    city: "Tel Aviv"
}
// STEP_END

// STEP_START make_index
await client.ft.create('idx:users', {
    '$.name': {
        type: SchemaFieldTypes.TEXT,
        AS: 'name'
    },
    "$.city": {
        type: SchemaFieldTypes.TEXT,
        AS: 'city'
    },
    '$.age': {
        type: SchemaFieldTypes.NUMERIC,
        AS: 'age'
    }
}, {
    ON: 'JSON',
    PREFIX: 'user:'
});
// STEP_END

// STEP_START add_data
var user1Added = await client.json.set('user:1', '$', user1);
var user2Added = await client.json.set('user:2', '$', user2);
var user3Added = await client.json.set('user:3', '$', user3);
// STEP_END
// REMOVE_START
assert.equal('OK', user1Added);
assert.equal('OK', user2Added);
assert.equal('OK', user3Added);
// REMOVE_END

// STEP_START query1
var findPaulResult = await client.ft.search('idx:users', 'Paul @age:[30 40]');

console.log(findPaulResult.total); // >>> 1

findPaulResult.documents.forEach(doc => {
    console.log(`ID: ${doc.id}, name: ${doc.value.name}, age: ${doc.value.age}`);
});
// >>> ID: user:3, name: Paul Zamir, age: 35
// STEP_END
// REMOVE_START
assert.strictEqual(1, findPaulResult.total);

var paulDoc = findPaulResult.documents[0];

assert.equal('user:3', paulDoc.id);
// REMOVE_END

// STEP_START query2
var citiesResult = await client.ft.search('idx:users', '*',{
    RETURN: "city"
});

console.log(citiesResult.total); // >>> 3

citiesResult.documents.forEach(cityDoc => {
    console.log(cityDoc.value);
});
// >>> {city: 'London'}
// >>> {city: 'Tel Aviv'}
// >>> {city: 'Tel Aviv'}
// STEP_END
// REMOVE_START
assert.strictEqual(3, citiesResult.total);

citiesResult.documents.sort((a, b)=> a.id < b.id);
assert.equal('user:1', citiesResult.documents[0].id);
assert.equal('user:2', citiesResult.documents[1].id);
assert.equal('user:3', citiesResult.documents[2].id);
// REMOVE_END

// STEP_START query3
var aggResult = await client.ft.aggregate('idx:users', '*', {
    STEPS: [{
        type: AggregateSteps.GROUPBY,
        properties: '@city',
        REDUCE: [{
            type: AggregateGroupByReducers.COUNT,
            AS: 'count'
        }]
    }]
});

console.log(aggResult.total); // >>> 2

aggResult.results.forEach(result => {
    console.log(`${result.city} - ${result.count}`);
});
// >>> London - 1
// >>> Tel Aviv - 2
// STEP_END
// REMOVE_START
assert.strictEqual(2, aggResult.total);

aggResult.results.sort((a, b) => a.city < b.city);
assert.equal('London - 1', `${aggResult.results[0].city} - ${aggResult.results[0].count}`);
assert.equal('Tel Aviv - 2', `${aggResult.results[1].city} - ${aggResult.results[1].count}`)
// REMOVE_END

await client.quit();