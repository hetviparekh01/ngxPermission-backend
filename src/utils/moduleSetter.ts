import {Request,Response, NextFunction } from "express"

export const moduleSetter=(moduleName:string)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        req.headers.module=moduleName;
        next()
    }
}