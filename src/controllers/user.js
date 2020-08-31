const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const tokenSecretKey = process.env.JWT_SECRET_KEY || "s0m3s3cre7";

exports.register = (req, res) => {
  if(!req.body.username) return res.send({msg:"looks like header is not recognized"})
  const username = req.body.username
  const email = req.body.email
  const password = bcrypt.hashSync(req.body.password,8)
  
  User.create({
    username,
    email,
    password
  },(err,doc)=>{
    if(err) return res.status(404).send(err)
    else{
      res.status(201).send({
        msg:1,
        doc:doc
      })
    }
  })
};

exports.login = (req, res) => {
  if(!req.body.username) return res.send({msg:"looks like header is not recognized"})
  User.findOne({ username: req.body.username }, (error, doc) => {
    if (error) return res.status(500).json(error);
    if (!doc) return res.json({ error: "User not found" });

    const notNullPassword = req.body.password ? req.body.password : false 
    if (!notNullPassword) return res.json({ error: "No Password" });

    const passwordValid = bcrypt.compareSync(req.body.password, doc.password);
    if (!passwordValid) return res.json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: doc._id, role: doc.peran }, tokenSecretKey, {
      expiresIn: 86400
    });

    return res.json({ _token: token });
  });
};

exports.findById = (req,res) =>{
  User.find({_id:req.params.id},(err,doc)=>{
    if(err) return res.status(404).send(err)
    else{
      res.status(200).send({
        msg:1,
        doc:doc
      })
    }
  })
}

exports.findAllUsers = (req,res) =>{
  User.find((err,doc)=>{
    res.send(doc)
  })
}