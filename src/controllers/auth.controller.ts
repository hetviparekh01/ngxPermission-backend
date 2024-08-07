import { controller, httpPost } from "inversify-express-utils";
import { Request,Response } from "express";
import { inject } from "inversify";
import { AuthService } from "../services";
import { TYPES } from "../constants";
import { IUser } from "../interfaces";
import bcrypt from 'bcrypt'
@controller("/auth")
export class AuthController{
    constructor(@inject<AuthService>(TYPES.authService) private authService:AuthService){}

    @httpPost("/signup")
    async signup(req:Request,res:Response){
        try {
            const {name,email,password}=req.body;
            const hashedPassword=await bcrypt.hash(password,10)
            await this.authService.signup({ name, email, password:hashedPassword, roleId:"66b322bb0eaed20c852036ba"})
            res.status(201).json({status:true,message:"User signed up successfully"})
        } catch (error) {
            res.status(400).json({status:false,message:error.message})
        }
    }

    @httpPost("/login")
    async login(req: Request, res: Response) {
        try {
            const {  email, password } = req.body;
            const data = await this.authService.login({ email, password } as IUser)
            res.status(201).json({ status: true, message: "User loggd in successfully", data: data })
        } catch (error) {
            res.status(400).json({ status: false, message: error.message })
        }
    }

}