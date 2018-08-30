const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url='mongodb://localhost/COnfusionDatabase';
const connect= mongoose.connect(url,{useNewUrlParser:true})

connect.then((db)=>{
    console.log('connect to srever successfully');

    Dishes.create({
        name:'uthapizzanew',
        description:'test'
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findOneAndUpdate(dish._id,{$set:{description:'updated test'}},{new:true}).exec()
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log('dish');
        return db.Collection('dishes').drop();
    })
    .then(()=>{
        return db.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});