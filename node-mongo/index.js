const MongoClient = require ('mongodb').MongoClient;
const assert = require('assert');

/*MongoClient.connect('mongodb://localhost/COnfusionDatabase',{ useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});*/

const url='mongodb://localhost/COnfusionDatabase';

const dboper = require('./operation');

const dbname='COnfusionDatabase';
//MongoClient.connect('mongodb://localhost/COnfusionDatabase',{ useNewUrlParser: true },(err,client)=>{
    //assert.equal(err,null);
    MongoClient.connect(url,{useNewUrlParser: true}).then((client) => {
    console.log('connected correctly to server');

    const db=client.db(dbname);
    /*const collection=db.collection("dishes");
    collection.insertOne({"name": "Uthappizz2a", "description": "test2"},(err,result)=>{
        assert.equal(err,null);
        console.log('afetr insert:\n');
        console.log(result.ops);
        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);
            console.log("found:\n");
            console.log(docs);
            db.dropCollection("dishes",(err,result)=>{
                assert.equal(err,null);
                client.close();
            });
        });
    });*/

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes")
    .then((result) => {
        console.log("Insert Document:\n", result.ops);

        return dboper.findDocuments(db, "dishes");
    })
    .then((docs)=>{
        console.log('found documents:\n',docs);
        return dboper.updateDocument(db, { name: "Vadonut" },
        { description: "Updated Test" }, "dishes")
    })
    .then((result)=>{
        console.log('updated documents',result.result);
        return dboper.findDocuments(db, "dishes");
    })
    .then((docs)=>{
        console.log('found updated documents',docs);
        return db.dropCollection("dishes");
    })
    .then((docs)=>{
        console.log('dropped collections',docs);
        client.close();
    })
    .catch((err)=>{
        console.log(err);
    })
.catch((err)=>{
    console.log(err);
})

    });

