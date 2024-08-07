import mongoose from "mongoose"

export const connectDB=()=>{
    return mongoose.connect("mongodb+srv://hetvi01:mongo_01@backenddb.oe9ottm.mongodb.net/RBAC?retryWrites=true&w=majority&appName=backendDB")
}