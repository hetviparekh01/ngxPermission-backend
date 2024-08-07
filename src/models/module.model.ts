import mongoose, { Schema } from "mongoose";

const ModuleSchema = new Schema({
    moduleName: {
        type: String,
        unique: true,
        required: true
    },
}, {
    timestamps: true
})

export const Module = mongoose.model('module', ModuleSchema)