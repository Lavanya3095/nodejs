const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url='mongodb://localhost/COnfusionDatabase';
const connect= mongoose.connect(url,{useNewUrlParser:true})

connect.then((db)=>{
    console.log('connect to srever successfully');

    var newdish = new Dishes({
        name:'uthapizza',
        description:'test'
    });

    newdish.save().then((dish)=>{
        console.log(dish);
        return Dishes.find({});
    })
    .then((dishes)=>{
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch(()=>{
        confirm.log(err);
    });
});