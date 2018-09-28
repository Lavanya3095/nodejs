const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema= new Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    dish_id:  {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
    admin:   {
        type: Boolean,
        default: false
    },
  
},
{    
timestamps:true
});

var Favorites=mongoose.model('Favorite', favoriteSchema);
module.exports=Favorites;