const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Collection } = require('mongodb');
const dboper = require('./operations');

//console.log("MongoClient instace: "+ mongoClient);

const url = "mongodb://127.0.0.1:27017/";
const dbname = 'conFusion';

//const client = new MongoClient(url);

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    console.log("connected to the server;");

    const db = client.db(dbname);
    dboper.insertDocument(db, {"name": "Banana shake", "description": "Healthy shake"}, 'dishes', (result)=> {
        console.log("Insert document", result.ops);

        dboper.findDocument(db, 'dishes', (docs)=> {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, {name: 'Banana shake', description: "Updated Test"}, 'dishes', (result)=>{
                console.log("Updated document:\n", result.result);

                dboper.findDocument(db, 'dishes', (docs)=> {
                    console.log("Found Documents:\n", docs);

                    db.dropCollection('dishes', (result)=>{
                        console.log("Dropped Collection", result);

                        client.close();
                    });
                });
            });
        });
    });
});