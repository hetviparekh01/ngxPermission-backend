import { controller, httpPost } from "inversify-express-utils";
import { Request,Response } from "express";
import { inject } from "inversify";
import { SuperAdminService } from "../services";
import { TYPES } from "../constants";
import { isValidObjectId } from "mongoose";
import { moduleSetter } from "../utils";
@controller("/superAdmin")
export class superAdminController{
    constructor(@inject<SuperAdminService>(TYPES.superAdminService) private superAdminService:SuperAdminService){}
    

    @httpPost("/addModule", TYPES.AuthMiddleware, moduleSetter('module'), TYPES.WritePermission)
    async addModule(req: Request, res: Response) {
        try {
            const { moduleName } = req.body;
            await this.superAdminService.addModule(moduleName)
            res.status(201).json({ status: true, messgae: "Module Added Successfully" })
        } catch (error) {
            res.status(500).json({ status: false, message: error.message })
        }
    }
    @httpPost("/addRole", TYPES.AuthMiddleware, moduleSetter('role'), TYPES.WritePermission)
    async addRole(req:Request,res:Response){
        try {
            const {roleName}=req.body;
            await this.superAdminService.addRole(roleName)
            res.status(201).json({status:true,messgae:"Role Added Successfully"})
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    }

    @httpPost('/addPermission', TYPES.AuthMiddleware, moduleSetter('permission'), TYPES.WritePermission)
    async addPermission(req:Request,res:Response){
        try {
            const {roleId,moduleId,read,write}=req.body;
            if(!isValidObjectId(roleId) || !isValidObjectId(moduleId)){
                throw new Error("Not a Valid IDs")
            }
            await this.superAdminService.addPermission({roleId,moduleId,read,write})
            res.status(201).json({ status: true, messgae:"Permission Added Successfully" })
        } catch (error) {
            res.status(500).json({ status: false, message: error.message })
        }
    }
}