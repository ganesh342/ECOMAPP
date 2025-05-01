const mongoose = require('mongoose');
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");


const cartItemSchema = new mongoose.Schema({
  id: String,           // productId + color
  name: 
  { type: String,
    required: false,
  },
  color: String,
  amount: Number,
  image: String,
  price: Number,
  max: Number,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add this field to store the user's cart
  cart: [cartItemSchema],
});





userSchema.pre('save',async function (next){
  console.log("pre method",this);
  const user = this;

  if(!user.isModified("password")){
    next();
  }

  try{
   const saltRound = await bcrypt.genSalt(10);
   const hash_password = await bcrypt.hash(user.password,saltRound);
   user.password = hash_password;
  }catch(err){
    next(err)
  }
})

userSchema.methods.generateToken = async function () {
   try{
      return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
   }catch(err){
    console.error(err)
   }
};
const User = new mongoose.model("User",userSchema)

module.exports = User