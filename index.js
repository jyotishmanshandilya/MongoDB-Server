const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//console.log("MongoClient instace: "+ mongoClient);

const url = "mongodb://127.0.0.1:27017/";
const dbname = 'conFusion';

//const client = new MongoClient(url);

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log("connected to the server;");

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    
    collection.insertOne({"name":"Chicken sandwich", "description":"Affordable and tasty"}, (err,result)=>{
        assert.equal(err, null);
        console.log("After insert:\n");
        console.log(result.ops);
        collection.find({}).toArray((err,docs)=>{
            assert.equal(err, null);
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result)=>{
                assert.equal(err, null);
                client.close();
            })
        });
    });
});