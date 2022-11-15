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
     return coll.insert(document);
};

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
     return coll.find({}).toArray();
}

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
     return coll.deleteOne(document);
}

exports.updateDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
     return coll.updateOne(document,{$set: update}, null);
}