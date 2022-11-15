const assert = require('assert');
const { update } = require('tar');

// exports.insertDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.insert(document, (err, result)=> {
//         assert.equal(err, null);
//         console.log("Inserted"+ result.result.n +"documents into the collection"+ collection); //result.result.n --> tells us how many documents have been inserted
//         callback(result);
//     });
// }
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted " + result.result +
            " documents into the collection " + collection);
        callback(result);
    });
};

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs)=> {
        assert.equal(err, null);
        callback(docs);
    });
}

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result)=> {
        assert.equal(err, null);
        console.log("Deleted document", document);
        callback(result);
    });
}

exports.updateDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document,{$set: update}, null, (err, result)=> {
        assert.equal(err, null);
        console.log("Updated the document with", update);
        callback(result);
    });
}