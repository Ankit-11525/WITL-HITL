const { Schema, model, default: mongoose } = require("mongoose");

const PageSchema=new Schema({
    uri:{
            type:String,
            require:true,
            min:1, 
            unique:true
        },
},{timestamps:true});


export const Page=mongoose.models?.Page || mongoose.model('Page',PageSchema);