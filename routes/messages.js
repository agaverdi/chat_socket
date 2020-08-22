const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const { json } = require("body-parser");
const { update } = require("../models/Message");

router.get("/", async (req, res) => {
  try {
    const mess = await Message.find();
    res.json(mess);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
    // const {message}=req.body
    console.log("saasa",Message)
  const newmessage = new Message({
    user:req.body.user,
    msg: req.body.msg,
    
  });
  console.log("0", newmessage);
  console.log("1", req.body);
  console.log("2", req.body.msg);
  console.log("3", req.body["msg"]);
  try {
    const savedMessage = await newmessage.save();
    res.json(savedMessage);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
