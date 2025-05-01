const User = require("../models/user-model");
const bcrypt = require("bcryptjs")
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const productsPath = path.join(__dirname, '.', 'data', 'products.json');
const singleProductPath = path.join(__dirname, '.', 'data', 'singleproduct.json');
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const home = async(req,res) =>{
   try{
       res.status(200).send("Welcome to home")
   }catch(error)
   {
    console.log(error)
   }
}

const register = async (req,res) =>{
    try{
        const {username,email,phone,password} = req.body;

        const userExist = User.findOne({email:email});

        if(!userExist) {
            return res.status(400).json({msg:"email already exists"});
        }
        

        const createduser = await User.create({username,email,password})
        res.status(201).json({msg:createduser,token: await createduser.generateToken(),userId: createduser._id.toString(),});
    }catch(error)
    {
       res.status(500).json({msg:"Internal Server Error"})
    }
 }

 const login = async (req,res) =>{

    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({msg:"Please fill all the fields"});
        }
        const user = await User.findOne({email:email});
        if(!user) {
            return res.status(400).json({msg:"Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({msg:"Invalid email or password"});
        }
        res.status(200).json({msg:"Login successful",token: await user.generateToken(),userId: user._id.toString(),cart: user.cart,});
    }catch(error)
    {
       res.status(500).json({msg:"Internal Server Error"})
    }
 }

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ganeshpilla98765@gmail.com", // your email
      pass: "lyuv tbll frgo vyyh", // your email password
    },
  });
  
  // Forgot password route
  const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Create a reset token
      const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
  
      // Reset password link
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
      // Send email with reset link
      const mailOptions = {
        from: "ganespilla98765@gmail.com",
        to: user.email,
        subject: "Password Reset Request",
        text: `Click the following link to reset your password: ${resetLink}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: "Error sending email" });
        }
        res.status(200).json({ message: "Password reset link sent to your email" });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const resetPassword =  async (req, res) => {
    const { token, password } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // verify token
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
  
      return res.json({ status: true, message: "Password reset successful" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  };


 const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId; // From middleware
    const { cart } = req.body;

    const user = await User.findByIdAndUpdate(userId,{$set:{cart}},{new:true});
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.save();

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Cart update error:", error);
    return res.status(500).json({ message: "Server error while updating cart" });
  }
};
  const verify = async (req, res) => {
    // If we reach here, the user is logged in, and their token is valid
    res.json({ message: 'User is authenticated', user: req.user });
  };

  const getProducts  = async (req,res) => {

  const data = fs.readFileSync(productsPath, "utf8");
  const products = JSON.parse(data);

   return res.status(201).json(products);

  }

  const getSingleProduct = async (req,res) => {

    const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const data = fs.readFileSync(singleProductPath, "utf8");
  const singleproducts = JSON.parse(data);
    const product = singleproducts.find((product) => product.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(201).json(product);
  }

  const checkoutsession =  async (req, res) => {
    const { cartItems } = req.body;
  
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price, // Stripe uses cents
      },
      quantity: item.amount,
    }));
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
  
    res.json({ id: session.id });
  };
 
 module.exports = {home,register,verify,getProducts,getSingleProduct,login,updateCart,forgotPassword,resetPassword,checkoutsession};