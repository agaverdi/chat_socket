const mongoose=require('mongoose');


const chatSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    msg: {
        type: String,
        required:true
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

// const Chat = mongoose.model('Message', chatSchema);
module.exports = mongoose.model('Message',chatSchema)

