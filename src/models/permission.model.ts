import mongoose, { Schema } from "mongoose";

const PermissionSchema=new Schema({
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'module'
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role'
    },  
    read:{
        type:Boolean,
        default:false
    },
    write:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export const Permission=mongoose.model('permission',PermissionSchema)