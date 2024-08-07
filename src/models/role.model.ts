import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
    roleName: {
        type: String,
        unique: true,
        required: true
    },
}, {
    timestamps: true
})
export const Role = mongoose.model('role', roleSchema)
