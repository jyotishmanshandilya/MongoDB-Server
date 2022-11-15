const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Collection } = require('mongodb');
const dboper = require('./operations');

//console.log("MongoClient instace: "+ mongoClient);

const url = "mongodb://127.0.0.1:27017/";
const dbname = 'conFusion';

//const client = new MongoClient(url);

MongoClient.connect(url).then((client)=>{

    console.log("connected to the server;");

    const db = client.db(dbname);
    dboper.insertDocument(db, {"name": "Protein shake", "description": "Healthy shake"}, 'dishes')
        .then((result) => {
            console.log("Insert document", result.ops);

            return dboper.findDocument(db, 'dishes');
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, {name: 'Banana shake', description: "Updated Test"}, 'dishes');
        })
        .then((result)=>{
            console.log("Updated document:\n", result.result);

            return dboper.findDocument(db, 'dishes');
        })
        .then((docs)=> {
            console.log("Found Documents:\n", docs);

            return db.dropCollection('dishes');
        })
        .then((result)=>{
            console.log("Dropped Collection", result);

            return client.close();
        })
        .catch((err)=>console.log(err));
})
.catch((err) => console.log(err));