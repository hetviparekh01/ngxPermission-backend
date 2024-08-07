import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { ObjectId } from "mongodb";
import { getPermissionPipleline, ProjectPipeline } from "../utils";
import { Permission } from "../models";
import { PERMISSIONTYPE } from "../constants";

export class PermissionMiddleware extends BaseMiddleware{
    constructor(readonly permit:any){
        super();
    }
    async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const moduleName=req.headers.module;
            if(!moduleName){
                throw new Error("Module is not provided")
            }
            const pipeline=[
                {
                    $match:{
                        roleId:new ObjectId(req.headers.roleId as string)
                    }
                },
                ...getPermissionPipleline,
                {
                    $match:{
                        moduleName
                    }
                },
                ...ProjectPipeline
            ]
            const [permission]=await Permission.aggregate(pipeline)
            if (this.permit === PERMISSIONTYPE.READ && permission.read){
                next()
            } else if (this.permit === PERMISSIONTYPE.WRITE &&  permission.write){
                next()
            }else{
                res.status(403).json({status:false,message:"Unauthorized Access"})
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message })
        }
    }  
}
