const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://KononOleg:LqR47nk2fOesBXFN@cluster0.byhr0.mongodb.net/cards?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>console.log("connect"))
.catch((err:any)=>console.log(err))

 const CardsSchema =new mongoose.Schema({
  category:{
    type:String,
    required:true,
  },
  data:[{
    word:{
      type:String,
    },
    translation:{
      type:String,
    },
    image:{
      type:String,
    },
    audio:{
      type:String,
    }
  }] 
}) 
export const repository = mongoose.model("cards",CardsSchema);

const LoginSchema =new mongoose.Schema({
  login:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }

}) 

export const token = mongoose.model("logins",LoginSchema);