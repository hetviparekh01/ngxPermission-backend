import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role',
        required:true
    }
},{
    timestamps:true
})

export const User=mongoose.model('user',UserSchema)