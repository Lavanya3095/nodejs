const MongoClient = require ('mongodb').MongoClient;
const assert = require('assert');

/*MongoClient.connect('mongodb://localhost/COnfusionDatabase',{ useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});*/

//const url='mongodb://localhost:27071/COnfusionDatabase';

const dboper = require('./operation');

const dbname='COnfusionDatabase';
MongoClient.connect('mongodb://localhost/COnfusionDatabase',{ useNewUrlParser: true },(err,client)=>{
    assert.equal(err,null);
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
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });
});

