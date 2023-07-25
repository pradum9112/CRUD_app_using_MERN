const mongoose = require("mongoose");

const DB ="mongodb+srv://pradumsonkar911252:pradum911252@cluster0.tm4ctcy.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection stablished")).catch((error)=>console.log(error.message));