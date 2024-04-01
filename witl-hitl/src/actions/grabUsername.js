
'use server';

import { Page } from "@/models/page";
import mongoose from "mongoose";

export default async function grabUsername(formData){
    const username =formData.get('username');
    // console.log(username);
    mongoose.connect(process.env.MONGO_URI);
    const exist=await Page.findOne({uri:username});
    if(exist){
        return false;
    }else{
        return await Page.create({uri:username});
    }
}